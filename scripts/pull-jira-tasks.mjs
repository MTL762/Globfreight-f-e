#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

/**
 * Pulls Jira tasks (default: project = CLIK AND status = "Selected for Development")
 * and downloads all issue descriptions, comments, and image attachments into
 * `.jira-tasks/` so an AI coding agent can inspect and fix them immediately.
 *
 * Usage:
 *   pnpm jira:pull
 *   node scripts/pull-jira-tasks.mjs --project=CLIK --status="Selected for Development"
 *   node scripts/pull-jira-tasks.mjs --project=MTL --status="Selected for Development"
 *   node scripts/pull-jira-tasks.mjs --board=172            (all open issues on the MTL board)
 *   node scripts/pull-jira-tasks.mjs --board=172 --status="To Do"
 *   node scripts/pull-jira-tasks.mjs --board=https://.../projects/MTL/boards/172
 */

function loadEnvFile(filePath) {
	if (!fs.existsSync(filePath)) return {};
	const content = fs.readFileSync(filePath, "utf8");
	const env = {};
	for (const rawLine of content.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#") || !line.includes("=")) continue;
		const idx = line.indexOf("=");
		const key = line.slice(0, idx).trim();
		const val = line
			.slice(idx + 1)
			.trim()
			.replace(/^["']|["']$/g, "");
		env[key] = val;
	}
	return env;
}

function parseArgs(argv) {
	const args = {};
	for (const arg of argv.slice(2)) {
		if (arg.startsWith("--") && arg.includes("=")) {
			const idx = arg.indexOf("=");
			const k = arg.slice(2, idx);
			const v = arg.slice(idx + 1);
			args[k] = v.replace(/^["']|["']$/g, "");
		}
	}
	return args;
}

function extractAdfText(node) {
	if (!node) return "";
	if (typeof node === "string") return node;
	if (Array.isArray(node)) {
		return node.map(extractAdfText).filter(Boolean).join("\n");
	}
	if (typeof node === "object") {
		if (node.type === "text") {
			const text = node.text || "";
			const linkMark = (node.marks || []).find((m) => m.type === "link");
			if (linkMark?.attrs?.href && linkMark.attrs.href !== text) {
				return `${text} (${linkMark.attrs.href})`;
			}
			return text;
		}
		if (node.type === "hardBreak") return "\n";
		if (Array.isArray(node.content)) {
			const separator =
				node.type === "paragraph" || node.type === "heading" ? "" : "\n";
			return node.content.map(extractAdfText).join(separator);
		}
	}
	return "";
}

async function main() {
	const rootDir = process.cwd();
	const globalConfigEnv = path.join(os.homedir(), ".gemini", "config", "jira-clik.env");
	const localEnv = path.join(rootDir, ".env.local");

	const globalEnvVars = loadEnvFile(globalConfigEnv);
	const localEnvVars = loadEnvFile(localEnv);
	const mergedEnv = {
		...globalEnvVars,
		...localEnvVars,
		...process.env,
	};

	const cliArgs = parseArgs(process.argv);

	const baseUrl = (
		cliArgs.url ||
		mergedEnv.JIRA_BASE_URL ||
		"https://baro-logistics-qa-test.atlassian.net"
	).replace(/\/+$/, "");
	const email = cliArgs.email || mergedEnv.JIRA_EMAIL;
	const token = cliArgs.token || mergedEnv.JIRA_API_TOKEN;
	const project = cliArgs.project || localEnvVars.JIRA_PROJECT || "GLOB";
	const status =
		cliArgs.status || localEnvVars.JIRA_STATUS || "Selected for Development";

	if (!email || !token) {
		console.error(
			"❌ Missing Jira credentials. Ensure JIRA_EMAIL and JIRA_API_TOKEN are set in ~/.gemini/config/jira-clik.env or .env.local",
		);
		process.exit(1);
	}

	const authHeader = `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}`;
	// --board accepts an id or a full board URL (…/boards/139). Default to GLOB board 139 unless --project is explicitly passed.
	const boardArg =
		cliArgs.board ??
		localEnvVars.JIRA_BOARD_ID ??
		(cliArgs.project ? "" : "139");
	const boardId =
		boardArg.match(/boards\/(\d+)/)?.[1] || boardArg.match(/^\d+$/)?.[0];
	const statusGiven = Boolean(cliArgs.status || localEnvVars.JIRA_STATUS);
	const jql =
		cliArgs.jql ||
		(boardId
			? statusGiven
				? `status = "${status}" ORDER BY updated DESC`
				: "statusCategory != Done ORDER BY updated DESC"
			: `project = ${project} AND status = "${status}" ORDER BY updated DESC`);
	const searchPath = boardId
		? `/rest/agile/1.0/board/${boardId}/issue`
		: "/rest/api/3/search/jql";

	console.log(`🔍 Fetching Jira tasks with JQL: ${jql}`);

	const issues = [];
	let nextPageToken;
	do {
		const searchUrl = new URL(`${baseUrl}${searchPath}`);
		searchUrl.searchParams.set("jql", jql);
		searchUrl.searchParams.set("maxResults", "100");
		if (boardId) searchUrl.searchParams.set("startAt", String(issues.length));
		searchUrl.searchParams.set(
			"fields",
			"summary,description,status,assignee,priority,issuetype,comment,attachment,updated,created",
		);
		if (nextPageToken && !boardId)
			searchUrl.searchParams.set("nextPageToken", nextPageToken);

		const response = await fetch(searchUrl, {
			headers: {
				Authorization: authHeader,
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			const errText = await response.text();
			console.error(`❌ Jira API request failed (${response.status}): ${errText}`);
			process.exit(1);
		}

		const data = await response.json();
		issues.push(...(data.issues || []));
		if (boardId) {
			// Agile API paginates with startAt/total instead of nextPageToken.
			nextPageToken =
				issues.length < (data.total ?? 0) && (data.issues || []).length > 0
					? "more"
					: undefined;
		} else {
			nextPageToken = data.nextPageToken;
		}
	} while (nextPageToken);

	const outDir = path.join(rootDir, ".jira-tasks");
	const attachmentsDir = path.join(outDir, "attachments");
	fs.mkdirSync(attachmentsDir, { recursive: true });

	const processedIssues = [];

	for (const issue of issues) {
		const key = issue.key;
		const f = issue.fields || {};
		const summary = f.summary || "";
		const description = extractAdfText(f.description).trim();
		const assignee = f.assignee?.displayName || "Unassigned";
		const priority = f.priority?.name || "Normal";
		const statusName = f.status?.name || status;
		const comments = (f.comment?.comments || []).map((c) => ({
			author: c.author?.displayName || "Unknown",
			created: c.created,
			body: extractAdfText(c.body).trim(),
		}));

		const savedAttachments = [];
		const attachments = f.attachment || [];
		for (let i = 0; i < attachments.length; i++) {
			const att = attachments[i];
			const ext = path.extname(att.filename || "") || ".png";
			const localFileName = `${key}_${i + 1}${ext}`;
			const localFilePath = path.join(attachmentsDir, localFileName);

			try {
				const attRes = await fetch(att.content, {
					headers: { Authorization: authHeader },
				});
				if (attRes.ok) {
					const arrayBuffer = await attRes.arrayBuffer();
					fs.writeFileSync(localFilePath, Buffer.from(arrayBuffer));
					savedAttachments.push({
						originalName: att.filename,
						localPath: localFilePath,
						relativePath: `.jira-tasks/attachments/${localFileName}`,
					});
				}
			} catch (err) {
				console.warn(`⚠️ Failed to download attachment for ${key}:`, err.message);
			}
		}

		processedIssues.push({
			key,
			url: `${baseUrl}/browse/${key}`,
			summary,
			status: statusName,
			priority,
			assignee,
			description,
			comments,
			attachments: savedAttachments,
		});
	}

	// Write JSON manifest
	const jsonPath = path.join(outDir, "tasks.json");
	fs.writeFileSync(
		jsonPath,
		JSON.stringify(
			{
				fetchedAt: new Date().toISOString(),
				jql,
				total: processedIssues.length,
				issues: processedIssues,
			},
			null,
			2,
		),
		"utf8",
	);

	// Write Markdown summary for the Agent
	const mdLines = [
		`# Jira Tasks Queue (${boardId ? `board ${boardId}` : `${project} — ${status}`})`,
		``,
		`- **Fetched At**: ${new Date().toISOString()}`,
		`- **JQL**: \`${jql}\``,
		`- **Total Tasks**: ${processedIssues.length}`,
		``,
		`> **Agent Instructions**:`,
		`> 1. Review each task below and view its screenshots (paths listed under Attachments) with the Read tool.`,
		`> 2. Find the root cause in the code before editing. Follow all rules in \`AGENTS.md\` (\`endpoints.ts\`, \`routes.ts\`, all 7 locale files for new keys, etc.).`,
		`> 3. Fix the frontend side and run \`npx tsc --noEmit\` to verify zero TypeScript errors.`,
		`> 4. Write anything the backend must change or confirm to \`BACKEND_CHANGES.md\`, one section per task, with its Jira link.`,
		`> 5. Do NOT change Jira issue statuses, commit, or push unless explicitly asked.`,
		``,
		`---`,
		``,
	];

	for (const item of processedIssues) {
		mdLines.push(`## [${item.key}] ${item.summary}`);
		mdLines.push(`- **Jira Link**: ${item.url}`);
		mdLines.push(`- **Status**: ${item.status} | **Priority**: ${item.priority} | **Assignee**: ${item.assignee}`);
		mdLines.push(``);
		mdLines.push(`### Description`);
		mdLines.push(item.description || "_No description provided._");
		mdLines.push(``);

		if (item.attachments.length > 0) {
			mdLines.push(`### Attachments`);
			for (const att of item.attachments) {
				mdLines.push(`- \`${att.relativePath}\` (${att.originalName})`);
			}
			mdLines.push(``);
		}

		if (item.comments.length > 0) {
			mdLines.push(`### Comments`);
			for (const c of item.comments) {
				mdLines.push(`- **${c.author}** (${c.created}): ${c.body}`);
			}
			mdLines.push(``);
		}

		mdLines.push(`---`);
		mdLines.push(``);
	}

	const mdPath = path.join(outDir, "TASKS.md");
	fs.writeFileSync(mdPath, mdLines.join("\n"), "utf8");

	console.log(`✅ Pulled ${processedIssues.length} tasks!`);
	console.log(`📄 Markdown brief: ${mdPath}`);
	console.log(`📦 JSON manifest:  ${jsonPath}`);
	console.log(`🖼️  Attachments:    ${attachmentsDir}`);
}

main().catch((err) => {
	console.error("❌ Unexpected error:", err);
	process.exit(1);
});


import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const envPath = path.join(os.homedir(), ".gemini", "config", "jira-clik.env");
const content = fs.readFileSync(envPath, "utf8");
const env = {};
for (const line of content.split("\n")) {
  const idx = line.indexOf("=");
  if (idx > 0) {
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    env[k] = v;
  }
}

const auth = "Basic " + Buffer.from(`${env.JIRA_EMAIL}:${env.JIRA_API_TOKEN}`).toString("base64");
const baseUrl = (env.JIRA_BASE_URL || "https://baro-logistics-qa-test.atlassian.net").replace(/^["']|["']$/g, "").replace(/\/+$/, "");

function extractAdfText(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractAdfText).filter(Boolean).join("\n");
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
      const separator = node.type === "paragraph" || node.type === "heading" ? "" : "\n";
      return node.content.map(extractAdfText).join(separator);
    }
  }
  return "";
}

async function fetchIssueDetails(keys) {
  const issues = [];
  const outDir = path.join(process.cwd(), ".jira-tasks");
  const attachmentsDir = path.join(outDir, "attachments");
  fs.mkdirSync(attachmentsDir, { recursive: true });

  for (const key of keys) {
    const res = await fetch(`${baseUrl}/rest/api/3/issue/${key}`, {
      headers: { Authorization: auth, Accept: "application/json" }
    });
    if (!res.ok) {
      console.log(`Failed to fetch ${key}: ${res.status}`);
      continue;
    }
    const issue = await res.json();
    const f = issue.fields;
    const summary = f.summary;
    const status = f.status?.name;
    const description = extractAdfText(f.description).trim();
    const comments = (f.comment?.comments || []).map(c => ({
      author: c.author?.displayName,
      created: c.created,
      body: extractAdfText(c.body).trim()
    }));

    const attachments = [];
    for (let i = 0; i < (f.attachment || []).length; i++) {
      const att = f.attachment[i];
      const ext = path.extname(att.filename || "") || ".png";
      const localFileName = `${key}_${i + 1}${ext}`;
      const localFilePath = path.join(attachmentsDir, localFileName);
      try {
        const attRes = await fetch(att.content, { headers: { Authorization: auth } });
        if (attRes.ok) {
          const buf = await attRes.arrayBuffer();
          fs.writeFileSync(localFilePath, Buffer.from(buf));
          attachments.push({
            filename: att.filename,
            path: localFilePath
          });
        }
      } catch (e) {
        console.log(`Att error ${key}:`, e.message);
      }
    }

    issues.push({
      key,
      summary,
      status,
      assignee: f.assignee?.displayName,
      description,
      comments,
      attachments
    });
  }
  return issues;
}

async function run() {
  const clikKeys = ["CLIK-54", "CLIK-48", "CLIK-52", "CLIK-53", "CLIK-49", "CLIK-45", "CLIK-44", "CLIK-41", "CLIK-35", "CLIK-29", "CLIK-15", "CLIK-13", "CLIK-5", "CLIK-24"];
  const mtlKeys = ["MTL-5", "MTL-27", "MTL-30", "MTL-32", "MTL-36", "MTL-37", "MTL-39", "MTL-40", "MTL-41", "MTL-42", "MTL-43", "MTL-44"];

  console.log("Fetching CLIK tasks...");
  const clikIssues = await fetchIssueDetails(clikKeys);
  console.log("Fetching MTL tasks...");
  const mtlIssues = await fetchIssueDetails(mtlKeys);

  const out = { clikIssues, mtlIssues };
  fs.writeFileSync(".jira-tasks/all-active-tasks.json", JSON.stringify(out, null, 2));
  console.log("Saved to .jira-tasks/all-active-tasks.json");
}
run();

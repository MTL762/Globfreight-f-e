import { normalizePostmanName } from "@/utils/postman";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { withIdempotency } from "@/lib/idempotency";

type PostmanFormStatusRequest = {
	items?: Array<{
		id: string;
		name: string;
	}>;
};

export async function POST(req: Request) {
	return withIdempotency(req, async () => {
	try {
		const body = (await req.json()) as PostmanFormStatusRequest;
		const items = body.items ?? [];

		if (!items.length) {
			return NextResponse.json({ error: "No items provided." }, { status: 400 });
		}

		const projectRoot = process.cwd();
		const statuses = items.reduce<Record<string, { exists: boolean; modified: boolean }>>(
			(acc, item) => {
				if (!item.name.trim()) {
					acc[item.id] = { exists: false, modified: false };
					return acc;
				}
				const normalizedName = normalizePostmanName(item.name);

				const formFolder = path.join(
					projectRoot,
					"components",
					"pages",
					`_${normalizedName}`,
				);
				const exists = fs.existsSync(formFolder);
				let modified = false;

				if (exists) {
					try {
						const output = execSync(
							`git status --porcelain -- "${path.relative(projectRoot, formFolder)}"`,
							{
								cwd: projectRoot,
								stdio: ["ignore", "pipe", "ignore"],
							},
						)
							.toString()
							.trim();
						modified = output.length > 0;
					} catch (error) {
						modified = false;
					}
				}

				acc[item.id] = { exists, modified };
				return acc;
			},
			{},
		);

		return NextResponse.json({ success: true, statuses });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to check form statuses.";
		return NextResponse.json({ error: message }, { status: 500 });
	}

	});
}

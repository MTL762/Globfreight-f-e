// app/api/handle-missing-translation/route.ts
import { translate } from "@vitalets/google-translate-api";
import fs from "fs";
import { NextResponse } from "next/server";
import { withIdempotency } from "@/lib/idempotency";
import path from "path";

export async function POST(request: Request) {
	return withIdempotency(request, async () => {
	const { key, locale } = await request.json();

	try {
		const fileName = `${locale}.json`;
		const filePath = path.join(process.cwd(), "messages", fileName);

		let translations = {};
		if (fs.existsSync(filePath)) {
			const fileContent = fs.readFileSync(filePath, "utf8");
			translations = JSON.parse(fileContent);
		}

		// Skip if key already exists
		if (translations[key]) {
			return NextResponse.json({
				status: "exists",
				key,
				locale,
				existingValue: translations[key],
			});
		}

		let translatedValue = key;
		try {
			const result = await translate(key, { to: locale });
			translatedValue = result.text;
		} catch (translationError) {
			console.error(`Translation failed for "${key}":`, translationError);
		}

		// Add the new translation
		translations[key] = translatedValue;

		// Write back to the file
		fs.writeFileSync(filePath, JSON.stringify(translations, null, 2) + "\n");

		return NextResponse.json({
			status: "added",
			key,
			locale,
			translatedValue,
		});
	} catch (error) {
		console.error("Error handling missing translation:", error);
		return NextResponse.json(
			{ error: "Failed to handle missing translation" },
			{ status: 500 },
		);
	}

	});
}

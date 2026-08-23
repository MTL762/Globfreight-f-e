import { createFolderStructure } from "@/app/[locale]/(dev)/formCardCLI/formCreator.cli";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { parsePostmanCollection } from "@/utils/postman";
import { NextResponse } from "next/server";
import { withIdempotency } from "@/lib/idempotency";

interface PostmanCollectionRequest {
	collection?: unknown;
	items?: Array<{
		name: string;
		apiEndpoint: string;
		inputs: FormInput[];
	}>;
}

const normalizeItems = (
	items: PostmanCollectionRequest["items"],
	collection: PostmanCollectionRequest["collection"],
): Array<{
	name: string;
	apiEndpoint: string;
	inputs: FormInput[];
}> => {
	if (items?.length) {
		return items;
	}

	if (collection && typeof collection === "object") {
		const parsed = parsePostmanCollection(
			collection as Parameters<typeof parsePostmanCollection>[0],
		);
		return parsed.map(({ name, apiEndpoint, inputs }) => ({
			name,
			apiEndpoint,
			inputs,
		}));
	}

	return [];
};

export async function POST(req: Request) {
	return withIdempotency(req, async () => {
	try {
		const body = (await req.json()) as PostmanCollectionRequest;
		const items = normalizeItems(body.items, body.collection);

		if (!items.length) {
			return NextResponse.json(
				{ error: "No items provided from collection or items payload." },
				{ status: 400 },
			);
		}

		const results = items.map((item) => {
			try {
				if (!item.name || !item.apiEndpoint || !item.inputs?.length) {
					return {
						name: item.name,
						apiEndpoint: item.apiEndpoint,
						success: false,
						error: "Missing required fields: name, apiEndpoint, or inputs.",
					};
				}

				const result = createFolderStructure(item.name, item.apiEndpoint, item.inputs);
				return {
					name: item.name,
					apiEndpoint: item.apiEndpoint,
					success: true,
					result,
				};
			} catch (error) {
				return {
					name: item.name,
					apiEndpoint: item.apiEndpoint,
					success: false,
					error: error instanceof Error ? error.message : "Failed to create form",
				};
			}
		});

		const hasErrors = results.some((item) => !item.success);
		return NextResponse.json({
			success: !hasErrors,
			results,
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to process Postman collection";
		return NextResponse.json({ error: message }, { status: 500 });
	}

	});
}

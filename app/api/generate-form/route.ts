import { createFolderStructure } from "@/app/[locale]/(dev)/formCardCLI/formCreator.cli";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { NextResponse } from "next/server";
import { withIdempotency } from "@/lib/idempotency";

interface GenerateFormRequest {
	pageInfo: {
		name: string;
		apiUrl: string;
	};
	inputs: FormInput[];
}
export async function POST(req: Request) {
	return withIdempotency(req, async () => {
	try {
		const body = (await req.json()) as GenerateFormRequest;
		const { pageInfo, inputs } = body;

		// Validate input
		if (!pageInfo?.name || !pageInfo?.apiUrl || !inputs?.length) {
			return NextResponse.json(
				{ error: "Missing required fields: name, apiUrl, or inputs" },
				{ status: 400 },
			);
		}

		// Create the form structure
		const result = createFolderStructure(pageInfo.name, pageInfo.apiUrl, inputs);

		return NextResponse.json(result);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to generate form";

		return NextResponse.json({ error: message }, { status: 500 });
	}

	});
}

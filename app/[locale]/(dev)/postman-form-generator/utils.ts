import { DEFAULT_FILTER } from "@/app/[locale]/(dev)/CRUD-generator/types";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { normalizePostmanName } from "@/utils/postman";
import type { CrudState, EditablePostmanItem } from "./types";

export const buildInputsJson = (inputs: FormInput[]): string => JSON.stringify(inputs, null, 2);

export const parseInputsJson = (value: string): FormInput[] | null => {
	try {
		const parsed = JSON.parse(value) as FormInput[];
		return Array.isArray(parsed) ? parsed : null;
	} catch (_error) {
		return null;
	}
};

export const createCrudState = (item: EditablePostmanItem): CrudState => ({
	formData: {
		rootFolderName: normalizePostmanName(item.name),
		apiEndpoint: item.matchedEndpointKey ? [item.matchedEndpointKey] : [],
		tableHeader: item.name,
		filters: [{ ...DEFAULT_FILTER }],
		includeIdPage: false,
	},
	validationErrors: {},
	columnConfigs: "",
	isLoading: false,
});

export const parseApiEndpoints = (value: string): string[] => {
	const trimmed = value.trim();
	if (!trimmed) {
		return [];
	}

	try {
		const parsed = JSON.parse(trimmed) as unknown;
		if (Array.isArray(parsed)) {
			return parsed
				.map((entry) => (typeof entry === "string" ? entry.trim() : String(entry).trim()))
				.filter(Boolean);
		}
	} catch (_error) {
		// Ignore JSON parse errors and fall back to treating the value as a literal endpoint key.
	}

	return [trimmed.replace(/^['"]|['"]$/g, "")].filter(Boolean);
};

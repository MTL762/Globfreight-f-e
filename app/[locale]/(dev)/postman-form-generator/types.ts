import type { FormData } from "@/app/[locale]/(dev)/CRUD-generator/types";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export type FormStatus = {
	exists: boolean;
	modified: boolean;
};

export interface EditablePostmanItem {
	id: string;
	name: string;
	method: string;
	methods?: string[];
	path: string;
	apiEndpoint: string;
	inputs: FormInput[];
	matchedEndpointKey: string | null;
	inputsJson: string;
	inputsError?: string;
	showInputs: boolean;
	showInputsJson: boolean;
}

export type CrudState = {
	formData: FormData;
	validationErrors: { [key: string]: string };
	columnConfigs: string;
	isLoading: boolean;
};

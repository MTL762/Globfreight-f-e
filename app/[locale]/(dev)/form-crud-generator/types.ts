import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export interface FormPageInfo {
	name: string;
	apiUrl: string;
}

export interface CrudFilter {
	key: string;
	width?: number;
	type: string;
	apiEndpoint?: string;
	labelField?: string;
}

export interface CombinedFormData {
	// Project Setup
	projectName: string;
	apiEndpoint: string;

	// CRUD Settings
	tableHeader: string;
	crudFilters: CrudFilter[];

	// Form Settings
	formFields: FormInput[];
	pageInfo: FormPageInfo;
}

export interface GeneratedOutput {
	formCode: string;
	crudCode: string;
	pageCode: string;
	typesCode: string;
	files: string[];
}

export const FORM_INPUT_TYPES = [
	{ value: "text", label: "Text" },
	{ value: "number", label: "Number" },
	{ value: "email", label: "Email" },
	{ value: "password", label: "Password" },
	{ value: "tel", label: "Telephone" },
	{ value: "textarea", label: "Textarea" },
	{ value: "select", label: "Select" },
	{ value: "multiSelect", label: "Multi Select" },
	{ value: "selectPaginated", label: "Select Paginated" },
	{ value: "checkbox", label: "Checkbox" },
	{ value: "radioGroup", label: "Radio Group" },
	{ value: "date", label: "Date" },
	{ value: "time", label: "Time" },
	{ value: "year", label: "Year" },
	{ value: "file", label: "File" },
	{ value: "filesUpload", label: "Files Upload" },
	{ value: "img", label: "Image" },
	{ value: "textEditor", label: "Text Editor" },
	{ value: "map", label: "Map" },
	{ value: "map-zone", label: "Map Zone" },
	{ value: "color", label: "Color" },
	{ value: "title", label: "Title" },
	{ value: "space", label: "Space" },
] as const;

export const DEFAULT_FORM_INPUT: FormInput = {
	name: "",
	type: "text",
	required: false,
	multiLang: false,
};

export const DEFAULT_CRUD_FILTER: CrudFilter = {
	key: "",
	width: 3,
	type: "string",
};

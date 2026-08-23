import type { inputTypes } from "../../../../components/common/Form/CustomFormTypes.types";

export interface Filter {
	key: string;
	width?: number;
	type: string;
	apiEndpoint?: string;
	labelField?: string;
}

export interface FormData {
	rootFolderName: string;
	apiEndpoint: string[];
	tableHeader: string;
	filters: Filter[];
	includeIdPage: boolean;
}

export const FILTER_TYPES: {
	value: inputTypes;
	label: string;
}[] = [
	{ value: "text", label: "Text" },
	{ value: "number", label: "Number" },
	// { value: "selectMenu", label: "Select Menu" },
	{ value: "date", label: "Date" },
	// { value: "infiniteMultiSelect", label: "Infinite Multi Select" },
	{ value: "select", label: "Select" },
	{ value: "map", label: "Map" },
	{ value: "textarea", label: "Textarea" },
	{ value: "img", label: "Image" },
	{ value: "checkbox", label: "Checkbox" },
	{ value: "email", label: "Email" },
	{ value: "tel", label: "Telephone" },
	{ value: "multiSelect", label: "Multi Select" },
	{ value: "password", label: "Password" },
	{ value: "selectPaginated", label: "Select Paginated" },
	{ value: "textEditor", label: "Text Editor" },
	{ value: "time", label: "Time" },
	{ value: "file", label: "File" },
	{ value: "radioGroup", label: "Radio Group" },
	{ value: "map-zone", label: "Map Zone" },
	{ value: "year", label: "Year" },
	{ value: "filesUpload", label: "Files Upload" },
	{ value: "title", label: "Title" },
	{ value: "color", label: "Color" },
	{ value: "space", label: "Space" },
];

export const DEFAULT_FILTER: Filter = { key: "", width: 3, type: "string" };

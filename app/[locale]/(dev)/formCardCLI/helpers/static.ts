export const formInputsType = [
	"select",
	"text",
	"map",
	"textarea",
	"number",
	"img",
	"checkbox",
	"email",
	"tel",
	"multiSelect",
	"password",
	"selectPaginated",
	"textEditor",
	"time",
	"file",
	"radioGroup",
	"map-zone",
	"year",
	"filesUpload",
	"title",
	"color",
	"space",
	"date",
] as const;

export const defaultFormState = {
	name: "",
	type: "text" as const,
};

export type FormPageInfo = {
	name: string;
	apiUrl: string;
};

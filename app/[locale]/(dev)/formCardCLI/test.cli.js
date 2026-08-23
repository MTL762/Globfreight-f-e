const { capitalizeFirstLetter } = require("./helpers/uihelpers");

const createTestFile = (pageName, inputs) => {
	if (pageName.includes("/")) {
		pageName = pageName.split("/").pop();
	}
	const inputDefinitions = inputs
		.map((input) => {
			const inputProperties = [`name: "${input.name}"`, `type: "${input.type}"`];
			if (input.label) inputProperties.push(`label: "${input.label}"`);
			if (input.defaultValue) inputProperties.push(`defaultValue: "${input.defaultValue}"`);
			if (input.id) inputProperties.push(`id: "${input.id}"`);
			// if (input.apiUrl) inputProperties.push(`apiUrl: "${input.apiUrl}"`);
			if (input.placeholder) inputProperties.push(`placeholder: "${input.placeholder}"`);
			if (input.multiLang) {
				inputProperties.push(`multiLang: ${input.multiLang}`);
				inputProperties.push(`cardId: 'lang'`);
			}
			if (input.required) inputProperties.push(`required: ${input.required}`);
			if (input.idKey) inputProperties.push(`idKey: "${input.idKey}"`);
			if (input.labelKey) inputProperties.push(`labelKey: "${input.labelKey}"`);
			if (input.availableLanguages)
				inputProperties.push(`availableLanguages: ${JSON.stringify(input.availableLanguages)}`);
			if (input.value !== undefined) inputProperties.push(`value: ${JSON.stringify(input.value)}`);
			if (input.isMulti !== undefined) inputProperties.push(`isMulti: ${input.isMulti}`);
			if (input.width !== undefined) inputProperties.push(`width: ${input.width}`);
			if (input.cardId !== undefined)
				inputProperties.push(`cardId: ${JSON.stringify(input.cardId)}`);
			if (input.onChange) inputProperties.push(`onChange: ${input.onChange.toString()}`);
			if (input.options) inputProperties.push(`options: ${JSON.stringify(input.options)}`);
			if (input.isHidden) inputProperties.push(`isHidden: ${input.isHidden}`);
			if (input.searchFilters)
				inputProperties.push(`searchFilters: ${JSON.stringify(input.searchFilters)}`);
			return `    { ${inputProperties.join(", ")} }`;
		})
		.join(",\n");
	return `
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "${pageName.charAt(0).toLowerCase() + pageName.slice(1)}";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const ${capitalizeFirstLetter(pageName) || "Form"}Inputs = () => {
  const inputs: FormInput[] = [
${inputDefinitions}
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

`;
};

module.exports = { createTestFile };

const createSchemaFile = (pageName, inputs) => {
	const schemas = {
		selectReq: "",
		selectNotReq: "",
		noSchema: "",
		stringReq: "",
		stringNotReq: "",
		priceSchema: "",
		emailReq: "",
	};
	const inputDefinitions = inputs
		.map((input) => {
			let inputProperties = [`${input.name}`];
			if (input.type == "select" || input.type == "selectPaginated") {
				if (input.required) {
					inputProperties.push(`SelectReq(t)`);
					schemas.selectReq = 'import {SelectReq } from "@/validations/Select.schema";';
				} else {
					inputProperties.push(`selectNotReq()`);

					schemas.selectNotReq = 'import { selectNotReq } from "@/validations/Select.schema";';
				}
			} else if (input.type == "text" && input.multiLang) {
				if (input.required) {
					inputProperties = [];
					inputProperties = [`${input.name}Ar`, "StringReq(t)", `${input.name}En`, "StringReq(t)"];
					// inputProperties.push(`StringReq(t)`);

					schemas.stringReq = 'import { StringReq } from "@/validations/String.schema";';
				} else {
					inputProperties = [
						`${input.name}Ar`,
						"StringNotReq()",
						`${input.name}En`,
						"StringNotReq()",
					];

					schemas.stringNotReq = 'import {StringNotReq } from "@/validations/String.schema";';
				}
			} else if (input.type == "text") {
				if (input.required) {
					inputProperties.push(`StringReq(t)`);

					schemas.stringReq = 'import { StringReq } from "@/validations/String.schema";';
				} else {
					inputProperties.push(`StringNotReq()`);
					schemas.stringNotReq = 'import {StringNotReq } from "@/validations/String.schema";';
				}
			} else if (input.type == "email") {
				if (input.required) {
					inputProperties.push(`EmailReq(t)`);

					schemas.emailReq = 'import { EmailReq } from "@/validations/String.schema";';
				} else {
					inputProperties.push(`StringNotReq()`);
					schemas.stringNotReq = 'import {StringNotReq } from "@/validations/String.schema";';
				}
			} else if (input.type == "number") {
				if (input.required) {
					inputProperties.push(`PriceSchema(t,0)`);

					schemas.priceSchema = 'import { PriceSchema } from "@/validations/Number.schema";';
				}
			}
			// else if(input.type == 'number'){
			//   if(input.required){
			//     inputProperties.push(`NumberReq(t)`);
			else {
				inputProperties.push(`noSchema()`);
				schemas.noSchema = 'import { noSchema } from "@/validations/String.schema"';
			}
			if (input.multiLang) {
				const final = inputProperties.join(":");
				return `${final.replaceAll(`:${input.name}`, `, ${input.name}`)}`;
			}
			return `${inputProperties.join(":")}`;
		})
		.join(",\n");

	return `
  import { z } from "zod";
  ${schemas.selectReq}
  ${schemas.emailReq}
  ${schemas.stringReq}
  ${schemas.stringNotReq}
  ${schemas.priceSchema}
  ${schemas.selectNotReq}
  ${schemas.noSchema}
  export const ${pageName}Schema = (t:TFunction) => {
    return z.object({
    ${inputDefinitions}
})
  };

  export type ${pageName}Type = z.infer<
	ReturnType<typeof ${pageName}Schema>
  >;
  
  `;
};

module.exports = { createSchemaFile };

const createFormLogicFile = (name, multiLangFields, endpoint) => {
	// Initializing the useState for language
	const inputLang = [];

	// Generate the dynamic multi-language input handling logic
	const multiLangInput = multiLangFields.map((input) => {
		return '"' + input.name + '"';
		//     return `
		//   if (Object.keys(errors).includes("${input.name}")) {
		//     setLang("changeToEn");
		//   }
		//   else if (Object.keys(errors).includes("${input.name}Ar")) {
		//     setLang("changeToAr");
		//   }
		// else if (Object.keys(errors).includes("${input.name}Default")) {
		//     setLang("changeToDefault");
		//   }
		//   `;
	});

	// Add the dynamic logic to inputLang array
	inputLang.push(...multiLangInput);

	// Check if there are multi-language fields to generate specific form logic
	const multiLangLogic = false;
	//   multiLangFields.length > 0
	//     ? ` const { lang } = useFormErrorLang({
	//   errors,
	//   name: [${inputLang.join(",")}]
	// });`
	//     : undefined;
	return `
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ${name}Inputs } from "./${name.charAt(0).toLowerCase() + name.slice(1)}.inputs";
import { ${name}Schema , type ${name}Type } from "./${name.charAt(0).toLowerCase() + name.slice(1)}.schema";

export default function use${name}Logic({ data }: { data?: ${name}Type }) {
	const t = useTranslations();
	const inputs = ${name}Inputs();
	const {
		control,
		${multiLangLogic ? "formState: { errors }," : ""}
		handleSubmit,
		reset,
	} = useForm<${name}Type>({
		mode: "onSubmit",
		resolver: zodResolver(${name}Schema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as ${name}Type,
	});

	const onSubmit = async (formData: ${name}Type) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ${endpoint},
			reset: reset,
			redirectLink: "${name.slice(0, 1).toLowerCase()}${name.slice(1)}",
			t,
		});
	};
        ${
					multiLangLogic
						? ` const { lang } = useFormErrorLang({
    errors,
    name: [${inputLang.join(",")}]
  });`
						: ""
				}
              const formSubmit = handleSubmit(onSubmit);

	 return {
    ${multiLangLogic ? "lang," : ""}
    control,
    inputs,
    formSubmit,
    t
  };
}

  `;
};

module.exports = { createFormLogicFile };

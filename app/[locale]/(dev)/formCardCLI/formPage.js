const createFormPageFile = (name, multiLangFields) => {
	// Initializing the useState for language
	const inputLang = [];

	// Generate the dynamic multi-language input handling logic
	const multiLangInput = multiLangFields.map((input) => {
		return `
  if (Object.keys(errors).includes("${input.name}")) {
    setLang("changeToEn");
  }
  else if (Object.keys(errors).includes("${input.name}Ar")) {
    setLang("changeToAr");
  }

  `;
	});

	// Add the dynamic logic to inputLang array
	inputLang.push(...multiLangInput);

	// Check if there are multi-language fields to generate specific form logic
	const multiLangLogic =
		multiLangFields.length > 0
			? `
     const [lang, setLang] = useState<FormLangs>("default");
  useEffect(() => {
    ${inputLang.join("\n")}
  }, [errors]);`
			: undefined;
	return `
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  ${name}Type } from "./${name.charAt(0).toLowerCase() + name.slice(1)}.schema";
import use${name}Logic from "./use${name}Form.logic";
import { test${name}Form } from "./${name.slice(0, 1).toLowerCase() + name.slice(1)}-check-form-validation";

export default function ${name}FormPage({ data }: { data?: ${name}Type }) {
	const { inputs, t, control, formSubmit ${multiLangLogic ? ",lang" : ""}} = use${name}Logic({ data });
  test${name}Form();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				${multiLangLogic ? "changeLang={lang}" : ""}
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("${name} Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  `;
};

module.exports = { createFormPageFile };

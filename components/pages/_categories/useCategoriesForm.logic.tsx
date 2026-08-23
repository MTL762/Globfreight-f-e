
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CategoriesInputs } from "./categories.inputs";
import { CategoriesSchema , type CategoriesType } from "./categories.schema";

export default function useCategoriesLogic({ data }: { data?: CategoriesType }) {
	const t = useTranslations();
	const inputs = CategoriesInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<CategoriesType>({
		mode: "onSubmit",
		resolver: zodResolver(CategoriesSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as CategoriesType,
	});

	const onSubmit = async (formData: CategoriesType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['adminCategories'],
			reset: reset,
			redirectLink: "categories",
			t,
		});
	};
        
              const formSubmit = handleSubmit(onSubmit);

	 return {
    
    control,
    inputs,
    formSubmit,
    t
  };
}

  

 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { GenderInputs } from "./gender.inputs";
import { GenderSchema , type GenderType } from "./gender.schema";

export default function useGenderLogic({ data }: { data?: GenderType }) {
	const t = useTranslations();
	const inputs = GenderInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<GenderType>({
		mode: "onSubmit",
		resolver: zodResolver(GenderSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as GenderType,
	});

	const onSubmit = async (formData: GenderType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['genders'],
			reset: reset,
			redirectLink: "gender",
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

  
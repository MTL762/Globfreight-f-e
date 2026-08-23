
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { HomeHighlightInputs } from "./homeHighlight.inputs";
import { HomeHighlightSchema , type HomeHighlightType } from "./homeHighlight.schema";

export default function useHomeHighlightLogic({ data }: { data?: HomeHighlightType }) {
	const t = useTranslations();
	const inputs = HomeHighlightInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<HomeHighlightType>({
		mode: "onSubmit",
		resolver: zodResolver(HomeHighlightSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as HomeHighlightType,
	});

	const onSubmit = async (formData: HomeHighlightType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['homeHighlights'],
			reset: reset,
			redirectLink: "homeHighlight",
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

  
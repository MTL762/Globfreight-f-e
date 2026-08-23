
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { IndicatorInputs } from "./indicator.inputs";
import { IndicatorSchema , type IndicatorType } from "./indicator.schema";

export default function useIndicatorLogic({ data }: { data?: IndicatorType }) {
	const t = useTranslations();
	const inputs = IndicatorInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<IndicatorType>({
		mode: "onSubmit",
		resolver: zodResolver(IndicatorSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as IndicatorType,
	});

	const onSubmit = async (formData: IndicatorType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['indicators'],
			reset: reset,
			redirectLink: "indicator",
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

  
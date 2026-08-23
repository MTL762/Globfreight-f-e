
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FaqInputs } from "./faq.inputs";
import { FaqSchema , type FaqType } from "./faq.schema";

export default function useFaqLogic({ data }: { data?: FaqType }) {
	const t = useTranslations();
	const inputs = FaqInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<FaqType>({
		mode: "onSubmit",
		resolver: zodResolver(FaqSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as FaqType,
	});

	const onSubmit = async (formData: FaqType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['adminFaqItems'],
			reset: reset,
			redirectLink: "faq",
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

  
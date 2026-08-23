
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { PartnersArInputs } from "./partnersAr.inputs";
import { PartnersArSchema , type PartnersArType } from "./partnersAr.schema";

export default function usePartnersArLogic({ data }: { data?: PartnersArType }) {
	const t = useTranslations();
	const inputs = PartnersArInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<PartnersArType>({
		mode: "onSubmit",
		resolver: zodResolver(PartnersArSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as PartnersArType,
	});

	const onSubmit = async (formData: PartnersArType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['partnersArs'],
			reset: reset,
			redirectLink: "partnersAr",
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

  
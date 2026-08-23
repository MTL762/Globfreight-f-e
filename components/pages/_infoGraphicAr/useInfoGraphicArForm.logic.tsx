
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { InfoGraphicArInputs } from "./infoGraphicAr.inputs";
import { InfoGraphicArSchema , type InfoGraphicArType } from "./infoGraphicAr.schema";

export default function useInfoGraphicArLogic({ data }: { data?: InfoGraphicArType }) {
	const t = useTranslations();
	const inputs = InfoGraphicArInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<InfoGraphicArType>({
		mode: "onSubmit",
		resolver: zodResolver(InfoGraphicArSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as InfoGraphicArType,
	});

	const onSubmit = async (formData: InfoGraphicArType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['infoGraphicArs'],
			reset: reset,
			redirectLink: "infoGraphicAr",
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

  
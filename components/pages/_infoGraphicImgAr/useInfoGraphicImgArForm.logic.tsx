
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { InfoGraphicImgArInputs } from "./infoGraphicImgAr.inputs";
import { InfoGraphicImgArSchema , type InfoGraphicImgArType } from "./infoGraphicImgAr.schema";

export default function useInfoGraphicImgArLogic({ data }: { data?: InfoGraphicImgArType }) {
	const t = useTranslations();
	const inputs = InfoGraphicImgArInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<InfoGraphicImgArType>({
		mode: "onSubmit",
		resolver: zodResolver(InfoGraphicImgArSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as InfoGraphicImgArType,
	});

	const onSubmit = async (formData: InfoGraphicImgArType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['infoGraphicImgArs'],
			reset: reset,
			redirectLink: "infoGraphicImgAr",
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

  
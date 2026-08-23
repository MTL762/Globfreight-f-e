
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ResidenceInputs } from "./residence.inputs";
import { ResidenceSchema , type ResidenceType } from "./residence.schema";

export default function useResidenceLogic({ data }: { data?: ResidenceType }) {
	const t = useTranslations();
	const inputs = ResidenceInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<ResidenceType>({
		mode: "onSubmit",
		resolver: zodResolver(ResidenceSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as ResidenceType,
	});

	const onSubmit = async (formData: ResidenceType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['residences'],
			reset: reset,
			redirectLink: "residence",
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

  
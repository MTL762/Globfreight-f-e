
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { AreasInputs } from "./areas.inputs";
import { AreasSchema , type AreasType } from "./areas.schema";

export default function useAreasLogic({ data }: { data?: AreasType }) {
	const t = useTranslations();
	const inputs = AreasInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<AreasType>({
		mode: "onSubmit",
		resolver: zodResolver(AreasSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as AreasType,
	});

	const onSubmit = async (formData: AreasType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['areas'],
			reset: reset,
			redirectLink: "areas",
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

  
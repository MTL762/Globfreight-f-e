
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { PillarInputs } from "./pillar.inputs";
import { PillarSchema , type PillarType } from "./pillar.schema";

export default function usePillarLogic({ data }: { data?: PillarType }) {
	const t = useTranslations();
	const inputs = PillarInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<PillarType>({
		mode: "onSubmit",
		resolver: zodResolver(PillarSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as PillarType,
	});

	const onSubmit = async (formData: PillarType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['pillars'],
			reset: reset,
			redirectLink: "pillar",
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

  
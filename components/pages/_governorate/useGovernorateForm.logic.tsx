
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { GovernorateInputs } from "./governorate.inputs";
import { GovernorateSchema , type GovernorateType } from "./governorate.schema";

export default function useGovernorateLogic({ data }: { data?: GovernorateType }) {
	const t = useTranslations();
	const inputs = GovernorateInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<GovernorateType>({
		mode: "onSubmit",
		resolver: zodResolver(GovernorateSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as GovernorateType,
	});

	const onSubmit = async (formData: GovernorateType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['governorates'],
			reset: reset,
			redirectLink: "governorate",
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

  
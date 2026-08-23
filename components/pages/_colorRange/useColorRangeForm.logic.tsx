
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ColorRangeInputs } from "./colorRange.inputs";
import { ColorRangeSchema , type ColorRangeType } from "./colorRange.schema";

export default function useColorRangeLogic({ data }: { data?: ColorRangeType }) {
	const t = useTranslations();
	const inputs = ColorRangeInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<ColorRangeType>({
		mode: "onSubmit",
		resolver: zodResolver(ColorRangeSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as ColorRangeType,
	});

	const onSubmit = async (formData: ColorRangeType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['colorRanges'],
			reset: reset,
			redirectLink: "colorRange",
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

  
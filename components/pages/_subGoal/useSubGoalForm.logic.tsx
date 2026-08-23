
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { SubGoalInputs } from "./subGoal.inputs";
import { SubGoalSchema , type SubGoalType } from "./subGoal.schema";

export default function useSubGoalLogic({ data }: { data?: SubGoalType }) {
	const t = useTranslations();
	const inputs = SubGoalInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<SubGoalType>({
		mode: "onSubmit",
		resolver: zodResolver(SubGoalSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as SubGoalType,
	});

	const onSubmit = async (formData: SubGoalType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['subGoals'],
			reset: reset,
			redirectLink: "subGoal",
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

  
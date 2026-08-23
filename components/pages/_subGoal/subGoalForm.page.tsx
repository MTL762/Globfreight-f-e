
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  SubGoalType } from "./subGoal.schema";
import useSubGoalLogic from "./useSubGoalForm.logic";
import { testSubGoalForm } from "./subGoal-check-form-validation";

export default function SubGoalFormPage({ data }: { data?: SubGoalType }) {
	const { inputs, t, control, formSubmit } = useSubGoalLogic({ data });
  testSubGoalForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("SubGoal Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
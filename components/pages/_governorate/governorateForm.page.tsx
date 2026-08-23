
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  GovernorateType } from "./governorate.schema";
import useGovernorateLogic from "./useGovernorateForm.logic";
import { testGovernorateForm } from "./governorate-check-form-validation";

export default function GovernorateFormPage({ data }: { data?: GovernorateType }) {
	const { inputs, t, control, formSubmit } = useGovernorateLogic({ data });
  testGovernorateForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Governorate Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
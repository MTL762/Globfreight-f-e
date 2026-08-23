
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  GenderType } from "./gender.schema";
import useGenderLogic from "./useGenderForm.logic";
import { testGenderForm } from "./gender-check-form-validation";

export default function GenderFormPage({ data }: { data?: GenderType }) {
	const { inputs, t, control, formSubmit } = useGenderLogic({ data });
  testGenderForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Gender Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
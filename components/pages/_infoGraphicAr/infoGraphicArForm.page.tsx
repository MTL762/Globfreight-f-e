
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  InfoGraphicArType } from "./infoGraphicAr.schema";
import useInfoGraphicArLogic from "./useInfoGraphicArForm.logic";
import { testInfoGraphicArForm } from "./infoGraphicAr-check-form-validation";

export default function InfoGraphicArFormPage({ data }: { data?: InfoGraphicArType }) {
	const { inputs, t, control, formSubmit } = useInfoGraphicArLogic({ data });
  testInfoGraphicArForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("InfoGraphicAr Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
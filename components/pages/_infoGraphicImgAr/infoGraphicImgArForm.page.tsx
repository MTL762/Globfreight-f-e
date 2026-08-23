
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  InfoGraphicImgArType } from "./infoGraphicImgAr.schema";
import useInfoGraphicImgArLogic from "./useInfoGraphicImgArForm.logic";
import { testInfoGraphicImgArForm } from "./infoGraphicImgAr-check-form-validation";

export default function InfoGraphicImgArFormPage({ data }: { data?: InfoGraphicImgArType }) {
	const { inputs, t, control, formSubmit } = useInfoGraphicImgArLogic({ data });
  testInfoGraphicImgArForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("InfoGraphicImgAr Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  

 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  ColorRangeType } from "./colorRange.schema";
import useColorRangeLogic from "./useColorRangeForm.logic";
import { testColorRangeForm } from "./colorRange-check-form-validation";

export default function ColorRangeFormPage({ data }: { data?: ColorRangeType }) {
	const { inputs, t, control, formSubmit } = useColorRangeLogic({ data });
  testColorRangeForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("ColorRange Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
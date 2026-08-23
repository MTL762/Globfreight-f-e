
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  IndicatorType } from "./indicator.schema";
import useIndicatorLogic from "./useIndicatorForm.logic";
import { testIndicatorForm } from "./indicator-check-form-validation";

export default function IndicatorFormPage({ data }: { data?: IndicatorType }) {
	const { inputs, t, control, formSubmit } = useIndicatorLogic({ data });
  testIndicatorForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Indicator Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  

 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  AreasType } from "./areas.schema";
import useAreasLogic from "./useAreasForm.logic";
import { testAreasForm } from "./areas-check-form-validation";

export default function AreasFormPage({ data }: { data?: AreasType }) {
	const { inputs, t, control, formSubmit } = useAreasLogic({ data });
  testAreasForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Areas Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
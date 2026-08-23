
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  ResidenceType } from "./residence.schema";
import useResidenceLogic from "./useResidenceForm.logic";
import { testResidenceForm } from "./residence-check-form-validation";

export default function ResidenceFormPage({ data }: { data?: ResidenceType }) {
	const { inputs, t, control, formSubmit } = useResidenceLogic({ data });
  testResidenceForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Residence Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
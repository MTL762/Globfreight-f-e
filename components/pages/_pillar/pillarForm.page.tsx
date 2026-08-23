
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  PillarType } from "./pillar.schema";
import usePillarLogic from "./usePillarForm.logic";
import { testPillarForm } from "./pillar-check-form-validation";

export default function PillarFormPage({ data }: { data?: PillarType }) {
	const { inputs, t, control, formSubmit } = usePillarLogic({ data });
  testPillarForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Pillar Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
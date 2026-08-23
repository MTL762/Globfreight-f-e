
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  PartnersArType } from "./partnersAr.schema";
import usePartnersArLogic from "./usePartnersArForm.logic";
import { testPartnersArForm } from "./partnersAr-check-form-validation";

export default function PartnersArFormPage({ data }: { data?: PartnersArType }) {
	const { inputs, t, control, formSubmit } = usePartnersArLogic({ data });
  testPartnersArForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("PartnersAr Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  

 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  PublicationsTypeArType } from "./publicationsTypeAr.schema";
import usePublicationsTypeArLogic from "./usePublicationsTypeArForm.logic";
import { testPublicationsTypeArForm } from "./publicationsTypeAr-check-form-validation";

export default function PublicationsTypeArFormPage({ data }: { data?: PublicationsTypeArType }) {
	const { inputs, t, control, formSubmit } = usePublicationsTypeArLogic({ data });
  testPublicationsTypeArForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("PublicationsTypeAr Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
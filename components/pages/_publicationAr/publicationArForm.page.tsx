
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  PublicationArType } from "./publicationAr.schema";
import usePublicationArLogic from "./usePublicationArForm.logic";
import { testPublicationArForm } from "./publicationAr-check-form-validation";

export default function PublicationArFormPage({ data }: { data?: PublicationArType }) {
	const { inputs, t, control, formSubmit } = usePublicationArLogic({ data });
  testPublicationArForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("PublicationAr Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
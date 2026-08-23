
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  HomeHighlightType } from "./homeHighlight.schema";
import useHomeHighlightLogic from "./useHomeHighlightForm.logic";
import { testHomeHighlightForm } from "./homeHighlight-check-form-validation";

export default function HomeHighlightFormPage({ data }: { data?: HomeHighlightType }) {
	const { inputs, t, control, formSubmit } = useHomeHighlightLogic({ data });
  testHomeHighlightForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("HomeHighlight Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
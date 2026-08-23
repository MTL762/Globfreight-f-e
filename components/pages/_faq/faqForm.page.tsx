
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  FaqType } from "./faq.schema";
import useFaqLogic from "./useFaqForm.logic";
import { testFaqForm } from "./faq-check-form-validation";

export default function FaqFormPage({ data }: { data?: FaqType }) {
	const { inputs, t, control, formSubmit ,lang} = useFaqLogic({ data });
  testFaqForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				changeLang={lang}
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Faq Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
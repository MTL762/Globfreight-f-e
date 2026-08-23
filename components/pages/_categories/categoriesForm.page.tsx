
 "use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type {  CategoriesType } from "./categories.schema";
import useCategoriesLogic from "./useCategoriesForm.logic";
import { testCategoriesForm } from "./categories-check-form-validation";

export default function CategoriesFormPage({ data }: { data?: CategoriesType }) {
	const { inputs, t, control, formSubmit ,lang} = useCategoriesLogic({ data });
  testCategoriesForm();
 
	return (
			<CustomForm
				handleSubmit={formSubmit}
				changeLang={lang}
				control={control}
				cardConfig={[
					{
						id: "lang",
						title: t("Categories Information"),
						multiLang: true,
						width: 6,
					},
				]}
				inputs={inputs}
			/>
	);
}

  
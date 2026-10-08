"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type { CategoriesType } from "./categories.schema";
import useCategoriesLogic from "./useCategoriesForm.logic";

export default function CategoriesFormPage({ data }: { data?: CategoriesType }) {
  const { inputs, t, control, formSubmit } = useCategoriesLogic({ data });

  return (
    <CustomForm
      handleSubmit={formSubmit}
      control={control}
      cardConfig={[
        {
          id: "general",
          title: t("General"),
          width: 12
        },
        {
          id: "lang",
          title: t("Categories Information"),
          multiLang: true,
          width: 12
        },
        {
          id: "seo",
          title: t("SEO Settings"),
          multiLang: true,
          width: 12
        }
      ]}
      inputs={inputs}
    />
  );
}
"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type { SubCategoriesType } from "./subCategories.schema";
import useSubCategoriesLogic from "./useSubCategoriesForm.logic";

export default function SubCategoriesFormPage({ data }: { data?: SubCategoriesType }) {
  const { inputs, t, control, formSubmit } = useSubCategoriesLogic({ data });

  return (
    <CustomForm
      handleSubmit={formSubmit}
      control={control}
      cardConfig={[
        {
          id: "general",
          title: t("General Information"),
          width: 5
        },
        {
          id: "lang",
          title: t("SubCategories Information"),
          multiLang: true,
          width: 7
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

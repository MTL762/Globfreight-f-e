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
          width: 6
        },
        {
          id: "lang",
          title: t("SubCategories Information"),
          multiLang: true,
          width: 6
        }
      ]}
      inputs={inputs}
    />
  );
}

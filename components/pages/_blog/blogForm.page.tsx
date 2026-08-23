"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type { BlogType } from "./blog.schema";
import useBlogLogic from "./useBlogForm.logic";

export default function BlogFormPage({ data }: { data?: BlogType }) {
  const { inputs, t, control, formSubmit } = useBlogLogic({ data });

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
          title: t("Blog Information"),
          multiLang: true,
          width: 7
        }
      ]}
      inputs={inputs}
    />
  );
}

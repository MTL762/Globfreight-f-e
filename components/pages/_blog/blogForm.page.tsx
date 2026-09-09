"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import CustomGeneratedInputs from "@/components/common/Form/CustomGeneratedInputs";
import type { BlogType } from "./blog.schema";
import useBlogLogic from "./useBlogForm.logic";

export default function BlogFormPage({ data }: { data?: BlogType }) {
  const { inputs, t, control, formSubmit, tagInputs, tagFields, appendTag, removeTag } = useBlogLogic({ data });

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
        },
        {
          id: "seo",
          title: t("SEO Settings"),
          multiLang: true,
          width: 12
        }
      ]}
      inputs={inputs}
    >
      <CustomGeneratedInputs
        fields={tagFields}
        append={appendTag}
        remove={removeTag}
        name="tags"
        control={control}
        generatedInputs={tagInputs}
        appendKey="Add Tag"
      />
    </CustomForm>
  );
}

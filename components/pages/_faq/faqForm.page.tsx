"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type { FaqType } from "./faq.schema";
import useFaqLogic from "./useFaqForm.logic";

export default function FaqFormPage({ data }: { data?: FaqType }) {
  const { inputs, t, control, formSubmit, lang } = useFaqLogic({ data });

  return (
    <CustomForm
      handleSubmit={formSubmit}
      control={control}
      changeLang={lang}
      cardConfig={[
        {
          id: "lang",
          title: t("Faq Information"),
          multiLang: true,
          width: 12
        }
      ]}
      inputs={inputs}
    />
  );
}
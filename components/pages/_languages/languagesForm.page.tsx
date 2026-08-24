"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useLanguagesLogic from "./useLanguagesForm.logic";

export default function LanguagesFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useLanguagesLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Language Configuration"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

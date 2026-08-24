"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useSectionsLogic from "./useSectionsForm.logic";

export default function SectionsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useSectionsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Section / Department Info"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

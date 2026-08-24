"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useSalariesLogic from "./useSalariesForm.logic";

export default function SalariesFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useSalariesLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Salary Structure"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useDeductionsLogic from "./useDeductionsForm.logic";

export default function DeductionsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useDeductionsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Deduction Details"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

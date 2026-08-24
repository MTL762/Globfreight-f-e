"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useShiftsLogic from "./useShiftsForm.logic";

export default function ShiftsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useShiftsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Work Shift Schedule"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

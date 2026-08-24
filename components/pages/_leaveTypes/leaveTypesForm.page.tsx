"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useLeaveTypesLogic from "./useLeaveTypesForm.logic";

export default function LeaveTypesFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useLeaveTypesLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Leave Type Details"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

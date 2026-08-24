"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useLeaveRequestsLogic from "./useLeaveRequestsForm.logic";

export default function LeaveRequestsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useLeaveRequestsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Leave Request Form"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

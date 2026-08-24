"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useWarningsLogic from "./useWarningsForm.logic";

export default function WarningsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useWarningsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Disciplinary Warning"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

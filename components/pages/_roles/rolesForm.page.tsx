"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useRolesLogic from "./useRolesForm.logic";

export default function RolesFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useRolesLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Role & Permissions"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

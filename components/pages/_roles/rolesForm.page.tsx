"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useRolesLogic from "./useRolesForm.logic";
import { PermissionsMatrixSelector } from "./permissions-selector";

export default function RolesFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit, errors } = useRolesLogic({ data });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Role Information"),
            width: 12
          }
        ]}
        inputs={inputs}
      >
        <div className="mt-4">
          <PermissionsMatrixSelector control={control} errors={errors} />
        </div>
      </CustomForm>
    </div>
  );
}

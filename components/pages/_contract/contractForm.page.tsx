"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useContractLogic from "./useContractForm.logic";

export default function ContractFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useContractLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Contract Agreement"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

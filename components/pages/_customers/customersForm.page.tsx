"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useCustomersLogic from "./useCustomersForm.logic";

export default function CustomersFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useCustomersLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Customer Information"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

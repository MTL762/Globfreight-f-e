"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useExpensesLogic from "./useExpensesForm.logic";

export default function ExpensesFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useExpensesLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Expense Claim"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

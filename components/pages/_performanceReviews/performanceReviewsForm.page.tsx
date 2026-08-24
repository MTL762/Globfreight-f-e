"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import usePerformanceReviewsLogic from "./usePerformanceReviewsForm.logic";

export default function PerformanceReviewsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = usePerformanceReviewsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Performance Review"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useTrainingProgramsLogic from "./useTrainingProgramsForm.logic";

export default function TrainingProgramsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useTrainingProgramsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Training Program Info"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

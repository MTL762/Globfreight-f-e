"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useOnboardingTemplatesLogic from "./useOnboardingTemplatesForm.logic";

export default function OnboardingTemplatesFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useOnboardingTemplatesLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Onboarding Template"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}

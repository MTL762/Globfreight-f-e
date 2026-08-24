"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { OnboardingTemplatesInputs } from "./onboardingTemplates.inputs";
import { OnboardingTemplatesSchema, type OnboardingTemplatesType } from "./onboardingTemplates.schema";

export default function useOnboardingTemplatesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = OnboardingTemplatesInputs();
  const { control, handleSubmit, reset } = useForm<OnboardingTemplatesType>({
    mode: "onSubmit",
    resolver: zodResolver(OnboardingTemplatesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as OnboardingTemplatesType,
  });

  const onSubmit = async (formData: OnboardingTemplatesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrOnboardingTemplates'],
      reset: reset,
      redirectLink: "hr/onboarding-templates",
      t,
    });
  };

  const formSubmit = handleSubmit(onSubmit);

  return {
    control,
    inputs,
    formSubmit,
    t,
  };
}

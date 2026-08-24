"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { PerformanceReviewsInputs } from "./performanceReviews.inputs";
import { PerformanceReviewsSchema, type PerformanceReviewsType } from "./performanceReviews.schema";

export default function usePerformanceReviewsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = PerformanceReviewsInputs();
  const { control, handleSubmit, reset } = useForm<PerformanceReviewsType>({
    mode: "onSubmit",
    resolver: zodResolver(PerformanceReviewsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as PerformanceReviewsType,
  });

  const onSubmit = async (formData: PerformanceReviewsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrPerformanceReviews'],
      reset: reset,
      redirectLink: "hr/performance-reviews",
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

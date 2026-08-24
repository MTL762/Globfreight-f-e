"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { WarningsInputs } from "./warnings.inputs";
import { WarningsSchema, type WarningsType } from "./warnings.schema";

export default function useWarningsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = WarningsInputs();
  const { control, handleSubmit, reset } = useForm<WarningsType>({
    mode: "onSubmit",
    resolver: zodResolver(WarningsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as WarningsType,
  });

  const onSubmit = async (formData: WarningsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrWarnings'],
      reset: reset,
      redirectLink: "hr/warnings",
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

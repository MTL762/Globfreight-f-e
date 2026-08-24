"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { LanguagesInputs } from "./languages.inputs";
import { LanguagesSchema, type LanguagesType } from "./languages.schema";

export default function useLanguagesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = LanguagesInputs();
  const { control, handleSubmit, reset } = useForm<LanguagesType>({
    mode: "onSubmit",
    resolver: zodResolver(LanguagesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as LanguagesType,
  });

  const onSubmit = async (formData: LanguagesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrLanguages'],
      reset: reset,
      redirectLink: "hr/languages",
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

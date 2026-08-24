"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { SectionsInputs } from "./sections.inputs";
import { SectionsSchema, type SectionsType } from "./sections.schema";

export default function useSectionsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = SectionsInputs();
  const { control, handleSubmit, reset } = useForm<SectionsType>({
    mode: "onSubmit",
    resolver: zodResolver(SectionsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as SectionsType,
  });

  const onSubmit = async (formData: SectionsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrSections'],
      reset: reset,
      redirectLink: "hr/sections",
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

"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { DeductionsInputs } from "./deductions.inputs";
import { DeductionsSchema, type DeductionsType } from "./deductions.schema";

export default function useDeductionsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = DeductionsInputs();
  const { control, handleSubmit, reset } = useForm<DeductionsType>({
    mode: "onSubmit",
    resolver: zodResolver(DeductionsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as DeductionsType,
  });

  const onSubmit = async (formData: DeductionsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrDeductions'],
      reset: reset,
      redirectLink: "hr/deductions",
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

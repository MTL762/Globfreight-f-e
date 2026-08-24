"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { SalariesInputs } from "./salaries.inputs";
import { SalariesSchema, type SalariesType } from "./salaries.schema";

export default function useSalariesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = SalariesInputs();
  const { control, handleSubmit, reset } = useForm<SalariesType>({
    mode: "onSubmit",
    resolver: zodResolver(SalariesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as SalariesType,
  });

  const onSubmit = async (formData: SalariesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrSalaries'],
      reset: reset,
      redirectLink: "hr/salaries",
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

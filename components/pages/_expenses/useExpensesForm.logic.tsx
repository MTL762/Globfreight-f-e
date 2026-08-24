"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ExpensesInputs } from "./expenses.inputs";
import { ExpensesSchema, type ExpensesType } from "./expenses.schema";

export default function useExpensesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = ExpensesInputs();
  const { control, handleSubmit, reset } = useForm<ExpensesType>({
    mode: "onSubmit",
    resolver: zodResolver(ExpensesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as ExpensesType,
  });

  const onSubmit = async (formData: ExpensesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrExpenses'],
      reset: reset,
      redirectLink: "hr/expenses",
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

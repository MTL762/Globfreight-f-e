"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CustomersInputs } from "./customers.inputs";
import { CustomersSchema, type CustomersType } from "./customers.schema";

export default function useCustomersLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = CustomersInputs();
  const { control, handleSubmit, reset } = useForm<CustomersType>({
    mode: "onSubmit",
    resolver: zodResolver(CustomersSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as CustomersType,
  });

  const onSubmit = async (formData: CustomersType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['adminCustomers'],
      reset: reset,
      redirectLink: "customers",
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

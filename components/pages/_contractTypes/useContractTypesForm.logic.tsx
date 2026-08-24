"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ContractTypesInputs } from "./contractTypes.inputs";
import { ContractTypesSchema, type ContractTypesType } from "./contractTypes.schema";

export default function useContractTypesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = ContractTypesInputs();
  const { control, handleSubmit, reset } = useForm<ContractTypesType>({
    mode: "onSubmit",
    resolver: zodResolver(ContractTypesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as ContractTypesType,
  });

  const onSubmit = async (formData: ContractTypesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrContractTypes'],
      reset: reset,
      redirectLink: "hr/contract-types",
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

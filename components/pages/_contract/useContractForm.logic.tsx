"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ContractInputs } from "./contract.inputs";
import { ContractSchema, type ContractType } from "./contract.schema";

export default function useContractLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = ContractInputs();
  const { control, handleSubmit, reset } = useForm<ContractType>({
    mode: "onSubmit",
    resolver: zodResolver(ContractSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as ContractType,
  });

  const onSubmit = async (formData: ContractType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrContracts'],
      reset: reset,
      redirectLink: "hr/contract",
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

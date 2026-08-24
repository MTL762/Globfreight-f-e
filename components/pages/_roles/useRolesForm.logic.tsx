"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { RolesInputs } from "./roles.inputs";
import { RolesSchema, type RolesType } from "./roles.schema";

export default function useRolesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = RolesInputs();
  const { control, handleSubmit, reset } = useForm<RolesType>({
    mode: "onSubmit",
    resolver: zodResolver(RolesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as RolesType,
  });

  const onSubmit = async (formData: RolesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['roles'],
      reset: reset,
      redirectLink: "roles",
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

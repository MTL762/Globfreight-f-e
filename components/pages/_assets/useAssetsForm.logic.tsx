"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { AssetsInputs } from "./assets.inputs";
import { AssetsSchema, type AssetsType } from "./assets.schema";

export default function useAssetsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = AssetsInputs();
  const { control, handleSubmit, reset } = useForm<AssetsType>({
    mode: "onSubmit",
    resolver: zodResolver(AssetsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as AssetsType,
  });

  const onSubmit = async (formData: AssetsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrAssets'],
      reset: reset,
      redirectLink: "hr/assets",
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

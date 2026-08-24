"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ShiftsInputs } from "./shifts.inputs";
import { ShiftsSchema, type ShiftsType } from "./shifts.schema";

export default function useShiftsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = ShiftsInputs();
  const { control, handleSubmit, reset } = useForm<ShiftsType>({
    mode: "onSubmit",
    resolver: zodResolver(ShiftsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as ShiftsType,
  });

  const onSubmit = async (formData: ShiftsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrShifts'],
      reset: reset,
      redirectLink: "hr/shifts",
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

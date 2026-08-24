"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { LeaveTypesInputs } from "./leaveTypes.inputs";
import { LeaveTypesSchema, type LeaveTypesType } from "./leaveTypes.schema";

export default function useLeaveTypesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = LeaveTypesInputs();
  const { control, handleSubmit, reset } = useForm<LeaveTypesType>({
    mode: "onSubmit",
    resolver: zodResolver(LeaveTypesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as LeaveTypesType,
  });

  const onSubmit = async (formData: LeaveTypesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrLeaveTypes'],
      reset: reset,
      redirectLink: "hr/leave-types",
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

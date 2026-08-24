"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { LeaveRequestsInputs } from "./leaveRequests.inputs";
import { LeaveRequestsSchema, type LeaveRequestsType } from "./leaveRequests.schema";

export default function useLeaveRequestsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = LeaveRequestsInputs();
  const { control, handleSubmit, reset } = useForm<LeaveRequestsType>({
    mode: "onSubmit",
    resolver: zodResolver(LeaveRequestsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as LeaveRequestsType,
  });

  const onSubmit = async (formData: LeaveRequestsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrLeaveRequests'],
      reset: reset,
      redirectLink: "hr/leave-requests",
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

"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { AnnouncementsInputs } from "./announcements.inputs";
import { AnnouncementsSchema, type AnnouncementsType } from "./announcements.schema";

export default function useAnnouncementsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = AnnouncementsInputs();
  const { control, handleSubmit, reset } = useForm<AnnouncementsType>({
    mode: "onSubmit",
    resolver: zodResolver(AnnouncementsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as AnnouncementsType,
  });

  const onSubmit = async (formData: AnnouncementsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrAnnouncements'],
      reset: reset,
      redirectLink: "hr/announcements",
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

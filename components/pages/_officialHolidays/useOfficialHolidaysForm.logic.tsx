"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { OfficialHolidaysInputs } from "./officialHolidays.inputs";
import { OfficialHolidaysSchema, type OfficialHolidaysType } from "./officialHolidays.schema";

export default function useOfficialHolidaysLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = OfficialHolidaysInputs();
  const { control, handleSubmit, reset } = useForm<OfficialHolidaysType>({
    mode: "onSubmit",
    resolver: zodResolver(OfficialHolidaysSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as OfficialHolidaysType,
  });

  const onSubmit = async (formData: OfficialHolidaysType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrOfficialHolidays'],
      reset: reset,
      redirectLink: "hr/official-holidays",
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

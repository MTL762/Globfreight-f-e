"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { TrainingProgramsInputs } from "./trainingPrograms.inputs";
import { TrainingProgramsSchema, type TrainingProgramsType } from "./trainingPrograms.schema";

export default function useTrainingProgramsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = TrainingProgramsInputs();
  const { control, handleSubmit, reset } = useForm<TrainingProgramsType>({
    mode: "onSubmit",
    resolver: zodResolver(TrainingProgramsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as TrainingProgramsType,
  });

  const onSubmit = async (formData: TrainingProgramsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrTrainingPrograms'],
      reset: reset,
      redirectLink: "hr/training-programs",
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

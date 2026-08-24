"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { EmployeeDocumentsInputs } from "./employeeDocuments.inputs";
import { EmployeeDocumentsSchema, type EmployeeDocumentsType } from "./employeeDocuments.schema";

export default function useEmployeeDocumentsLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = EmployeeDocumentsInputs();
  const { control, handleSubmit, reset } = useForm<EmployeeDocumentsType>({
    mode: "onSubmit",
    resolver: zodResolver(EmployeeDocumentsSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as EmployeeDocumentsType,
  });

  const onSubmit = async (formData: EmployeeDocumentsType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ['hrEmployeeDocuments'],
      reset: reset,
      redirectLink: "hr/employee-documents",
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

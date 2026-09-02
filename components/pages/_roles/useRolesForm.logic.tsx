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

  const normalizedData = data
    ? {
        ...data,
        permission_ids: Array.isArray(data.permissions)
          ? data.permissions.map((p: any) =>
              typeof p === "object" && p !== null ? Number(p.id) : Number(p)
            )
          : Array.isArray(data.permission_ids)
            ? data.permission_ids.map((p: any) => Number(p))
            : []
      }
    : {
        name: "",
        permission_ids: []
      };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RolesType>({
    mode: "onSubmit",
    resolver: zodResolver(RolesSchema(t)),
    defaultValues: {
      ...(extractFormDefaultInputs(inputs, normalizedData) as RolesType),
      permission_ids: normalizedData?.permission_ids || []
    }
  });

  const onSubmit = async (formData: RolesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ["roles"],
      reset: reset,
      redirectLink: "roles",
      t
    });
  };

  const formSubmit = handleSubmit(onSubmit);

  return {
    control,
    inputs,
    formSubmit,
    t,
    errors
  };
}

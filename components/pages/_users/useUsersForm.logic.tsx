"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { UsersInputs } from "./users.inputs";
import { UsersSchema, type UsersType } from "./users.schema";

export default function useUsersLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const isEdit = Boolean(data && data.id);
  const inputs = UsersInputs(isEdit);

  const initialValues = data
    ? {
        ...data,
        role_id: data.role_id || data.role?.id || ""
      }
    : {};

  const { control, handleSubmit, reset } = useForm<UsersType>({
    mode: "onSubmit",
    resolver: zodResolver(UsersSchema(t, isEdit)),
    defaultValues: extractFormDefaultInputs(inputs, initialValues) as UsersType
  });

  const onSubmit = async (formData: UsersType) => {
    // If edit and password is empty, omit it from submitted payload
    const payload = { ...formData };
    if (isEdit && !payload.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: payload }),
      endpoint: ["adminUsers"],
      reset: reset,
      redirectLink: "users",
      t
    });
  };

  const formSubmit = handleSubmit(onSubmit);

  return {
    control,
    inputs,
    formSubmit,
    t
  };
}

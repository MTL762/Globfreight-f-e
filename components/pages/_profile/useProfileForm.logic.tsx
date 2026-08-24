"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProfileInputs } from "./profile.inputs";
import { ProfileSchema, type ProfileType } from "./profile.schema";

export default function useProfileLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const router = useRouter();
  const inputs = ProfileInputs();

  const initialValues = data
    ? {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        avatar: data.avatar || null
      }
    : {};

  const { control, handleSubmit, reset } = useForm<ProfileType>({
    mode: "onSubmit",
    resolver: zodResolver(ProfileSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, initialValues) as ProfileType
  });

  const onSubmit = async (formData: ProfileType) => {
    const res = await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ["authProfile"],
      noId: true,
      method: "POST",
      redirectLink: false,
      reset: reset,
      t
    });

    if (res?.success) {
      router.refresh();
    }
  };

  const formSubmit = handleSubmit(onSubmit);

  return {
    control,
    inputs,
    formSubmit,
    t
  };
}

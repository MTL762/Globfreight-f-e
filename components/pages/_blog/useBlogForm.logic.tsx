"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { BlogInputs } from "./blog.inputs";
import { BlogSchema, type BlogType } from "./blog.schema";

export default function useBlogLogic({ data }: { data?: BlogType }) {
  const t = useTranslations();
  const inputs = BlogInputs();
  const { control, handleSubmit, reset } = useForm<BlogType>({
    mode: "onSubmit",
    resolver: zodResolver(BlogSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as BlogType
  });

  const onSubmit = async (formData: BlogType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ["adminBlogPosts"],
      reset: reset,
      redirectLink: "blog",
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

"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFieldArray, useForm } from "react-hook-form";
import { BlogInputs, BlogTagInputs } from "./blog.inputs";
import { BlogSchema, type BlogType } from "./blog.schema";

export default function useBlogLogic({ data }: { data?: BlogType }) {
  const t = useTranslations();
  const inputs = BlogInputs();
  const tagInputs = BlogTagInputs();
  const { control, handleSubmit, reset } = useForm<BlogType>({
    mode: "onSubmit",
    resolver: zodResolver(BlogSchema(t)),
    defaultValues: {
      ...extractFormDefaultInputs(inputs, data) as BlogType,
      tags: data?.tags?.length ? data.tags : [{ value: "" }],
    }
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (formData: BlogType) => {
    // Transform tags array to flat string array for API
    const transformedData = {
      ...formData,
      tags: formData.tags?.map(tag => tag.value).filter(Boolean),
    };
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: transformedData }),
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
    tagInputs,
    tagFields,
    appendTag: () => appendTag({ value: "" }),
    removeTag,
    formSubmit,
    t
  };
}

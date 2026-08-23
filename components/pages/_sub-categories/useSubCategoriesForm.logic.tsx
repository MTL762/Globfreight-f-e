"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { SubCategoriesInputs } from "./subCategories.inputs";
import { SubCategoriesSchema, type SubCategoriesType } from "./subCategories.schema";

export default function useSubCategoriesLogic({ data }: { data?: SubCategoriesType }) {
  const t = useTranslations();
  const inputs = SubCategoriesInputs();
  const { control, handleSubmit, reset } = useForm<SubCategoriesType>({
    mode: "onSubmit",
    resolver: zodResolver(SubCategoriesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as SubCategoriesType
  });

  const onSubmit = async (formData: SubCategoriesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData }),
      endpoint: ["adminSubCategories"],
      reset: reset,
      redirectLink: "sub-categories",
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

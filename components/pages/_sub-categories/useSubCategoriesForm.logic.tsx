"use client";

import { useEffect, useRef } from "react";
import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { generateSlug } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { SubCategoriesInputs } from "./subCategories.inputs";
import { SubCategoriesSchema, type SubCategoriesType } from "./subCategories.schema";

export default function useSubCategoriesLogic({ data }: { data?: SubCategoriesType }) {
  const t = useTranslations();
  const inputs = SubCategoriesInputs();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields }
  } = useForm<SubCategoriesType>({
    mode: "onSubmit",
    resolver: zodResolver(SubCategoriesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as SubCategoriesType
  });

  // Watch names to auto-generate slugs and self-referencing canonical URLs
  const watchedNames = useWatch({
    control,
    name: ["nameAr", "nameEn", "nameNl", "nameFr", "nameDe"]
  });

  const prevNamesRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const langKeys = ["Ar", "En", "Nl", "Fr", "De"] as const;
    const codes: Record<string, string> = { Ar: "ar", En: "en", Nl: "nl", Fr: "fr", De: "de" };

    langKeys.forEach((key, idx) => {
      const nameVal = watchedNames[idx];
      const prevName = prevNamesRef.current[key];
      const slugFieldName = `slug${key}` as keyof SubCategoriesType;
      const canonicalFieldName = `seo_canonical_url${key}` as keyof SubCategoriesType;

      if (nameVal && typeof nameVal === "string" && nameVal !== prevName) {
        prevNamesRef.current[key] = nameVal;
        const isSlugDirty = (dirtyFields as any)?.[slugFieldName];

        if (!isSlugDirty) {
          const autoSlug = generateSlug(nameVal);
          setValue(slugFieldName, autoSlug as any, { shouldValidate: false });

          const isCanonicalDirty = (dirtyFields as any)?.[canonicalFieldName] || (dirtyFields as any)?.seo_canonical_url;
          if (!isCanonicalDirty && autoSlug) {
            const selfReferencingUrl = `https://globfreight.com/${codes[key]}/sub-categories/${autoSlug}`;
            setValue(canonicalFieldName, selfReferencingUrl as any, { shouldValidate: false });
            if (codes[key] === "en" || key === "En") {
              setValue("seo_canonical_url" as any, selfReferencingUrl as any, { shouldValidate: false });
            }
          }
        }
      }
    });
  }, [watchedNames, dirtyFields, setValue]);

  const onSubmit = async (formData: SubCategoriesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData, dirtyFields }),
      endpoint: ["adminSubCategories"],
      reset: reset,
      redirectLink: "sub-categories",
      method: "POST",
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

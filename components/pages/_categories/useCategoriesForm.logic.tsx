"use client";

import { useEffect, useRef } from "react";
import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { generateSlug } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { CategoriesInputs } from "./categories.inputs";
import { CategoriesSchema, type CategoriesType } from "./categories.schema";

export default function useCategoriesLogic({ data }: { data?: CategoriesType }) {
  const t = useTranslations();
  const inputs = CategoriesInputs();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields }
  } = useForm<CategoriesType>({
    mode: "onSubmit",
    resolver: zodResolver(CategoriesSchema(t)),
    defaultValues: extractFormDefaultInputs(inputs, data) as CategoriesType,
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
      const slugFieldName = `slug${key}` as keyof CategoriesType;
      const canonicalFieldName = `seo_canonical_url${key}` as keyof CategoriesType;

      if (nameVal && typeof nameVal === "string" && nameVal !== prevName) {
        prevNamesRef.current[key] = nameVal;
        const isSlugDirty = (dirtyFields as any)?.[slugFieldName];

        if (!isSlugDirty) {
          const autoSlug = generateSlug(nameVal);
          setValue(slugFieldName, autoSlug as any, { shouldValidate: false });

          const isCanonicalDirty = (dirtyFields as any)?.[canonicalFieldName] || (dirtyFields as any)?.seo_canonical_url;
          if (!isCanonicalDirty && autoSlug) {
            const selfReferencingUrl = `https://globfreight.com/${codes[key]}/categories/${autoSlug}`;
            setValue(canonicalFieldName, selfReferencingUrl as any, { shouldValidate: false });
            if (codes[key] === "en" || key === "En") {
              setValue("seo_canonical_url" as any, selfReferencingUrl as any, { shouldValidate: false });
            }
          }
        }
      }
    });
  }, [watchedNames, dirtyFields, setValue]);

  const onSubmit = async (formData: CategoriesType) => {
    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: formData, dirtyFields }),
      endpoint: ["adminCategories"],
      reset: reset,
      method: "POST",
      redirectLink: "categories",
      t,
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

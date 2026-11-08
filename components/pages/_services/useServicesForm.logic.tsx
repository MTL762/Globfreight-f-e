"use client";

import { useEffect, useRef } from "react";
import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { generateSlug } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { ServicesInputs } from "./services.inputs";
import { ServicesSchema, type ServicesType } from "./services.schema";
import { FORM_LANGUAGES } from "@/components/common/Form/CustomFormTypes.types";

export default function useServicesLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = ServicesInputs();
  const locale = useLocale();

  const normalizedData = data
    ? {
        ...data,
        parent_id: data.parent_id ?? data.parent?.id ?? ""
      }
    : data;

  // Extract initial features per language
  const getInitialFeatures = (sourceData: any) => {
    const featuresMap: Record<string, string[]> = {};
    FORM_LANGUAGES.forEach(({ code, key }) => {
      let langFeatures: any[] = [];
      if (sourceData?.features && typeof sourceData.features === "object" && !Array.isArray(sourceData.features)) {
        langFeatures = sourceData.features[code] || [];
      } else if (Array.isArray(sourceData?.features)) {
        if (code === "en" || code === locale) {
          langFeatures = sourceData.features;
        }
      }
      featuresMap[`features${key}`] = Array.isArray(langFeatures)
        ? langFeatures.map((item: any) => (typeof item === "string" ? item : item?.value ?? ""))
        : [];
    });
    return featuresMap;
  };

  const initialFeatures = getInitialFeatures(normalizedData);
  const formDefaults = extractFormDefaultInputs(inputs, normalizedData) as Record<string, any>;

  const buildDefaultValues = (sourceData: any, defaults: Record<string, any>, features: Record<string, string[]>) => ({
    ...defaults,
    parent_id: defaults.parent_id || sourceData?.parent_id || sourceData?.parent?.id || "",
    is_active: sourceData?.is_active !== undefined ? Boolean(sourceData.is_active) : true,
    is_featured: sourceData?.is_featured !== undefined ? Boolean(sourceData.is_featured) : false,
    order: sourceData?.order ?? defaults?.order ?? 0,
    published_locales: Array.isArray(sourceData?.published_locales)
      ? sourceData.published_locales
      : Array.isArray(defaults?.published_locales)
      ? defaults.published_locales
      : [],
    seo_schema_markup_type: defaults.seo_schema_markup_type || sourceData?.seo?.schema_markup_type || "Service",
    seo_meta_robots: defaults.seo_meta_robots || sourceData?.seo?.meta_robots || "index, follow",
    seo_twitter_card: defaults.seo_twitter_card || sourceData?.seo?.twitter_card || "summary_large_image",
    seo_faq_ids: Array.isArray(defaults.seo_faq_ids)
      ? defaults.seo_faq_ids
      : Array.isArray(sourceData?.seo?.faq_ids)
      ? sourceData.seo.faq_ids
      : Array.isArray(sourceData?.seo?.faqs)
      ? sourceData.seo.faqs
      : [],
    ...features
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields }
  } = useForm<ServicesType>({
    mode: "onSubmit",
    resolver: zodResolver(ServicesSchema(t)),
    defaultValues: buildDefaultValues(normalizedData, formDefaults, initialFeatures) as any
  });

  // Re-populate form whenever data is loaded / changed
  useEffect(() => {
    if (data) {
      const refreshedData = {
        ...data,
        parent_id: data.parent_id ?? data.parent?.id ?? ""
      };
      const refreshedDefaults = extractFormDefaultInputs(inputs, refreshedData) as Record<string, any>;
      const refreshedFeatures = getInitialFeatures(refreshedData);
      reset(buildDefaultValues(refreshedData, refreshedDefaults, refreshedFeatures) as any);
    }
  }, [data]);

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
      const slugFieldName = `slug${key}` as keyof ServicesType;
      const canonicalFieldName = `seo_canonical_url${key}` as keyof ServicesType;

      if (nameVal && typeof nameVal === "string" && nameVal !== prevName) {
        prevNamesRef.current[key] = nameVal;
        const isSlugDirty = (dirtyFields as any)?.[slugFieldName];

        if (!isSlugDirty) {
          const autoSlug = generateSlug(nameVal);
          setValue(slugFieldName, autoSlug as any, { shouldValidate: false });

          const isCanonicalDirty =
            (dirtyFields as any)?.[canonicalFieldName] || (dirtyFields as any)?.seo_canonical_url;
          if (!isCanonicalDirty && autoSlug) {
            const selfReferencingUrl = `https://globfreight.com/${codes[key]}/services/${autoSlug}`;
            setValue(canonicalFieldName, selfReferencingUrl as any, { shouldValidate: false });
            if (codes[key] === "en" || key === "En") {
              setValue("seo_canonical_url" as any, selfReferencingUrl as any, { shouldValidate: false });
            }
          }
        }
      }
    });
  }, [watchedNames, dirtyFields, setValue]);

  const onSubmit = async (formData: ServicesType) => {
    const payload = {
      ...formData,
      parent_id:
        formData.parent_id && Number(formData.parent_id) > 0 ? Number(formData.parent_id) : null,
      is_active: formData.is_active ? 1 : 0,
      is_featured: formData.is_featured ? 1 : 0,
      order: Number(formData.order) || 0,
      published_locales:
        Array.isArray(formData.published_locales) && formData.published_locales.length > 0
          ? formData.published_locales
          : undefined
    };

    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: payload, dirtyFields }),
      endpoint: ["adminServices"],
      reset: reset,
      method: "POST",
      redirectLink: "admin/services",
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


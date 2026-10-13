"use client";

import { useEffect, useRef } from "react";
import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { generateSlug } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { BlogInputs } from "./blog.inputs";
import { BlogSchema, type BlogType } from "./blog.schema";
import { FORM_LANGUAGES } from "@/components/common/Form/CustomFormTypes.types";

export default function useBlogLogic({ data }: { data?: any }) {
  const t = useTranslations();
  const inputs = BlogInputs();
  const locale = useLocale();

  // Normalize incoming data from API (flatten nested relations)
  const normalizedData = data
    ? {
        ...data,
        category_id: data.category_id ?? data.category?.id ?? "",
        sub_category_id: data.sub_category_id ?? data.sub_category?.id ?? ""
      }
    : data;

  // Extract initial tags per language
  const getInitialTags = (sourceData: any) => {
    const tagsMap: Record<string, string[]> = {};
    FORM_LANGUAGES.forEach(({ code, key }) => {
      let langTags: any[] = [];
      if (sourceData?.tags && typeof sourceData.tags === "object" && !Array.isArray(sourceData.tags)) {
        langTags = sourceData.tags[code] || [];
      } else if (Array.isArray(sourceData?.tags)) {
        if (code === "en" || code === locale) {
          langTags = sourceData.tags;
        }
      }
      tagsMap[`tags${key}`] = Array.isArray(langTags)
        ? langTags.map((item: any) => (typeof item === "string" ? item : item?.value ?? ""))
        : [];
    });
    return tagsMap;
  };

  const initialTags = getInitialTags(normalizedData);
  const formDefaults = extractFormDefaultInputs(inputs, normalizedData) as Record<string, any>;

  const buildDefaultValues = (sourceData: any, defaults: Record<string, any>, tags: Record<string, string[]>) => ({
    ...defaults,
    category_id: defaults.category_id || sourceData?.category_id || sourceData?.category?.id || "",
    sub_category_id: defaults.sub_category_id || sourceData?.sub_category_id || sourceData?.sub_category?.id || "",
    is_featured: sourceData?.is_featured !== undefined ? Boolean(sourceData.is_featured) : false,
    status: sourceData?.status || "published",
    statusEn: defaults.statusEn || sourceData?.status?.en || sourceData?.status || "published",
    statusAr: defaults.statusAr || sourceData?.status?.ar || "draft",
    statusNl: defaults.statusNl || sourceData?.status?.nl || "draft",
    statusFr: defaults.statusFr || sourceData?.status?.fr || "draft",
    statusDe: defaults.statusDe || sourceData?.status?.de || "draft",
    seo_schema_markup_type: defaults.seo_schema_markup_type || sourceData?.seo?.schema_markup_type || "Article",
    seo_meta_robots: defaults.seo_meta_robots || sourceData?.seo?.meta_robots || "index, follow",
    seo_twitter_card: defaults.seo_twitter_card || sourceData?.seo?.twitter_card || "summary_large_image",
    seo_faqs: Array.isArray(defaults.seo_faqs) ? defaults.seo_faqs : Array.isArray(sourceData?.seo?.faqs) ? sourceData.seo.faqs : [],
    ...tags
  });

  const { control, handleSubmit, reset, setValue, formState: { dirtyFields } } = useForm<BlogType>({
    mode: "onSubmit",
    resolver: zodResolver(BlogSchema(t, locale as any)),
    defaultValues: buildDefaultValues(normalizedData, formDefaults, initialTags) as any
  });

  // Re-populate form whenever data is loaded / changed
  useEffect(() => {
    if (data) {
      const refreshedData = {
        ...data,
        category_id: data.category_id ?? data.category?.id ?? "",
        sub_category_id: data.sub_category_id ?? data.sub_category?.id ?? ""
      };
      const refreshedDefaults = extractFormDefaultInputs(inputs, refreshedData) as Record<string, any>;
      const refreshedTags = getInitialTags(refreshedData);
      reset(buildDefaultValues(refreshedData, refreshedDefaults, refreshedTags) as any);
    }
  }, [data]);

  // Watch titles and slugs to auto-generate slugs and self-referencing canonical URLs
  const watchedTitles = useWatch({
    control,
    name: ["titleAr", "titleEn", "titleNl", "titleFr", "titleDe"]
  });

  const prevTitlesRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const langKeys = ["Ar", "En", "Nl", "Fr", "De"] as const;
    const codes: Record<string, string> = { Ar: "ar", En: "en", Nl: "nl", Fr: "fr", De: "de" };

    langKeys.forEach((key, idx) => {
      const titleVal = watchedTitles[idx];
      const prevTitle = prevTitlesRef.current[key];
      const slugFieldName = `slug${key}` as keyof BlogType;
      const canonicalFieldName = `seo_canonical_url${key}` as keyof BlogType;

      if (titleVal && typeof titleVal === "string" && titleVal !== prevTitle) {
        prevTitlesRef.current[key] = titleVal;
        const isSlugDirty = (dirtyFields as any)?.[slugFieldName];

        // Only auto-generate slug if the user has not manually overridden the slug
        if (!isSlugDirty) {
          const autoSlug = generateSlug(titleVal);
          setValue(slugFieldName, autoSlug as any, { shouldValidate: false });

          // Auto-fill self-referencing canonical URL if canonical URL is not manually edited
          const isCanonicalDirty = (dirtyFields as any)?.[canonicalFieldName] || (dirtyFields as any)?.seo_canonical_url;
          if (!isCanonicalDirty && autoSlug) {
            const selfReferencingUrl = `https://globfreight.com/${codes[key]}/blog/${autoSlug}`;
            setValue(canonicalFieldName, selfReferencingUrl as any, { shouldValidate: false });
            if (codes[key] === locale || key === "En") {
              setValue("seo_canonical_url" as any, selfReferencingUrl as any, { shouldValidate: false });
            }
          }
        }
      }
    });
  }, [watchedTitles, dirtyFields, setValue, locale]);

  const onSubmit = async (formData: BlogType) => {
    const payload = {
      ...formData,
      category_id: formData.category_id || data?.category_id || data?.category?.id,
      sub_category_id: formData.sub_category_id || data?.sub_category_id || data?.sub_category?.id || undefined,
      status: formData.statusEn || formData.status || "published",
      is_featured: formData.is_featured ? 1 : 0
    };

    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: payload }),
      endpoint: ["adminBlogPosts"],
      reset: reset,
      method: "POST",
      redirectLink: "admin/blog",
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

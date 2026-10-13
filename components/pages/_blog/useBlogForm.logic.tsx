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

  // Extract initial tags per language
  const initialTags: Record<string, string[]> = {};
  FORM_LANGUAGES.forEach(({ code, key }) => {
    let langTags: any[] = [];
    if (data?.tags && typeof data.tags === "object" && !Array.isArray(data.tags)) {
      langTags = data.tags[code] || [];
    } else if (Array.isArray(data?.tags)) {
      // If scalar array from backend, assign to english or active locale
      if (code === "en" || code === locale) {
        langTags = data.tags;
      }
    }
    initialTags[`tags${key}`] = Array.isArray(langTags)
      ? langTags.map((item: any) => (typeof item === "string" ? item : item?.value ?? ""))
      : [];
  });

  const formDefaults = extractFormDefaultInputs(inputs, data) as Record<string, any>;

  const { control, handleSubmit, reset, setValue, formState: { dirtyFields } } = useForm<BlogType>({
    mode: "onSubmit",
    resolver: zodResolver(BlogSchema(t, locale as any)),
    defaultValues: {
      ...formDefaults,
      // Featured Article default value to False
      is_featured: data?.is_featured !== undefined ? Boolean(data.is_featured) : false,
      // Status defaults per language: empty translations default to 'draft'
      status: data?.status || "published",
      statusEn: formDefaults.statusEn || data?.status?.en || data?.status || "published",
      statusAr: formDefaults.statusAr || data?.status?.ar || "draft",
      statusNl: formDefaults.statusNl || data?.status?.nl || "draft",
      statusFr: formDefaults.statusFr || data?.status?.fr || "draft",
      statusDe: formDefaults.statusDe || data?.status?.de || "draft",
      // Schema Markup defaults
      seo_schema_markup_type: formDefaults.seo_schema_markup_type || data?.seo?.schema_markup_type || "Article",
      seo_meta_robots: formDefaults.seo_meta_robots || data?.seo?.meta_robots || "index, follow",
      seo_twitter_card: formDefaults.seo_twitter_card || data?.seo?.twitter_card || "summary_large_image",
      seo_faqs: Array.isArray(formDefaults.seo_faqs) ? formDefaults.seo_faqs : Array.isArray(data?.seo?.faqs) ? data.seo.faqs : [],
      ...initialTags,
    } as any
  });

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
  }, [watchedTitles, dirtyFields, setValue]);

  const onSubmit = async (formData: BlogType) => {
    // Top-level fallback for scalar-only APIs
    const payload = {
      ...formData,
      status: formData.statusEn || formData.status || "published",
      is_featured: formData.is_featured ? 1 : 0
    };

    await FormAction({
      data,
      formData: extractFormNameInputs({ inputs, data: payload, dirtyFields }),
      endpoint: ["adminBlogPosts"],
      reset: reset,
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

import { z } from "zod";
import { StringReq, StringNotReq, noSchema } from "@/validations/String.schema";
import { OptionalLinkSchema } from "@/validations/Link.schema";
import { Locale } from "next-intl";

export const BlogSchema = (t: TFunction, locale: Locale) => {
  return z.object({
    category_id: z.coerce.number().min(1, { message: t(`Validations.required`) }),
    sub_category_id: z.coerce.number().optional().nullable(),
    titleAr: locale == "ar" ? StringReq(t, 2) : StringNotReq(),
    titleEn: locale == "en" ? StringReq(t, 2) : StringNotReq(),
    titleNl: locale == "nl" ? StringReq(t, 2) : StringNotReq(),
    titleFr: locale == "fr" ? StringReq(t, 2) : StringNotReq(),
    titleDe: locale == "de" ? StringReq(t, 2) : StringNotReq(),
    excerptAr: locale == "ar" ? StringReq(t, 5) : StringNotReq(),
    excerptEn: locale == "en" ? StringReq(t, 5) : StringNotReq(),
    excerptNl: locale == "nl" ? StringReq(t, 5) : StringNotReq(),
    excerptFr: locale == "fr" ? StringReq(t, 5) : StringNotReq(),
    excerptDe: locale == "de" ? StringReq(t, 5) : StringNotReq(),
    contentAr: locale == "ar" ? StringReq(t, 5) : StringNotReq(),
    contentEn: locale == "en" ? StringReq(t, 5) : StringNotReq(),
    contentNl: locale == "nl" ? StringReq(t, 5) : StringNotReq(),
    contentFr: locale == "fr" ? StringReq(t, 5) : StringNotReq(),
    contentDe: locale == "de" ? StringReq(t, 5) : StringNotReq(),
    status: z.enum(["published", "draft", "archived"]).default("published"),
    is_featured: noSchema(),
    tags: z.array(z.string()).optional().default([]),
    imageAr: noSchema().optional(),
    imageEn: noSchema().optional(),
    imageNl: noSchema().optional(),
    imageFr: noSchema().optional(),
    imageDe: noSchema().optional(),
    // SEO fields
    seo_meta_titleAr: locale == "ar" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleEn: locale == "en" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleNl: locale == "nl" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleFr: locale == "fr" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleDe: locale == "de" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_descriptionAr: locale == "ar" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionEn: locale == "en" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionNl: locale == "nl" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionFr: locale == "fr" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionDe: locale == "de" ? StringReq(t, 5) : StringNotReq(),
    seo_focus_keyphrase: StringNotReq(),
    seo_canonical_url: OptionalLinkSchema(t),
    seo_schema_markup_type: StringNotReq(),
  });
};

export type BlogType = z.infer<ReturnType<typeof BlogSchema>>;

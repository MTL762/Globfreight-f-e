import { z } from "zod";
import { StringReq, StringNotReq, noSchema } from "@/validations/String.schema";
import { OptionalLinkSchema } from "@/validations/Link.schema";
import { Locale } from "next-intl";

export const BlogSchema = (t: TFunction, locale: Locale) => {
  return z.object({
    category_id: z.coerce.number().min(1, { message: t(`Validations.required`) }),
    sub_category_id: z.coerce.number().optional().nullable(),
    titleAr: locale === "ar" ? StringReq(t, 2) : StringNotReq(),
    titleEn: locale === "en" ? StringReq(t, 2) : StringNotReq(),
    titleNl: locale === "nl" ? StringReq(t, 2) : StringNotReq(),
    titleFr: locale === "fr" ? StringReq(t, 2) : StringNotReq(),
    titleDe: locale === "de" ? StringReq(t, 2) : StringNotReq(),
    excerptAr: locale === "ar" ? StringReq(t, 5) : StringNotReq(),
    excerptEn: locale === "en" ? StringReq(t, 5) : StringNotReq(),
    excerptNl: locale === "nl" ? StringReq(t, 5) : StringNotReq(),
    excerptFr: locale === "fr" ? StringReq(t, 5) : StringNotReq(),
    excerptDe: locale === "de" ? StringReq(t, 5) : StringNotReq(),
    contentAr: locale === "ar" ? StringReq(t, 5) : StringNotReq(),
    contentEn: locale === "en" ? StringReq(t, 5) : StringNotReq(),
    contentNl: locale === "nl" ? StringReq(t, 5) : StringNotReq(),
    contentFr: locale === "fr" ? StringReq(t, 5) : StringNotReq(),
    contentDe: locale === "de" ? StringReq(t, 5) : StringNotReq(),

    // Status per language
    status: z.enum(["published", "draft", "archived"]).optional().default("published"),
    statusAr: z.enum(["published", "draft", "archived"]).optional().default("draft"),
    statusEn: z.enum(["published", "draft", "archived"]).optional().default("published"),
    statusNl: z.enum(["published", "draft", "archived"]).optional().default("draft"),
    statusFr: z.enum(["published", "draft", "archived"]).optional().default("draft"),
    statusDe: z.enum(["published", "draft", "archived"]).optional().default("draft"),

    // Featured Article default to False
    is_featured: z.coerce.boolean().default(false),

    // Tags per language
    tags: z.array(z.string()).optional().default([]),
    tagsAr: z.array(z.string()).optional().default([]),
    tagsEn: z.array(z.string()).optional().default([]),
    tagsNl: z.array(z.string()).optional().default([]),
    tagsFr: z.array(z.string()).optional().default([]),
    tagsDe: z.array(z.string()).optional().default([]),

    // Slugs per language
    slugAr: StringNotReq(),
    slugEn: StringNotReq(),
    slugNl: StringNotReq(),
    slugFr: StringNotReq(),
    slugDe: StringNotReq(),

    // Images and Alt Text per language
    imageAr: noSchema().optional(),
    imageEn: noSchema().optional(),
    imageNl: noSchema().optional(),
    imageFr: noSchema().optional(),
    imageDe: noSchema().optional(),

    image_altAr: StringNotReq(),
    image_altEn: StringNotReq(),
    image_altNl: StringNotReq(),
    image_altFr: StringNotReq(),
    image_altDe: StringNotReq(),

    // SEO fields per language
    seo_meta_titleAr: locale === "ar" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleEn: locale === "en" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleNl: locale === "nl" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleFr: locale === "fr" ? StringReq(t, 2) : StringNotReq(),
    seo_meta_titleDe: locale === "de" ? StringReq(t, 2) : StringNotReq(),

    seo_meta_descriptionAr: locale === "ar" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionEn: locale === "en" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionNl: locale === "nl" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionFr: locale === "fr" ? StringReq(t, 5) : StringNotReq(),
    seo_meta_descriptionDe: locale === "de" ? StringReq(t, 5) : StringNotReq(),

    seo_focus_keyphrase: StringNotReq(),
    seo_focus_keyphraseAr: StringNotReq(),
    seo_focus_keyphraseEn: StringNotReq(),
    seo_focus_keyphraseNl: StringNotReq(),
    seo_focus_keyphraseFr: StringNotReq(),
    seo_focus_keyphraseDe: StringNotReq(),

    // Social Sharing (Open Graph)
    seo_og_titleAr: StringNotReq(),
    seo_og_titleEn: StringNotReq(),
    seo_og_titleNl: StringNotReq(),
    seo_og_titleFr: StringNotReq(),
    seo_og_titleDe: StringNotReq(),

    seo_og_descriptionAr: StringNotReq(),
    seo_og_descriptionEn: StringNotReq(),
    seo_og_descriptionNl: StringNotReq(),
    seo_og_descriptionFr: StringNotReq(),
    seo_og_descriptionDe: StringNotReq(),

    seo_og_image: noSchema().optional(),
    seo_og_image_altAr: StringNotReq(),
    seo_og_image_altEn: StringNotReq(),
    seo_og_image_altNl: StringNotReq(),
    seo_og_image_altFr: StringNotReq(),
    seo_og_image_altDe: StringNotReq(),

    // Twitter / X
    seo_twitter_card: z.enum(["summary_large_image", "summary"]).optional().default("summary_large_image"),
    seo_twitter_image: noSchema().optional(),
    seo_twitter_titleAr: StringNotReq(),
    seo_twitter_titleEn: StringNotReq(),
    seo_twitter_titleNl: StringNotReq(),
    seo_twitter_titleFr: StringNotReq(),
    seo_twitter_titleDe: StringNotReq(),

    seo_twitter_descriptionAr: StringNotReq(),
    seo_twitter_descriptionEn: StringNotReq(),
    seo_twitter_descriptionNl: StringNotReq(),
    seo_twitter_descriptionFr: StringNotReq(),
    seo_twitter_descriptionDe: StringNotReq(),

    // Scalar SEO configurations
    seo_canonical_url: OptionalLinkSchema(t),
    seo_canonical_urlAr: OptionalLinkSchema(t),
    seo_canonical_urlEn: OptionalLinkSchema(t),
    seo_canonical_urlNl: OptionalLinkSchema(t),
    seo_canonical_urlFr: OptionalLinkSchema(t),
    seo_canonical_urlDe: OptionalLinkSchema(t),

    seo_meta_robots: z.string().optional().default("index, follow"),
    seo_keywords: StringNotReq(),
    seo_schema_markup_type: z.string().optional().default("Article"),
    seo_schema_markup_typeAr: StringNotReq(),
    seo_schema_markup_typeEn: StringNotReq(),
    seo_schema_markup_typeNl: StringNotReq(),
    seo_schema_markup_typeFr: StringNotReq(),
    seo_schema_markup_typeDe: StringNotReq(),

    seo_schema_markup: StringNotReq(),
    seo_faqs: z.array(z.object({ question: z.string().optional(), answer: z.string().optional() })).optional().default([]),
  });
};

export type BlogType = z.infer<ReturnType<typeof BlogSchema>>;

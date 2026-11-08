import { z } from "zod";
import { StringNotReq, noSchema } from "@/validations/String.schema";
import { OptionalLinkSchema, LocalizedOrOptionalLinkSchema } from "@/validations/Link.schema";
import { PriceSchema } from "@/validations/Number.schema";

export const ServicesSchema = (t: TFunction) => {
  return z
    .object({
      parent_id: z.coerce.number().optional().nullable(),
      icon: StringNotReq(),
      order: PriceSchema(t, 0),
      is_active: noSchema(),
      is_featured: noSchema(),
      published_locales: z.array(z.string()).optional(),

      // Multilingual Content
      nameAr: StringNotReq(),
      nameEn: StringNotReq(),
      nameNl: StringNotReq(),
      nameFr: StringNotReq(),
      nameDe: StringNotReq(),

      slugAr: StringNotReq(),
      slugEn: StringNotReq(),
      slugNl: StringNotReq(),
      slugFr: StringNotReq(),
      slugDe: StringNotReq(),

      short_descriptionAr: StringNotReq(),
      short_descriptionEn: StringNotReq(),
      short_descriptionNl: StringNotReq(),
      short_descriptionFr: StringNotReq(),
      short_descriptionDe: StringNotReq(),

      descriptionAr: StringNotReq(),
      descriptionEn: StringNotReq(),
      descriptionNl: StringNotReq(),
      descriptionFr: StringNotReq(),
      descriptionDe: StringNotReq(),

      featuresAr: noSchema().optional(),
      featuresEn: noSchema().optional(),
      featuresNl: noSchema().optional(),
      featuresFr: noSchema().optional(),
      featuresDe: noSchema().optional(),

      // Media
      image: noSchema().optional(),
      image_altAr: StringNotReq(),
      image_altEn: StringNotReq(),
      image_altNl: StringNotReq(),
      image_altFr: StringNotReq(),
      image_altDe: StringNotReq(),

      // SEO fields
      seo_meta_titleAr: StringNotReq(),
      seo_meta_titleEn: StringNotReq(),
      seo_meta_titleNl: StringNotReq(),
      seo_meta_titleFr: StringNotReq(),
      seo_meta_titleDe: StringNotReq(),

      seo_meta_descriptionAr: StringNotReq(),
      seo_meta_descriptionEn: StringNotReq(),
      seo_meta_descriptionNl: StringNotReq(),
      seo_meta_descriptionFr: StringNotReq(),
      seo_meta_descriptionDe: StringNotReq(),

      seo_focus_keyphrase: StringNotReq(),
      seo_focus_keyphraseAr: StringNotReq(),
      seo_focus_keyphraseEn: StringNotReq(),
      seo_focus_keyphraseNl: StringNotReq(),
      seo_focus_keyphraseFr: StringNotReq(),
      seo_focus_keyphraseDe: StringNotReq(),

      seo_canonical_url: LocalizedOrOptionalLinkSchema(t),
      seo_canonical_urlAr: OptionalLinkSchema(t),
      seo_canonical_urlEn: OptionalLinkSchema(t),
      seo_canonical_urlNl: OptionalLinkSchema(t),
      seo_canonical_urlFr: OptionalLinkSchema(t),
      seo_canonical_urlDe: OptionalLinkSchema(t),

      seo_meta_robots: z.string().optional().default("index, follow"),
      seo_keywords: StringNotReq(),

      // Open Graph
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

      // Twitter Card
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

      // Schema & FAQs
      seo_schema_markup_type: z.string().optional().default("Service"),
      seo_schema_markup: StringNotReq(),
      seo_faq_ids: z.array(z.union([z.number(), z.string(), z.object({ id: z.union([z.number(), z.string()]).optional(), question: z.string().optional() })])).optional().default([])
    })
    .refine(
      (data) => Boolean(data.nameEn || data.nameAr || data.nameNl || data.nameFr || data.nameDe),
      {
        message: t("Validations.required"),
        path: ["nameEn"]
      }
    );
};

export type ServicesType = z.infer<ReturnType<typeof ServicesSchema>>;


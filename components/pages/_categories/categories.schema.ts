import { z } from "zod";
import { StringReq, StringNotReq, noSchema } from "@/validations/String.schema";

export const CategoriesSchema = (t: TFunction) => {
  return z.object({
    nameAr: StringReq(t),
    nameEn: StringReq(t),
    nameNl: StringNotReq(),
    nameFr: StringNotReq(),
    nameDe: StringNotReq(),
    descriptionAr: StringReq(t),
    descriptionEn: StringReq(t),
    descriptionNl: StringNotReq(),
    descriptionFr: StringNotReq(),
    descriptionDe: StringNotReq(),
    slug: StringNotReq(),
    order: z.coerce.number().optional().nullable(),
    is_active: noSchema(),
    image: noSchema(),
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
    seo_canonical_url: StringNotReq(),
    seo_schema_markup_type: StringNotReq(),
  });
};

export type CategoriesType = z.infer<ReturnType<typeof CategoriesSchema>>;
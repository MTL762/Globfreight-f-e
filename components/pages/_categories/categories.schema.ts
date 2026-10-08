import { z } from "zod";
import { StringNotReq, noSchema } from "@/validations/String.schema";
import { OptionalLinkSchema } from "@/validations/Link.schema";
import { PriceSchema } from "@/validations/Number.schema";

export const CategoriesSchema = (t: TFunction) => {
  return z.object({
    nameAr: StringNotReq(),
    nameEn: StringNotReq(),
    nameNl: StringNotReq(),
    nameFr: StringNotReq(),
    nameDe: StringNotReq(),
    descriptionAr: StringNotReq(),
    descriptionEn: StringNotReq(),
    descriptionNl: StringNotReq(),
    descriptionFr: StringNotReq(),
    descriptionDe: StringNotReq(),
    // slug: StringNotReq(),
    slugAr: StringNotReq(),
    slugEn: StringNotReq(),
    slugNl: StringNotReq(),
    slugFr: StringNotReq(),
    slugDe: StringNotReq(),
    order: PriceSchema(t, 0),
    is_active: noSchema(),
    imageAr: noSchema().optional(),
    imageEn: noSchema().optional(),
    imageNl: noSchema().optional(),
    imageFr: noSchema().optional(),
    imageDe: noSchema().optional(),
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
    seo_canonical_url: OptionalLinkSchema(t),
    seo_schema_markup_type: StringNotReq(),
  });
};

export type CategoriesType = z.infer<ReturnType<typeof CategoriesSchema>>;
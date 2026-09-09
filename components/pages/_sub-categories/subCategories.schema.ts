import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const SubCategoriesSchema = (t: TFunction) => {
  return z.object({
    category_id: z.coerce.number().min(1, { message: t("Validations.required") }),
    nameAr: StringReq(t),
    nameEn: StringReq(t),
    nameNl: StringNotReq(),
    nameFr: StringNotReq(),
    nameDe: StringNotReq(),
    descriptionAr: StringNotReq(),
    descriptionEn: StringNotReq(),
    descriptionNl: StringNotReq(),
    descriptionFr: StringNotReq(),
    descriptionDe: StringNotReq(),
    slug: StringNotReq(),
    order: z.coerce.number().optional().nullable(),
    is_active: z.boolean().default(true),
    image: z.any().optional(),
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
  });
};

export type SubCategoriesType = z.infer<ReturnType<typeof SubCategoriesSchema>>;


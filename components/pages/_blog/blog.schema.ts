import { z } from "zod";
import { StringReq, StringNotReq, noSchema } from "@/validations/String.schema";

export const BlogSchema = (t: TFunction) => {
  return z.object({
    category_id: z.coerce.number().min(1, { message: t(`Validations.required`) }),
    sub_category_id: z.coerce.number().optional().nullable(),
    titleAr: StringReq(t, 2),
    titleEn: StringReq(t, 2),
    titleNl: StringNotReq(),
    titleFr: StringNotReq(),
    titleDe: StringNotReq(),
    excerptAr: StringNotReq(),
    excerptEn: StringNotReq(),
    excerptNl: StringNotReq(),
    excerptFr: StringNotReq(),
    excerptDe: StringNotReq(),
    contentAr: StringReq(t, 5),
    contentEn: StringReq(t, 5),
    contentNl: StringNotReq(),
    contentFr: StringNotReq(),
    contentDe: StringNotReq(),
    status: z.enum(["published", "draft", "archived"]).default("published"),
    is_featured: z.boolean().default(false).optional(),
    tags: z.array(z.object({ value: z.string().min(1) })).optional().default([]),
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

export type BlogType = z.infer<ReturnType<typeof BlogSchema>>;

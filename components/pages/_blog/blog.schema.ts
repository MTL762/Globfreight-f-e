import { z } from "zod";
import { StringReq, StringNotReq, noSchema } from "@/validations/String.schema";

export const BlogSchema = (t: TFunction) => {
  return z.object({
    category_id: z.coerce.number().min(1, { message: t(`Validations.required`) }),
    sub_category_id: z.coerce.number().optional().nullable(),
    titleAr: StringReq(t, 2),
    titleEn: StringReq(t, 2),
    excerptAr: StringNotReq(),
    excerptEn: StringNotReq(),
    contentAr: StringReq(t, 5),
    contentEn: StringReq(t, 5),
    status: z.enum(["published", "draft", "archived"]).default("published"),
    is_featured: z.boolean().default(false).optional(),
    tags: z.any().optional(),
    image: noSchema()
  });
};

export type BlogType = z.infer<ReturnType<typeof BlogSchema>>;

import { z } from "zod";

export const SubCategoriesSchema = (t: (key: string) => string) => {
  return z.object({
    category_id: z.coerce.number().min(1, { message: t("Required") }),
    name: z.object({
      en: z.string().min(1, { message: t("Required") }),
      ar: z.string().min(1, { message: t("Required") })
    }),
    description: z.object({
      en: z.string().optional(),
      ar: z.string().optional()
    }).optional(),
    order: z.coerce.number().optional(),
    is_active: z.boolean().default(true),
    image: z.any().optional()
  });
};

export type SubCategoriesType = z.infer<ReturnType<typeof SubCategoriesSchema>>;

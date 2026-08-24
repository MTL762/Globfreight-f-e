import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const SectionsSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    manager_id: z.coerce.number().optional().nullable(),
    parent_id: z.coerce.number().optional().nullable(),
    
  });
};

export type SectionsType = z.infer<ReturnType<typeof SectionsSchema>>;

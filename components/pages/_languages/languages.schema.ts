import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const LanguagesSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    code: StringReq(t, 2),
    direction: StringNotReq(),
    is_default: z.any().optional(),
    
  });
};

export type LanguagesType = z.infer<ReturnType<typeof LanguagesSchema>>;

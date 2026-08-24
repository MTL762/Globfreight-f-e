import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const DeductionsSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    amount: z.coerce.number(),
    type: StringNotReq(),
    date: StringNotReq(),
    reason: StringNotReq(),
    
  });
};

export type DeductionsType = z.infer<ReturnType<typeof DeductionsSchema>>;

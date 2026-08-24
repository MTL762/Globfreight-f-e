import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const WarningsSchema = (t: TFunction) => {
  return z.object({
    user_id: z.coerce.number(),
    type: StringReq(t, 2),
    warning_date: StringReq(t, 4),
    reason: StringReq(t, 2),
    action_taken: StringNotReq(),
    
  });
};

export type WarningsType = z.infer<ReturnType<typeof WarningsSchema>>;

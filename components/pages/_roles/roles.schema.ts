import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const RolesSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    permission_ids: z.array(z.coerce.number()).optional(),
    
  });
};

export type RolesType = z.infer<ReturnType<typeof RolesSchema>>;

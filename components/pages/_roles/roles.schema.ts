import { z } from "zod";
import { StringReq } from "@/validations/String.schema";

export const RolesSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    permission_ids: z
      .array(z.coerce.number())
      .min(1, { message: t(`Validations.required`) })
  });
};

export type RolesType = z.infer<ReturnType<typeof RolesSchema>>;

import { z } from "zod";
import { StringReq, EmailReq, noSchema, StringNotReq } from "@/validations/String.schema";

export const ProfileSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    email: EmailReq(t),
    phone: StringNotReq(),
    avatar: noSchema()
  });
};

export type ProfileType = z.infer<ReturnType<typeof ProfileSchema>>;

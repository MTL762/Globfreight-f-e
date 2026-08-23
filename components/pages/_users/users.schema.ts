import { z } from "zod";
import { StringReq, EmailReq, noSchema } from "@/validations/String.schema";

export const UsersSchema = (t: TFunction, isEdit = false) => {
  return z
    .object({
      name: StringReq(t, 2),
      email: EmailReq(t),
      role_id: z.coerce.number().min(1, { message: t(`Validations.required`) }),
      password: isEdit
        ? z.string().optional().or(z.literal(""))
        : z
            .string({ required_error: t(`Validations.required`) })
            .min(8, { message: t(`Validations.min8`) }),
      password_confirmation: isEdit
        ? z.string().optional().or(z.literal(""))
        : z.string().optional(),
      avatar: noSchema()
    })
    .refine(
      (data) => {
        if (!isEdit && data.password && data.password !== data.password_confirmation) {
          return false;
        }
        if (isEdit && data.password && data.password !== data.password_confirmation) {
          return false;
        }
        return true;
      },
      {
        message: t(`Validations.passwordMatch`) || "Passwords must match",
        path: ["password_confirmation"]
      }
    );
};

export type UsersType = z.infer<ReturnType<typeof UsersSchema>>;

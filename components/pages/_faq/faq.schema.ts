import { z } from "zod";
import { StringReq, noSchema } from "@/validations/String.schema";
import { selectNotReq } from "@/validations/Select.schema";

export const FaqSchema = (t: TFunction) => {
  return z.object({
    category_id: selectNotReq(),
    questionAr: StringReq(t),
    questionEn: StringReq(t),
    answerAr: StringReq(t),
    answerEn: StringReq(t),
    is_active: noSchema(),
    order: z.coerce.number().optional().nullable()
  });
};

export type FaqType = z.infer<ReturnType<typeof FaqSchema>>;
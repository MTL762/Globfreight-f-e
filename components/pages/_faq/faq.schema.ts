import { z } from "zod";
import { StringReq, StringNotReq, noSchema } from "@/validations/String.schema";
import { selectNotReq } from "@/validations/Select.schema";

export const FaqSchema = (t: TFunction) => {
  return z.object({
    category_id: selectNotReq(),
    questionAr: StringReq(t),
    questionEn: StringReq(t),
    questionNl: StringNotReq(),
    questionFr: StringNotReq(),
    questionDe: StringNotReq(),
    answerAr: StringReq(t),
    answerEn: StringReq(t),
    answerNl: StringNotReq(),
    answerFr: StringNotReq(),
    answerDe: StringNotReq(),
    is_active: noSchema(),
    order: z.coerce.number().optional().nullable()
  });
};

export type FaqType = z.infer<ReturnType<typeof FaqSchema>>;
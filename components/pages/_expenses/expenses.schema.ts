import { z } from "zod";
import { StringReq, StringNotReq, noSchema } from "@/validations/String.schema";

export const ExpensesSchema = (t: TFunction) => {
  return z.object({
    title: StringReq(t, 2),
    amount: z.coerce.number(),
    category: StringNotReq(),
    expense_date: StringReq(t, 4),
    receipt: noSchema(),
    description: StringNotReq(),
    
  });
};

export type ExpensesType = z.infer<ReturnType<typeof ExpensesSchema>>;

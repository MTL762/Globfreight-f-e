import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const SalariesSchema = (t: TFunction) => {
  return z.object({
    user_id: z.coerce.number(),
    basic_salary: z.coerce.number(),
    allowances: z.coerce.number().optional().nullable(),
    deductions: z.coerce.number().optional().nullable(),
    effective_date: StringNotReq(),
    payment_method: StringNotReq(),
    notes: StringNotReq(),
    
  });
};

export type SalariesType = z.infer<ReturnType<typeof SalariesSchema>>;

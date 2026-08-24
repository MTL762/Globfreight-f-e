import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const CustomersSchema = (t: TFunction) => {
  return z.object({
    first_name: StringReq(t, 2),
    last_name: StringReq(t, 2),
    email: EmailReq(t),
    phone: StringNotReq(),
    alt_phone: StringNotReq(),
    company_name: StringNotReq(),
    tax_number: StringNotReq(),
    country: StringNotReq(),
    city: StringNotReq(),
    address: StringNotReq(),
    notes: StringNotReq(),
    
  });
};

export type CustomersType = z.infer<ReturnType<typeof CustomersSchema>>;

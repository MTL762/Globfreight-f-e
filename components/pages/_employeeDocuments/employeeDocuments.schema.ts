import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const EmployeeDocumentsSchema = (t: TFunction) => {
  return z.object({
    user_id: z.coerce.number(),
    title: StringReq(t, 2),
    type: StringNotReq(),
    expiry_date: StringNotReq(),
    file: noSchema(),
    notes: StringNotReq(),
    
  });
};

export type EmployeeDocumentsType = z.infer<ReturnType<typeof EmployeeDocumentsSchema>>;

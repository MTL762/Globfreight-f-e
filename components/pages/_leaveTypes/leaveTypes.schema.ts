import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const LeaveTypesSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    days_per_year: z.coerce.number(),
    is_paid: z.any().optional(),
    requires_approval: z.any().optional(),
    description: StringNotReq(),
    
  });
};

export type LeaveTypesType = z.infer<ReturnType<typeof LeaveTypesSchema>>;

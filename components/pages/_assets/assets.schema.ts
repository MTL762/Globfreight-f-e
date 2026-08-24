import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const AssetsSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    code: StringReq(t, 2),
    type: StringNotReq(),
    serial_number: StringNotReq(),
    purchase_date: StringNotReq(),
    purchase_cost: z.coerce.number().optional().nullable(),
    status: StringNotReq(),
    notes: StringNotReq(),
    
  });
};

export type AssetsType = z.infer<ReturnType<typeof AssetsSchema>>;

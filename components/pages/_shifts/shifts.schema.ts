import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const ShiftsSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    start_time: StringReq(t, 2),
    end_time: StringReq(t, 2),
    break_duration: z.coerce.number().optional().nullable(),
    is_night_shift: z.any().optional(),
    
  });
};

export type ShiftsType = z.infer<ReturnType<typeof ShiftsSchema>>;

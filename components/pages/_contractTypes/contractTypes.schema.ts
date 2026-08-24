import { z } from "zod";
import { StringReq } from "@/validations/String.schema";

export const ContractTypesSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    bonus_day_off: z.any().optional(),
    has_attendance: z.any().optional(),
    has_annual_leave: z.any().optional(),
    
  });
};

export type ContractTypesType = z.infer<ReturnType<typeof ContractTypesSchema>>;

import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const ContractSchema = (t: TFunction) => {
  return z.object({
    user_id: z.coerce.number(),
    contract_type_id: z.coerce.number(),
    section_id: z.coerce.number(),
    phone: StringReq(t, 5),
    start_at: StringReq(t, 4),
    end_at: StringReq(t, 4),
    birth_date: StringNotReq(),
    academic_qualification: StringNotReq(),
    qualifications: StringNotReq(),
    experience: StringNotReq(),
    
  });
};

export type ContractType = z.infer<ReturnType<typeof ContractSchema>>;

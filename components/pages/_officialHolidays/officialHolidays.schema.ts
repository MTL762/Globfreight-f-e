import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const OfficialHolidaysSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    start_date: StringReq(t, 4),
    end_date: StringReq(t, 4),
    description: StringNotReq(),
    
  });
};

export type OfficialHolidaysType = z.infer<ReturnType<typeof OfficialHolidaysSchema>>;

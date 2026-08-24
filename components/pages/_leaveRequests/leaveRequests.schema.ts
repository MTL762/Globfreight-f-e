import { z } from "zod";
import { StringReq, noSchema } from "@/validations/String.schema";

export const LeaveRequestsSchema = (t: TFunction) => {
  return z.object({
    leave_type_id: z.coerce.number(),
    start_date: StringReq(t, 4),
    end_date: StringReq(t, 4),
    attachment: noSchema(),
    reason: StringReq(t, 2),
    
  });
};

export type LeaveRequestsType = z.infer<ReturnType<typeof LeaveRequestsSchema>>;

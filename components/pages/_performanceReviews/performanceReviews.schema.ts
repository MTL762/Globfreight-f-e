import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const PerformanceReviewsSchema = (t: TFunction) => {
  return z.object({
    user_id: z.coerce.number(),
    reviewer_id: z.coerce.number(),
    review_period: StringReq(t, 2),
    rating: z.coerce.number().optional().nullable(),
    feedback: StringNotReq(),
    goals: StringNotReq(),
    
  });
};

export type PerformanceReviewsType = z.infer<ReturnType<typeof PerformanceReviewsSchema>>;

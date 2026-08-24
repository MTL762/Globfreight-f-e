import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const AnnouncementsSchema = (t: TFunction) => {
  return z.object({
    title: StringReq(t, 2),
    priority: StringNotReq(),
    is_published: z.any().optional(),
    published_at: StringNotReq(),
    expires_at: StringNotReq(),
    content: StringReq(t, 2),
    
  });
};

export type AnnouncementsType = z.infer<ReturnType<typeof AnnouncementsSchema>>;

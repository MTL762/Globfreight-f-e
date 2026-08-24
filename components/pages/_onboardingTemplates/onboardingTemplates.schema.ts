import { z } from "zod";
import { StringReq, StringNotReq, EmailReq, noSchema } from "@/validations/String.schema";

export const OnboardingTemplatesSchema = (t: TFunction) => {
  return z.object({
    name: StringReq(t, 2),
    department_id: z.coerce.number().optional().nullable(),
    description: StringNotReq(),
    
  });
};

export type OnboardingTemplatesType = z.infer<ReturnType<typeof OnboardingTemplatesSchema>>;

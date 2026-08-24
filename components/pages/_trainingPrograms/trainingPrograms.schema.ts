import { z } from "zod";
import { StringReq, StringNotReq } from "@/validations/String.schema";

export const TrainingProgramsSchema = (t: TFunction) => {
  return z.object({
    title: StringReq(t, 2),
    trainer: StringNotReq(),
    start_date: StringReq(t, 4),
    end_date: StringReq(t, 4),
    location: StringNotReq(),
    capacity: z.coerce.number().optional().nullable(),
    description: StringNotReq(),
    
  });
};

export type TrainingProgramsType = z.infer<ReturnType<typeof TrainingProgramsSchema>>;

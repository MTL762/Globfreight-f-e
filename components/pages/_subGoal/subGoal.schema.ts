
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  import { PriceSchema } from "@/validations/Number.schema";
  
  
  export const SubGoalSchema = (t:TFunction) => {
    return z.object({
    sgid:PriceSchema(t,0),
goId:PriceSchema(t,0),
subGoal1:StringReq(t),
subGoalAr:StringReq(t)
})
  };

  export type SubGoalType = z.infer<
	ReturnType<typeof SubGoalSchema>
  >;
  
  
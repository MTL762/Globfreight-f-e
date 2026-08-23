
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  import { PriceSchema } from "@/validations/Number.schema";
  
  
  export const GovernorateSchema = (t:TFunction) => {
    return z.object({
    goId:PriceSchema(t,0),
goal1:StringReq(t),
goalAr:StringReq(t),
gid:PriceSchema(t,0),
governorate1:StringReq(t),
governorateAr:StringReq(t)
})
  };

  export type GovernorateType = z.infer<
	ReturnType<typeof GovernorateSchema>
  >;
  
  
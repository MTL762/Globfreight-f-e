
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  import { PriceSchema } from "@/validations/Number.schema";
  
  
  export const GenderSchema = (t:TFunction) => {
    return z.object({
    geId:PriceSchema(t,0),
geName:StringReq(t),
geNameAr:StringReq(t)
})
  };

  export type GenderType = z.infer<
	ReturnType<typeof GenderSchema>
  >;
  
  
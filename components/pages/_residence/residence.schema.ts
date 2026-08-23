
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  import { PriceSchema } from "@/validations/Number.schema";
  
  
  export const ResidenceSchema = (t:TFunction) => {
    return z.object({
    resName:StringReq(t),
rid:PriceSchema(t,0),
resNameAr:StringReq(t)
})
  };

  export type ResidenceType = z.infer<
	ReturnType<typeof ResidenceSchema>
  >;
  
  
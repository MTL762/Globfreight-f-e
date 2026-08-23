
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  import { PriceSchema } from "@/validations/Number.schema";
  
  
  export const PublicationsTypeArSchema = (t:TFunction) => {
    return z.object({
    id:PriceSchema(t,0),
pubType:StringReq(t),
pubTypeAr:StringReq(t)
})
  };

  export type PublicationsTypeArType = z.infer<
	ReturnType<typeof PublicationsTypeArSchema>
  >;
  
  
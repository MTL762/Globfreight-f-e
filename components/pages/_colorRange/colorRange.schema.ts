
  import { z } from "zod";
  
  
  
  import {StringNotReq } from "@/validations/String.schema";
  import { PriceSchema } from "@/validations/Number.schema";
  
  import { noSchema } from "@/validations/String.schema"
  export const ColorRangeSchema = (t:TFunction) => {
    return z.object({
    id:StringNotReq(),
from:PriceSchema(t,0),
to:PriceSchema(t,0),
color:noSchema()
})
  };

  export type ColorRangeType = z.infer<
	ReturnType<typeof ColorRangeSchema>
  >;
  
  
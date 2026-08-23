
  import { z } from "zod";
  
  
  
  import {StringNotReq } from "@/validations/String.schema";
  
  
  
  export const PillarSchema = (t:TFunction) => {
    return z.object({
    pid,
pillar1:StringNotReq(),
color:StringNotReq(),
gradientColor:StringNotReq(),
icon:StringNotReq(),
pillarAr:StringNotReq()
})
  };

  export type PillarType = z.infer<
	ReturnType<typeof PillarSchema>
  >;
  
  
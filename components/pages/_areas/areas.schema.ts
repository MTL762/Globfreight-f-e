
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  import {StringNotReq } from "@/validations/String.schema";
  
  
  
  export const AreasSchema = (t:TFunction) => {
    return z.object({
    aid:StringNotReq(),
areaName:StringReq(t),
areaNameAr:StringReq(t)
})
  };

  export type AreasType = z.infer<
	ReturnType<typeof AreasSchema>
  >;
  
  
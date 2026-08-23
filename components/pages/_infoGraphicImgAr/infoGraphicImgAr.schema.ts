
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  
  
  import { noSchema } from "@/validations/String.schema"
  export const InfoGraphicImgArSchema = (t:TFunction) => {
    return z.object({
    id,
imgName:StringReq(t),
infoCode:StringReq(t),
imgNameAr:noSchema()
})
  };

  export type InfoGraphicImgArType = z.infer<
	ReturnType<typeof InfoGraphicImgArSchema>
  >;
  
  
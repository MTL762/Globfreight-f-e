
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  import { PriceSchema } from "@/validations/Number.schema";
  
  import { noSchema } from "@/validations/String.schema"
  export const InfoGraphicArSchema = (t:TFunction) => {
    return z.object({
    id:PriceSchema(t,0),
infoTitle:StringReq(t),
infoDesc:noSchema(),
infoDate:noSchema(),
infoImg:noSchema(),
infoProCode,
infoOwner:StringReq(t),
infoTitleAr:StringReq(t),
infoImgAr:noSchema(),
infoOwnerAr:StringReq(t)
})
  };

  export type InfoGraphicArType = z.infer<
	ReturnType<typeof InfoGraphicArSchema>
  >;
  
  
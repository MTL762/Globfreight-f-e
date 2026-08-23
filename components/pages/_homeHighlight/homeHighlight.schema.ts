
  import { z } from "zod";
  import {SelectReq } from "@/validations/Select.schema";
  
  import { StringReq } from "@/validations/String.schema";
  
  import { PriceSchema } from "@/validations/Number.schema";
  
  import { noSchema } from "@/validations/String.schema"
  export const HomeHighlightSchema = (t:TFunction) => {
    return z.object({
    id:PriceSchema(t,0),
indId:SelectReq(t),
title:StringReq(t),
category:StringReq(t),
value:StringReq(t),
valueLabel:StringReq(t),
description:noSchema(),
photo:noSchema(),
chartType:noSchema(),
chartData:StringReq(t),
highlight:PriceSchema(t,0),
titleAr:StringReq(t),
categoryAr:StringReq(t),
descriptionAr:noSchema(),
chartDataAr:noSchema()
})
  };

  export type HomeHighlightType = z.infer<
	ReturnType<typeof HomeHighlightSchema>
  >;
  
  
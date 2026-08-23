
  import { z } from "zod";
  import {SelectReq } from "@/validations/Select.schema";
  
  import { StringReq } from "@/validations/String.schema";
  import {StringNotReq } from "@/validations/String.schema";
  import { PriceSchema } from "@/validations/Number.schema";
  
  
  export const IndicatorSchema = (t:TFunction) => {
    return z.object({
    indicatorId:PriceSchema(t,0),
indicatorName:StringReq(t),
indicatorDef:StringReq(t),
scientificMeaning:StringReq(t),
calculationWay:StringReq(t),
dataSources:StringReq(t),
indicatorImp:StringReq(t),
indicatorPolicy:StringReq(t),
applicationLevel:StringReq(t),
improvementWays:StringReq(t),
sgid:SelectReq(t),
pid:StringReq(t),
oid:StringNotReq(),
subTypeId:StringNotReq(),
unit:StringNotReq(),
topInd:StringNotReq(),
indicatorNameAr:StringReq(t),
indicatorDefAr:StringReq(t),
calculationWayAr:StringReq(t),
dataSourcesAr:StringReq(t),
indicatorImpAr:StringReq(t)
})
  };

  export type IndicatorType = z.infer<
	ReturnType<typeof IndicatorSchema>
  >;
  
  
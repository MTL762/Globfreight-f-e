
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  import {StringNotReq } from "@/validations/String.schema";
  
  
  import { noSchema } from "@/validations/String.schema"
  export const PartnersArSchema = (t:TFunction) => {
    return z.object({
    id,
date:noSchema(),
title:StringReq(t),
num:StringReq(t),
description:StringNotReq(),
source:StringNotReq(),
image:noSchema(),
highlight,
titleAr:StringNotReq(),
descriptionAr:StringNotReq(),
numAr:StringNotReq(),
sourceAr:StringNotReq(),
imageAr:StringNotReq(),
id,
title:StringReq(t),
pic:StringReq(t),
link:StringReq(t),
titleAr:StringReq(t)
})
  };

  export type PartnersArType = z.infer<
	ReturnType<typeof PartnersArSchema>
  >;
  
  
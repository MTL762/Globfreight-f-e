
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  
  import { selectNotReq } from "@/validations/Select.schema";
  import { noSchema } from "@/validations/String.schema"
  export const FaqSchema = (t:TFunction) => {
    return z.object({
    category_id:selectNotReq(),
questionAr:StringReq(t), questionEn:StringReq(t),
answer:noSchema(),
is_active:noSchema(),
order
})
  };

  export type FaqType = z.infer<
	ReturnType<typeof FaqSchema>
  >;
  
  
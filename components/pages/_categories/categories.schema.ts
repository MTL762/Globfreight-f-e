
  import { z } from "zod";
  
  
  import { StringReq } from "@/validations/String.schema";
  
  
  
  import { noSchema } from "@/validations/String.schema"
  export const CategoriesSchema = (t:TFunction) => {
    return z.object({
    nameAr:StringReq(t), nameEn:StringReq(t),
descriptionAr:StringReq(t), descriptionEn:StringReq(t),
order,
image:noSchema()
})
  };

  export type CategoriesType = z.infer<
	ReturnType<typeof CategoriesSchema>
  >;
  
  
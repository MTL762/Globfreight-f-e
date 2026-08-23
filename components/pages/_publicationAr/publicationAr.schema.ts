
  import { z } from "zod";
  
  
  
  import {StringNotReq } from "@/validations/String.schema";
  
  
  import { noSchema } from "@/validations/String.schema"
  export const PublicationArSchema = (t:TFunction) => {
    return z.object({
    id:StringNotReq(),
pubName:StringNotReq(),
pubContent:StringNotReq(),
pubWriter:StringNotReq(),
pubPhoto:noSchema(),
pubThum:StringNotReq(),
pubDate:noSchema(),
pubYear:noSchema(),
pubFile:noSchema(),
pubPublisher:StringNotReq(),
pubType:noSchema()
})
  };

  export type PublicationArType = z.infer<
	ReturnType<typeof PublicationArSchema>
  >;
  
  
"use server";
import { endpointType } from "@/utils/endpoints";
import { fetchHelper } from "../fetch";

export async function fetchData(
  endPoint: endpointType,
  params?: UrlSearchParamsInterface
): Promise<ApiResponse<any>> {
  "use server";
  const data = await fetchHelper({
    endPoint,
    method: "GET",
    params
  });

 
  return data;
}

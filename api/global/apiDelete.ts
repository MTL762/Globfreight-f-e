"use server";
import { endpointType } from "@/utils/endpoints";
import { revalidatePath } from "next/cache";
import { fetchHelper } from "../fetch";

export async function APIDelete(
  endPoint: endpointType,
  pathname: string,
  id: string
): Promise<ApiResponse<any>> {
  "use server";
  const data = await fetchHelper({
    endPoint: [...endPoint, Number(id)],
    method: "DELETE"
  });

  revalidatePath(pathname);
  revalidatePath(`${endPoint}/${id}`);
  revalidatePath(`${endPoint}/${id}/edit`);
  return data;
}

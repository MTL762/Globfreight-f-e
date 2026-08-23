"use server";
import { endpointType } from "@/utils/endpoints";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchHelper } from "../fetch";

export async function APIChangeStatus(
  endPoint: endpointType,
  pathname: string,
  id?: string,
  body?: unknown
) {
  "use server";
  const data = await fetchHelper({
    endPoint: [...endPoint, ...(id ? [Number(id)] : [])],
    method: "PATCH",
    body
  }); 
  console.log(data,'ads2edw')
  if (data?.code === 401) {
    redirect("/remove-cookies");
  }
  revalidatePath(pathname);
  revalidatePath(`${endPoint}/${id}`);
  revalidatePath(`${endPoint}/${id}/edit`);
  return data;
}

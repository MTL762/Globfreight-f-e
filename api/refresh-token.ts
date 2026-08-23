"use server";

import { REFRESH_TOKEN, TOKEN } from "@/utils/config";
import { endpoints } from "@/utils/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.API_BASE_URL;
export async function newRefreshToken() {
  "use server";
  const url = `${baseUrl}${endpoints.refreshToken}`;
  const token = (await cookies()).get(REFRESH_TOKEN)?.value;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Locale: "en",
      isLocalized: "true"
    },
    cache: "no-cache"
  });
  if (res.status === 401) {
    redirect("/ar/removeToken");
  }
  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      ...{ result }
    };
  }
  if (result.data?.user.AccessToken) {
    (await cookies()).set(TOKEN, result.data?.user.AccessToken);
  }
  return {
    ...result,
    success: res.ok,
    status: res.status,
    accessToken: result.accessToken
  };
}

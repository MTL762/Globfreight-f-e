"use server";

import { TOKEN } from "@/utils/config";
import { endpointName, endpoints, endpointType } from '@/utils/endpoints';
import { extractSearchParams } from "@/utils/extractSearchParams";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { newRefreshToken } from "./refresh-token";

const baseUrl = process.env.API_BASE_URL;

export async function fetchHelper({
  endPoint,
  method = "GET",
  body,
  headers,
  params,
  cache,
  locale,
  isLocalized,
  refreshToken = true,
  tags,
  revalidate

}: {
  isLocalized?: boolean;
  headers?: HeadersInit;
  locale?: locales;
  endPoint: endpointType;
  tags?: endpointType;
  revalidate?: number;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  cache?: "no-cache" | "default" | "reload" | "force-cache" | "only-if-cached";
  params?: any;
  refreshToken?: boolean;
}): Promise<any> {
  "use server";

  const url = handleUrl(endPoint, params);


  const token = (await cookies()).get(TOKEN);
  const isFormData = body instanceof FormData;
  if (locale === undefined) {
    locale = ((await getLocale()) as locales) ?? "ar";
  }
  // console.log(url, ";das2", {
  //   Authorization: `Bearer ${token?.value}`,
  //   TOKEN
  // });
  const headers2 = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token?.value ? { Authorization: `Bearer ${token?.value}` } : {}),
    Accept: "application/json",
    // Locale: locale ?? "ar",
    // isLocalized: isLocalized ? isLocalized.toString() : "false",
    ...(headers ?? {})
  };
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: headers2,
      next: {
        revalidate: revalidate,
        tags: tags ? [tags.join("")] : []
      },
      cache: cache ?? "no-cache",
      ...(method !== "GET" ? { body: isFormData ? (body as any) : JSON.stringify(body) } : {})
    });
    console.log(res, 'dsae2ds')
  } catch (error) {
    console.warn("Backend offline or connection error:", error);
    return {
      success: false,
      data: [],
      total: 0,
      message: "Backend server is offline or unreachable."
    };
  }
  console.log(res, 'das2edsa');
  // if (res.status === 503 || res.status === 502) {
  //   const header = nextHeader();
  //   if (header.get("header-URL") !== `/${locale}/updating-system`) {
  //     redirect(`/ar/updating-system`);
  //   } else {
  //     return { success: false, message: "System is updating" };
  //   }
  // }
  // console.log(headers2);
  // console.log("->2", url, res.status);
  if (res.status === 401 && refreshToken == true) {
    await newRefreshToken();
    return await fetchHelper({
      endPoint,
      method,
      body,
      headers,
      params,
      cache,
      locale,
      isLocalized,
      refreshToken: false
    });
  } else if (res.status === 401 && refreshToken == false) {
    // await removeToken();
    redirect("/ar/removeToken");
  }
  let result: any = null;
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      result = await res.json();
    } catch (e) {
      console.error("Error parsing JSON response", e);
      result = { message: "Error parsing JSON response" };
    }
  } else {
    // Handle non-JSON response (could be HTML error page)
    result = { message: res.statusText || "Something went wrong" };
  }

  if (!res.ok) {
    return {
      success: false,
      result
    } as any;
  }

  return {
    ...result,
    success: res.ok,
    status: res.status
  };
}
function handleUrl(endPoint: endpointType, params: UrlSearchParamsInterface | any) {
  let queryString = "";
  if (params !== undefined) {
    queryString = extractSearchParams(params);
  }
  const url = `${baseUrl}${endPoint
    ?.map((item: endpointName | number | string) => {
      if (typeof item === "number" || Boolean(Number(item))) {
        return `/${item}`;
      } else {
        return endpoints[item as endpointName];
      }
    })
    ?.join("")}${queryString.length > 1
      ? queryString.startsWith("?")
        ? queryString
        : `?${queryString.toString()}`
      : ""
    }`;
  return url;
}

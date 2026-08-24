"use server";

import { TOKEN } from "@/utils/config";
import { endpointName, endpoints, endpointType } from '@/utils/endpoints';
import { extractSearchParams } from "@/utils/extractSearchParams";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

const baseUrl = process.env.API_BASE_URL || process.env.baseUrl || "https://api.globfreight.com";

export async function fetchHelper({
  endPoint,
  method = "GET",
  body,
  headers,
  params,
  cache,
  locale,
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
}): Promise<any> {
  "use server";

  const url = handleUrl(endPoint, params);
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN);
  const isFormData = body instanceof FormData;

  if (locale === undefined) {
    locale = ((await getLocale()) as locales) ?? "ar";
  }

  const requestHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token?.value ? { Authorization: `Bearer ${token.value}` } : {}),
    Accept: "application/json",
    ...(headers ?? {})
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: requestHeaders,
      next: {
        revalidate,
        tags: tags ? [tags.join("")] : []
      },
      cache: cache ?? "no-cache",
      ...(method !== "GET" ? { body: isFormData ? (body as any) : JSON.stringify(body) } : {})
    });
  } catch (error) {
    console.error("Backend offline or connection error:", error);
    return {
      success: false,
      data: [],
      total: 0,
      message: "Backend server is offline or unreachable."
    };
  }

  // Handle 401 Unauthorized
  if (res.status === 401) {
    return {
      success: false,
      data: [],
      total: 0,
      status: 401,
      message: "Unauthenticated"
    };
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
    result = { message: res.statusText || "Something went wrong" };
  }

  if (!res.ok) {
    return {
      success: false,
      data: [],
      total: 0,
      result,
      status: res.status
    };
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

  const cleanBaseUrl = (baseUrl || "https://api.globfreight.com").replace(/\/+$/, "");

  const path = (endPoint || [])
    .map((item: endpointName | number | string) => {
      if (typeof item === "number" || Boolean(Number(item))) {
        return `/${item}`;
      } else {
        const ep = (endpoints as Record<string, string>)[item as string] || item;
        return typeof ep === "string" ? (ep.startsWith("/") ? ep : `/${ep}`) : "";
      }
    })
    .join("");

  const query = queryString.length > 0
    ? (queryString.startsWith("?") ? queryString : `?${queryString}`)
    : "";

  return `${cleanBaseUrl}${path.startsWith("/") ? path : `/${path}`}${query}`;
}

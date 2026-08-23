import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { determineAuthRedirect } from "./middleware/auth-redirect";

const handler = createMiddleware(routing);

// const CACHE_TTL_MS = 60_000;
// const permissionCache = new Map<string, { expiresAt: number; value: Permission }>();

// type PermissionApiItem = {
//   id: number;
//   name: string;
//   method: ("get" | "post" | "put" | "patch" | "delete")[];
// };

// function normalizePermissions(items: PermissionApiItem[]): Permission {
//   return items.reduce((acc, curr) => {
//     acc[curr.name] = {
//       get: false,
//       post: false,
//       put: false,
//       patch: false,
//       delete: false
//     };

//     curr.method.forEach(method => {
//       acc[curr.name][method] = true;
//     });

//     return acc;
//   }, {} as Permission);
// }

// async function getCachedPermissions(request: NextRequest): Promise<Permission | null> {
//   const token = request.cookies.get(TOKEN)?.value;
//   if (!token) return null;

//   const cached = permissionCache.get(token);
//   if (cached && cached.expiresAt > Date.now()) {
//     return cached.value;
//   }

//   const baseUrl = process.env.API_BASE_URL;
//   if (!baseUrl) return null;

//   try {
//     // const response = await fetch(`${baseUrl}${endpoints.myPermissions}`, {
//     //   method: "GET",
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //     Locale: "en",
//     //     isLocalized: "true"
//     //   },
//     //   cache: "no-store"
//     // });

//     // if (!response.ok) return null;

//     // const data = (await response.json()) as ApiResponse<PermissionApiItem[]>;
//     // const permissions = normalizePermissions(data?.data ?? []);

//     // permissionCache.set(token, {
//     //   value: permissions,
//     //   expiresAt: Date.now() + CACHE_TTL_MS
//     // });

//     // return permissions;
//   } catch {
//     return null;
//   }
// }

// function isRouteAllowed(request: NextRequest, permissions: Permission): boolean {
//   const pathname = request.nextUrl.pathname;
//   const segments = pathname.split("/").filter(Boolean);
//   const routeSegment = segments[1];

//   if (!routeSegment || routeSegment === "dashboard") return true;

//   const permissionKey = resolvePermissionKeyFromPath(pathname);
//   if (!permissionKey) return true;

//   const routePermissions = permissions?.[permissionKey];
//   if (!routePermissions) return false;

//   const isCreateRoute = segments.includes("create");
//   const isEditRoute = segments.includes("edit");

//   if (isCreateRoute) return routePermissions.post;
//   if (isEditRoute) return routePermissions.put || routePermissions.patch;
//   return routePermissions.get;
// }

export default async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const params = request.nextUrl.searchParams;
  const searchParamsString = params.toString();
  const urlWithParams = `${currentPath}${searchParamsString ? `?${searchParamsString}` : ""}`;

  // Get the response from the handler
  const response = handler(request);

  response.headers.set("header-URL", urlWithParams);
  // const { shouldRedirect, redirectUrl } = determineAuthRedirect(request);
  // if (shouldRedirect) {
  //   return NextResponse.redirect(new URL(redirectUrl, request.url));
  // }

  // const permissions = await getCachedPermissions(request);
  // if (permissions && !isRouteAllowed(request, permissions)) {
  //   const locale = request.nextUrl.pathname.split("/").filter(Boolean)[0] || "en";
  //   return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  // }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"]
};

export function getRequestConfig({ locale }) {
  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    messages: require(`./messages/${locale}.json`)
  };
}

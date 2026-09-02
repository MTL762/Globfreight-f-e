import { NextRequest } from "next/server";
import { TOKEN } from "../utils/config";

const AUTH_ROUTES = [
  "signin",
  "forget-password",
  "forgot-password",
  "reset-password",
  "change-password",
  "update-password",
  "removeToken"
];

const PROTECTED_ROUTES = [
  "dashboard",
  "faq",
  "blog",
  "categories",
  "sub-categories",
  "contact-us",
  "customers",
  "sent-emails",
  "visitors",
  "users",
  "roles",
  "settings",
  "profile",
  "hr",
  "CRUD-generator",
  "form-crud-generator",
  "formCardCLI",
  "formPage",
  "postman-form-generator"
];

export function determineAuthRedirect(request: NextRequest): {
  redirectUrl: string;
  shouldRedirect: boolean;
} {
  const token = request.cookies.get(TOKEN)?.value;
  const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);
  const supportedLocales = ["ar", "en"];

  let locale = "en";
  let routeSegment = "";

  if (pathSegments.length > 0 && supportedLocales.includes(pathSegments[0])) {
    locale = pathSegments[0];
    routeSegment = pathSegments[1] || "";
  } else {
    locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
    routeSegment = pathSegments[0] || "";
  }

  const isAuthRoute = AUTH_ROUTES.includes(routeSegment);
  const isProtectedRoute =
    PROTECTED_ROUTES.includes(routeSegment) ||
    PROTECTED_ROUTES.some((route) => routeSegment.startsWith(route));
  let shouldRedirect = false;
  let redirectUrl = "";

  // 1. Unauthenticated user trying to access protected routes -> redirect to /[locale]/signin
  if (!token) {
    if (isProtectedRoute) {
      redirectUrl = `/${locale}/signin`;
      shouldRedirect = true;
    }
  } else {
    // 2. Authenticated user trying to access auth pages (except removeToken) -> redirect to /[locale]/dashboard
    if (isAuthRoute && routeSegment !== "removeToken") {
      redirectUrl = `/${locale}/dashboard`;
      shouldRedirect = true;
    }
  }

  return {
    redirectUrl,
    shouldRedirect
  };
}

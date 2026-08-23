import { NextRequest } from "next/server";
import { TOKEN } from "../utils/config";
export function determineAuthRedirect(request: NextRequest): {
  redirectUrl: string;
  shouldRedirect: boolean;
} {
  // Try to get token from multiple sources
  const token = request.cookies.get(TOKEN)?.value;
  // Extract locale from URL path first, fallback to cookie, then default
  const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);
  const localeFromPath = pathSegments[0];
  const supportedLocales = ["ar", "en"];
  const locale = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : request?.cookies.get("NEXT_LOCALE")?.value || "en";
  let shouldRedirect = false;
  let redirectUrl = "";
  // Redirect unauthenticated users to signin page
  if (
    request.nextUrl.pathname === `/${locale}/forget-password` &&
    (token === undefined || token === null)
  ) {
    shouldRedirect = false;
  } else if (
    request.nextUrl.pathname === `/${locale}/student-sign-up` &&
    (token === undefined || token === null)
  ) {
    shouldRedirect = false;
  } else if (
    request.nextUrl.pathname !== `/${locale}/signin` &&
    (token === undefined || token === null)
  ) {
    redirectUrl = `/${locale}/signin`;
    shouldRedirect = true;
  }
  // Redirect authenticated users to dashboard
  else if (request.nextUrl.pathname === `/${locale}` && token !== undefined) {
    redirectUrl = `/${locale}/dashboard`;
    shouldRedirect = true;
  }
  return {
    redirectUrl,
    shouldRedirect
  };
}

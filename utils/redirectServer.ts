"use server";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const redirectServer = async (redirectLink?: string) => {
  if (redirectLink) {
    const locale = await getLocale();

    redirect(`/${locale}${redirectLink}`);
  } else {
    const referer = (await headers()).get("referer");
    const currentPath = referer ? new URL(referer).pathname : "/";
    const cleanedPath = cleanPath(currentPath);
    redirect(cleanedPath);
  }
};

function cleanPath(path: string): string {
  // Match "/create" or "/{id}/edit" at the end of the path
  const cleanedPath = path.replace(/\/(?:\d+\/edit|create)$/, "");
  return cleanedPath;
}

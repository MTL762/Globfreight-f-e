"use client";

import { useRouter } from "@/i18n/navigation";

export default function useRouterLang() {
  const router = useRouter();
  const routerLang = (pathname: string, routerFunction?: "push" | "replace") => {
    const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
    if (routerFunction == "replace") {
      router.replace(`${path}`);
    } else {
      router.push(`${path}`);
    }
  };

  return {
    routerLang
  };
}

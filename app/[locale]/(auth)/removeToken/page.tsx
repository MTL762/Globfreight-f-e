"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    // Delete the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to default /[locale] home after cookie deletion
    router.push("/");
  }, [router]);

  return <></>;
}

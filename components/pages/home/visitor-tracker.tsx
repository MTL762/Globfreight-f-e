"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api-client";

export function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname && pathname.startsWith("/admin")) return; // Don't track admin pages

    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const userAgent = navigator.userAgent || "";
    let device_type = "desktop";
    if (/Mobi|Android/i.test(userAgent)) device_type = "mobile";
    else if (/Tablet|iPad/i.test(userAgent)) device_type = "tablet";

    let browser = "Other";
    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Edge")) browser = "Edge";

    let platform = "Other";
    if (userAgent.includes("Win")) platform = "Windows";
    else if (userAgent.includes("Mac")) platform = "macOS";
    else if (userAgent.includes("Linux")) platform = "Linux";
    else if (userAgent.includes("Android")) platform = "Android";
    else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) platform = "iOS";

    api.trackVisitor({
      page_url: pathname || window.location.pathname,
      referer: document.referrer || undefined,
      device_type,
      platform,
      browser,
      country: "Belgium",
      city: "Antwerp"
    }).catch(() => {});
  }, [pathname]);

  return null;
}

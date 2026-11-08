"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import {
  SUPPORTED_LANGUAGE_ITEMS,
  toRelativePathname,
  useAlternateLinks
} from "@/components/alternate-links-context";
import { Globe2, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.globfreight.com"
).replace(/\/$/, "");

interface LanguageSwitcherProps {
  initialAlternateLinks?: Record<string, string> | null;
}

const LanguageSwitcher = ({ initialAlternateLinks }: LanguageSwitcherProps) => {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const { alternateLinks: contextAlternateLinks } = useAlternateLinks();

  const activeAlternateLinks = initialAlternateLinks ?? contextAlternateLinks;

  const activeLang =
    SUPPORTED_LANGUAGE_ITEMS.find((l) => l.code === currentLocale) ||
    SUPPORTED_LANGUAGE_ITEMS[0];

  const navigateToLocale = (targetPath: string, targetLocale: string) => {
    try {
      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}
    window.location.assign(targetPath);
  };

  const getTargetHref = (targetLocale: string): string => {
    if (activeAlternateLinks) {
      const direct = activeAlternateLinks[targetLocale];
      return direct ? toRelativePathname(direct) : `/${targetLocale}`;
    }

    const cleanPath = !pathname || pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
    return `/${targetLocale}${cleanPath}`;
  };

  const handleSelect = async (targetLocale: string) => {
    if (targetLocale === currentLocale) return;

    // 1. Direct resolved href from activeAlternateLinks
    if (activeAlternateLinks) {
      const direct = activeAlternateLinks[targetLocale];
      const target = direct ? toRelativePathname(direct) : `/${targetLocale}`;
      navigateToLocale(target, targetLocale);
      return;
    }

    // 2. Dynamic resolution fallback if on dynamic routes without activeAlternateLinks
    const blogMatch = pathname?.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) {
      const rawSlug = blogMatch[1];
      try {
        const cleanSlug = encodeURIComponent(decodeURIComponent(rawSlug));
        const res = await fetch(`${API_BASE}/blog-posts/slug/${cleanSlug}?locale=${targetLocale}`, {
          headers: { Accept: "application/json", Locale: targetLocale }
        });
        const json = await res.json().catch(() => null);
        const resolvedSlug =
          json?.data?.slug ||
          (typeof json?.data?.slug === "object" ? json.data.slug[targetLocale] : null) ||
          json?.data?.new_slug;

        if (res.ok && typeof resolvedSlug === "string" && resolvedSlug.trim()) {
          navigateToLocale(`/${targetLocale}/blog/${encodeURIComponent(resolvedSlug.trim())}`, targetLocale);
          return;
        }
      } catch {}
      navigateToLocale(`/${targetLocale}`, targetLocale);
      return;
    }

    const catMatch = pathname?.match(/^\/blog\/category\/([^/]+)$/);
    if (catMatch) {
      const rawSlug = catMatch[1];
      try {
        const cleanSlug = encodeURIComponent(decodeURIComponent(rawSlug));
        const res = await fetch(`${API_BASE}/categories/slug/${cleanSlug}?locale=${targetLocale}`, {
          headers: { Accept: "application/json", Locale: targetLocale }
        });
        const json = await res.json().catch(() => null);
        const resolvedSlug =
          json?.data?.slug ||
          (typeof json?.data?.slug === "object" ? json.data.slug[targetLocale] : null) ||
          json?.data?.new_slug;

        if (res.ok && typeof resolvedSlug === "string" && resolvedSlug.trim()) {
          navigateToLocale(`/${targetLocale}/blog/category/${encodeURIComponent(resolvedSlug.trim())}`, targetLocale);
          return;
        }
      } catch {}
      navigateToLocale(`/${targetLocale}`, targetLocale);
      return;
    }

    // 3. Normal static route navigation
    const cleanPath = !pathname || pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
    const search = typeof window !== "undefined" ? window.location.search : "";
    navigateToLocale(`/${targetLocale}${cleanPath}${search}`, targetLocale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-border/70 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Select language (current: ${activeLang.label})`}
        >
          <Globe2 size={14} className="text-primary shrink-0" aria-hidden="true" />
          <span className="uppercase font-bold tracking-wider sm:ml-0.5 text-[10px] px-1.5 py-0.5 rounded bg-muted text-foreground border border-border/60">
            {activeLang.short}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 p-1.5 z-50">
        {SUPPORTED_LANGUAGE_ITEMS.map((item) => {
          const isActive = item.code === currentLocale;
          const targetHref = getTargetHref(item.code);

          const content = (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span
                  className="w-5 uppercase font-bold text-[10px] text-muted-foreground"
                  aria-hidden="true"
                >
                  {item.short}
                </span>
                <span>{item.label}</span>
              </div>
              {isActive && (
                <Check size={14} className="text-primary shrink-0" aria-hidden="true" />
              )}
            </div>
          );

          const className = `flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors focus-visible:ring-1 focus-visible:ring-primary ${
            isActive
              ? "bg-primary/10 text-primary font-bold"
              : "text-foreground hover:bg-muted"
          }`;

          return (
            <DropdownMenuItem
              key={item.code}
              onSelect={(e) => {
                e.preventDefault();
                handleSelect(item.code);
              }}
              asChild
            >
              <a
                href={targetHref}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item.code);
                }}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${item.label} (${item.short})${
                  isActive ? " - selected" : ""
                }`}
                className={className}
              >
                {content}
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

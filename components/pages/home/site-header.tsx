import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { fetchHelper } from "@/api/fetch";
import { getBlogText } from "@/types/blog";
import { BrandMark } from "@/components/brand-mark";
import { Link } from "@/i18n/navigation";
import { HeaderLanguageMenu } from "./header-language-menu";
import { HeaderMobileMenu } from "./header-mobile-menu";
import ThemeSwitcher from "@/components/theme-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const locale = await getLocale();

  const categoriesRes = await fetchHelper({
    endPoint: ["categories"],
    method: "GET",
    locale: locale as any
  }).catch(() => ({ data: [] }));
  const categories: { label: string; href: string }[] = (
    Array.isArray(categoriesRes?.data) ? categoriesRes.data : []
  )
    .map((cat: any) => {
      const slug =
        typeof cat.slug === "object" ? getBlogText(cat.slug, locale) : cat.slug || String(cat.id);
      return {
        label: getBlogText(cat.name, locale),
        href: `/blog/category/${encodeURIComponent(slug)}`
      };
    })
    .filter((c: { label: string }) => c.label);

  const nav = [
    ["home", "/"],
    ["blog", "/blog"],
    ["ship", "/ship-with-us"]
  ] as const;

  const mobileNavItems = [
    ...nav.map(([key, href]) => ({ key, label: t(key), href })),
    ...categories.map((c) => ({ key: `cat-${c.href}`, label: c.label, href: c.href }))
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Globfreight home page"
          className="flex items-center gap-2 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <BrandMark ariaHidden />
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary navigation">
          {nav.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t(key)}
            </Link>
          ))}

          {categories.length > 0 && (
            <div className="relative group">
              <button
                type="button"
                aria-haspopup="true"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("categories")}
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all absolute start-0 top-full pt-2 z-50">
                <ul className="min-w-56 max-h-80 overflow-y-auto rounded-xl border border-border bg-background p-1.5 shadow-lg">
                  {categories.map((cat) => (
                    <li key={cat.href}>
                      <Link
                        href={cat.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <HeaderLanguageMenu />

          <ThemeSwitcher />

          <Link
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-xs hover:opacity-90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            href="/#contact"
          >
            <span>{t("contact")}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>

          <HeaderMobileMenu navItems={mobileNavItems} contactLabel={t("contact")} />
        </div>
      </div>
    </header>
  );
}

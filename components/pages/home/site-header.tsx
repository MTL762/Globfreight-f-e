import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { fetchHelper } from "@/api/fetch";
import { getBlogText } from "@/types/blog";
import { getServiceText } from "@/types/service";
import { BrandMark } from "@/components/brand-mark";
import { Link } from "@/i18n/navigation";
import { HeaderLanguageMenu } from "./header-language-menu";
import { HeaderMobileMenu, type MobileNavItem } from "./header-mobile-menu";
import { HeaderNavSubmenu, type HeaderNavItem } from "./header-nav-submenu";
import ThemeSwitcher from "@/components/theme-switcher";

async function fetchHeaderData(locale: string) {
  const [categoriesRes, servicesRes] = await Promise.all([
    fetchHelper({
      endPoint: ["categories"],
      method: "GET",
      locale: locale as any
    }).catch(() => ({ data: [] })),
    fetchHelper({
      endPoint: ["services"],
      method: "GET",
      params: { per_page: 20 },
      locale: locale as any
    }).catch(() => ({ data: [] }))
  ]);
  console.log(servicesRes, 'servicesRes')
  const categories: HeaderNavItem[] = (Array.isArray(categoriesRes?.data) ? categoriesRes.data : [])
    .map((cat: any) => {
      const slug =
        typeof cat.slug === "object" ? getBlogText(cat.slug, locale) : cat.slug || String(cat.id);
      return {
        label: getBlogText(cat.name, locale),
        href: `/blog/category/${encodeURIComponent(slug)}`
      };
    })
    .filter(c => c.label);

  const services: HeaderNavItem[] = (Array.isArray(servicesRes?.data) ? servicesRes.data : [])
    .map((svc: any) => {
      const slug = getServiceText(svc.slug, locale) || String(svc.id);
      return {
        label: getServiceText(svc.name, locale),
        href: `/services/${encodeURIComponent(slug)}`
      };
    })
    .filter(s => s.label);

  return { categories, services };
}

export async function SiteHeader({
  alternateLinks
}: {
  alternateLinks?: Record<string, string> | null;
} = {}) {
  const t = await getTranslations("Nav");
  const locale = await getLocale();
  const { categories, services } = await fetchHeaderData(locale);

  const mobileNavItems: MobileNavItem[] = [
    { key: "home", label: t("home"), href: "/" },
    {
      key: "services",
      label: t("services"),
      href: "/services",
      children: services
    },
    {
      key: "blog",
      label: t("blog"),
      href: "/blog",
      children: categories
    },
    { key: "ship", label: t("ship"), href: "/ship-with-us" }
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
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("home")}
          </Link>

          {services.length > 0 ? (
            <HeaderNavSubmenu
              label={t("services")}
              mainHref="/services"
              allLabel={t("allServices")}
              items={services}
            />
          ) : (
            <Link
              href="/services"
              className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("services")}
            </Link>
          )}

          <Link
            href="/blog"
            className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("blog")}
          </Link>

          {categories.length > 0 && <HeaderNavSubmenu label={t("categories")} items={categories} />}

          <Link
            href="/ship-with-us"
            className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("ship")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <HeaderLanguageMenu alternateLinks={alternateLinks} />
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

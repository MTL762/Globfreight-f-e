import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Link } from "@/i18n/navigation";
import { HeaderLanguageMenu } from "./header-language-menu";
import ThemeSwitcher from "@/components/theme-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  const nav = [
    ["home", "/"],
    ["services", "/#services"],
    ["about", "/#about"],
    ["blog", "/#blog"],
    ["faq", "/#faq"],
    ["ship", "/ship-with-us"]
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link href="/" aria-label="Globfreight home" className="flex items-center gap-2 shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary navigation">
          {nav.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">

          <HeaderLanguageMenu />

          <ThemeSwitcher />

          <Link
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-xs hover:opacity-90 active:scale-[0.98] transition-all"
            href="/#contact"
          >
            <span>{t("contact")}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}

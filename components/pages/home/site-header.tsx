import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Globe2, PhoneCall } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Link } from "@/i18n/navigation";

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const locale = await getLocale();
  const nextLocale = locale === "en" ? "nl" : locale === "nl" ? "ar" : "en";
  const nextLocaleLabel = locale === "en" ? "Nederlands" : locale === "nl" ? "العربية" : "English";

  const nav = [
    ["home", "/"],
    ["about", "/about"],
    ["services", "/services"],
    ["blog", "/blog"],
    ["faq", "/faq"]
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
          <a
            href="tel:+32496322467"
            className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Direct dispatch line"
          >
            <PhoneCall size={14} className="text-primary" />
            <span>+32 496 32 24 67</span>
          </a>

          <Link
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            href="/"
            locale={nextLocale}
            title={`Switch to ${nextLocaleLabel}`}
          >
            <Globe2 size={14} className="text-primary" />
            <span>{t("language")}</span>
          </Link>

          <Link
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-xs hover:opacity-90 active:scale-[0.98] transition-all"
            href="/contact"
          >
            <span>{t("contact")}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}

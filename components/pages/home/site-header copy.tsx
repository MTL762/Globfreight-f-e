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
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" aria-label="Globfreight home" className="site-header__logo-link">
          <BrandMark />
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {nav.map(([key, href]) => (
            <Link key={key} href={href} className="site-nav__link">
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="site-header__tools">
          <a
            href="tel:+32496322467"
            className="site-header__phone"
            aria-label="Direct dispatch line"
          >
            <PhoneCall size={14} />
            <span>+32 496 32 24 67</span>
          </a>

          <Link
            className="locale-link"
            href="/"
            locale={nextLocale}
            title={`Switch to ${nextLocaleLabel}`}
          >
            <Globe2 size={15} />
            <span>{t("language")}</span>
          </Link>

          <Link className="nav-contact" href="/contact">
            {t("contact")} <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}

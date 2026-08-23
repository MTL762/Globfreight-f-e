import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <BrandMark inverse />
          <p>{t("tagline")}</p>
          <div className="footer-badges">
            <span className="footer-badge">
              <ShieldCheck size={14} /> AEO-F Certified
            </span>
            <span className="footer-badge">
              <CheckCircle2 size={14} /> NCTS Direct EDI
            </span>
          </div>
        </div>

        <div>
          <p className="footer-label">{t("links")}</p>
          <div className="footer-links">
            <Link href="/about">About Globfreight <ArrowUpRight size={14} /></Link>
            <Link href="/services">All Services <ArrowUpRight size={14} /></Link>
            <Link href="/blog">Blog & Insights <ArrowUpRight size={14} /></Link>
            <Link href="/faq">FAQ Guidance <ArrowUpRight size={14} /></Link>
            <Link href="/contact">Request Quote <ArrowUpRight size={14} /></Link>
            <Link href="/admin">Staff Portal <ArrowUpRight size={14} /></Link>
          </div>
        </div>

        <div>
          <p className="footer-label">{t("services")}</p>
          <div className="footer-links">
            <Link href="/services">Import & Export Clearance <ArrowUpRight size={14} /></Link>
            <Link href="/services">NCTS T1 / T2 Transit <ArrowUpRight size={14} /></Link>
            <Link href="/services">Port & Inland Haulage <ArrowUpRight size={14} /></Link>
            <Link href="/services">Bonded Warehousing <ArrowUpRight size={14} /></Link>
          </div>
        </div>

        <address className="footer-contact">
          <p className="footer-label">{t("contact")}</p>
          <span>
            <MapPin size={16} />
            <span>{t("address")}</span>
          </span>
          <a href="tel:+32496322467">
            <Phone size={16} />
            <span>+32 496 32 24 67</span>
          </a>
          <a href="mailto:info@globfreight.com">
            <Mail size={16} />
            <span>info@globfreight.com</span>
          </a>
          <span className="footer-hours">
            <Clock size={16} />
            <span>Mon - Fri: 07:30 - 18:30 CET</span>
          </span>
        </address>
      </div>

      <div className="footer-bottom">
        <span>{t("copyright")}</span>
        <div className="footer-bottom__links">
          <span>Port of Antwerp • Port of Rotterdam • Zeebrugge • Hamburg</span>
        </div>
      </div>
    </footer>
  );
}

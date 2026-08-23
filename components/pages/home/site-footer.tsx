import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand column */}
        <div className="space-y-4">
          <BrandMark inverse />
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
            {t("tagline")}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              <ShieldCheck size={13} className="text-primary" /> AEO-F Certified
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              <CheckCircle2 size={13} className="text-emerald-400" /> NCTS Direct EDI
            </span>
          </div>
        </div>

        {/* Links column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
            {t("links")}
          </p>
          <div className="flex flex-col space-y-2.5 text-xs text-slate-400">
            <Link href="/about" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>About Globfreight</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>All Services</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>Blog & Insights</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/faq" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>FAQ Guidance</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>Request Quote</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/admin" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>Staff Portal</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Services column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
            {t("services")}
          </p>
          <div className="flex flex-col space-y-2.5 text-xs text-slate-400">
            <Link href="/services" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>Import & Export Clearance</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>NCTS T1 / T2 Transit</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>Port & Inland Haulage</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-between hover:text-white transition-colors group">
              <span>Bonded Warehousing</span>
              <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Contact column */}
        <address className="not-italic space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
            {t("contact")}
          </p>
          <div className="flex items-start gap-2.5 text-xs text-slate-400">
            <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
            <span>{t("address")}</span>
          </div>
          <div>
            <a href="tel:+32496322467" className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors">
              <Phone size={15} className="text-primary shrink-0" />
              <span>+32 496 32 24 67</span>
            </a>
          </div>
          <div>
            <a href="mailto:info@globfreight.com" className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors">
              <Mail size={15} className="text-primary shrink-0" />
              <span>info@globfreight.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-500 pt-1">
            <Clock size={15} className="text-slate-500 shrink-0" />
            <span>Mon - Fri: 07:30 - 18:30 CET</span>
          </div>
        </address>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <span>{t("copyright")}</span>
        <div>
          <span>Port of Antwerp • Port of Rotterdam • Zeebrugge • Hamburg</span>
        </div>
      </div>
    </footer>
  );
}

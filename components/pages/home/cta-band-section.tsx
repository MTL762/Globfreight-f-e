import { ArrowRight, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function CtaBandSection() {
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-slate-950 text-white">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {t("ctaTitle")}
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          {t("ctaSubtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-95 active:scale-[0.98] transition-all shadow-md group"
          >
            <span>{t("ctaButton")}</span>
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="tel:+32496322467"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-800 active:scale-[0.98] transition-all"
          >
            <Phone size={16} className="text-primary" />
            <span>{t("ctaCall")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

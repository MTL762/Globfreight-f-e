import { ArrowRight, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function CtaBandSection() {
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-primary via-primary/95 to-slate-950 text-primary-foreground">
      {/* Subtle Glows */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-black/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/20">
          DIRECT CONSULTATION
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {t("ctaTitle")}
        </h2>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
          {t("ctaSubtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-white/90 active:scale-[0.98] transition-all shadow-lg group"
          >
            <span>{t("ctaButton")}</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="tel:+32496322467"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-md border border-white/20 active:scale-[0.98] transition-all"
          >
            <Phone size={17} />
            <span>{t("ctaCall")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

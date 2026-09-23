import { Cpu, Globe2, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function AboutSection() {
  const t = await getTranslations("Home");

  const pillars = [
    {
      icon: Cpu,
      title: t("about.pill1"),
      desc: t("about.pill1Desc"),
      accent: "text-primary bg-primary/10"
    },
    {
      icon: Globe2,
      title: t("about.pill2"),
      desc: t("about.pill2Desc"),
      accent: "text-blue-600 dark:text-blue-400 bg-blue-500/10"
    },
    {
      icon: ShieldCheck,
      title: t("about.pill3"),
      desc: t("about.pill3Desc"),
      accent: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
    },
    {
      icon: Zap,
      title: t("about.pill4"),
      desc: t("about.pill4Desc"),
      accent: "text-amber-600 dark:text-amber-400 bg-amber-500/10"
    }
  ];

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-background border-b border-border/70 scroll-mt-20">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-[400px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-[300px] w-[400px] rounded-full bg-primary/5 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <span>{t("about.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {t("about.title")}
          </h2>
        </div>

        {/* Central Core Statement Card */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 lg:p-12 rounded-3xl bg-card border border-border/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
          <p className="text-base sm:text-lg md:text-xl text-foreground font-medium leading-relaxed sm:leading-loose text-center">
            {t("about.desc")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8 mt-8 border-t border-border/60">
            <Link
              href="/ship-with-us"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-xs group"
            >
              <span>{t("ctaButton")}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-muted/60 hover:bg-muted text-foreground font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>{t("ctaCall")}</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-card border border-border/70 shadow-xs hover:border-primary/40 transition-colors space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pill.accent}`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {pill.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {pill.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

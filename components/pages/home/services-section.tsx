import { Ship, Plane, Laptop, ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ServicesSection() {
  const t = await getTranslations("Home");

  const services = [
    {
      key: "ocean",
      icon: Ship,
      badge: t("servicesItems.ocean.badge"),
      title: t("servicesItems.ocean.title"),
      desc: t("servicesItems.ocean.desc"),
      feature1: t("servicesItems.ocean.feature1"),
      feature2: t("servicesItems.ocean.feature2"),
      feature3: t("servicesItems.ocean.feature3"),
      cta: t("servicesItems.ocean.cta"),
      href: "/quote?mode=ocean",
      gradient: "from-blue-500/10 via-primary/5 to-transparent",
      accentBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    },
    {
      key: "air",
      icon: Plane,
      badge: t("servicesItems.air.badge"),
      title: t("servicesItems.air.title"),
      desc: t("servicesItems.air.desc"),
      feature1: t("servicesItems.air.feature1"),
      feature2: t("servicesItems.air.feature2"),
      feature3: t("servicesItems.air.feature3"),
      cta: t("servicesItems.air.cta"),
      href: "/quote?mode=air",
      gradient: "from-sky-500/10 via-primary/5 to-transparent",
      accentBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
    },
    {
      key: "digital",
      icon: Laptop,
      badge: t("servicesItems.digital.badge"),
      title: t("servicesItems.digital.title"),
      desc: t("servicesItems.digital.desc"),
      feature1: t("servicesItems.digital.feature1"),
      feature2: t("servicesItems.digital.feature2"),
      feature3: t("servicesItems.digital.feature3"),
      cta: t("servicesItems.digital.cta"),
      href: "/ship-with-us",
      gradient: "from-primary/10 via-primary/5 to-transparent",
      accentBg: "bg-primary/10 text-primary border-primary/20"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-muted/20 border-b border-border/70 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <span>{t("servicesItems.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {t("servicesTitle")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("servicesSubtitle")}
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-xs">
                      <Icon size={24} />
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${item.accentBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <ul className="space-y-2.5 pt-2 border-t border-border/50">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item.feature1}</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item.feature2}</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item.feature3}</span>
                    </li>
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-border/40">
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-muted/60 hover:bg-primary hover:text-primary-foreground text-foreground text-xs sm:text-sm font-semibold transition-all duration-200 group/btn"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

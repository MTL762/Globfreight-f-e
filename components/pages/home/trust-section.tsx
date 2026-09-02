import { Clock, Globe2, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function TrustSection() {
  const t = await getTranslations("Home");

  const pillars = [
    {
      icon: ShieldCheck,
      title: t("proof1Title"),
      desc: t("proof1Body"),
      badge: "AEO-F Priority Clearance"
    },
    {
      icon: Clock,
      title: t("proof2Title"),
      desc: t("proof2Body"),
      badge: "Pre-Arrival EDI Filing"
    },
    {
      icon: Globe2,
      title: t("proof3Title"),
      desc: t("proof3Body"),
      badge: "Direct Specialist Desk"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-muted/20 border-b border-border/70 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {t("proofTitle")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("proofSubtitle")}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-muted text-foreground border border-border/60">
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import { Anchor, Layers, ShieldCheck, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function PipelineSection() {
  const t = await getTranslations("Home");

  const steps = [
    {
      num: "01",
      icon: Anchor,
      title: t("pipeline.step1Title"),
      desc: t("pipeline.step1Desc")
    },
    {
      num: "02",
      icon: ShieldCheck,
      title: t("pipeline.step2Title"),
      desc: t("pipeline.step2Desc")
    },
    {
      num: "03",
      icon: Layers,
      title: t("pipeline.step3Title"),
      desc: t("pipeline.step3Desc")
    },
    {
      num: "04",
      icon: Zap,
      title: t("pipeline.step4Title"),
      desc: t("pipeline.step4Desc")
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background border-b border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {t("pipeline.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("pipeline.subtitle")}
          </p>
        </div>

        {/* 4 Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-sm transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-105">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold text-muted-foreground/80 px-2 py-0.5 rounded bg-muted">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

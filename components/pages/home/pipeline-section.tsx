import { Anchor, Layers, ShieldCheck, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function PipelineSection() {
  const t = await getTranslations("Home");

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/60 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            END-TO-END METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("pipeline.title")}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("pipeline.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-3">
                STAGE 01
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Anchor size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pipeline.step1Title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("pipeline.step1Desc")}
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-3">
                STAGE 02
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pipeline.step2Title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("pipeline.step2Desc")}
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-3">
                STAGE 03
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pipeline.step3Title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("pipeline.step3Desc")}
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider text-muted-foreground uppercase mb-3">
                STAGE 04
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("pipeline.step4Title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("pipeline.step4Desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

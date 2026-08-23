import { Clock, Globe2, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function TrustSection() {
  const t = await getTranslations("Home");

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            OPERATIONAL ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("proofTitle")}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("proofSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="group p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("proof1Title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("proof1Body")}
              </p>
            </div>
            <span className="inline-flex items-center w-fit px-3 py-1 rounded-lg text-xs font-semibold bg-muted/60 text-foreground border border-border/60">
              Priority Customs Release
            </span>
          </div>

          <div className="group p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("proof2Title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("proof2Body")}
              </p>
            </div>
            <span className="inline-flex items-center w-fit px-3 py-1 rounded-lg text-xs font-semibold bg-muted/60 text-foreground border border-border/60">
              Pre-Arrival EDI Filing
            </span>
          </div>

          <div className="group p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("proof3Title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("proof3Body")}
              </p>
            </div>
            <span className="inline-flex items-center w-fit px-3 py-1 rounded-lg text-xs font-semibold bg-muted/60 text-foreground border border-border/60">
              Direct Specialist Desk
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

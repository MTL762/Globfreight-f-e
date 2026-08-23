import { getTranslations } from "next-intl/server";
import { EuropeanGatewayCorridor } from "./european-gateway-corridor";

export async function GatewaysSection() {
  const t = await getTranslations("Home");

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            STRATEGIC INFRASTRUCTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("portsTitle")}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("portsSubtitle")}
          </p>
        </div>

        <EuropeanGatewayCorridor />
      </div>
    </section>
  );
}

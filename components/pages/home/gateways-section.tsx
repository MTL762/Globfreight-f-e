import { getTranslations } from "next-intl/server";
import { EuropeanGatewayCorridor } from "./european-gateway-corridor";

export async function GatewaysSection() {
  const t = await getTranslations("Home");

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background border-b border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {t("portsTitle")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("portsSubtitle")}
          </p>
        </div>

        <EuropeanGatewayCorridor />
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import { InteractiveServicesTabs } from "./interactive-services-tabs";

export async function ServicesSection() {
  const t = await getTranslations("Home");

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            CORE CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("servicesTitle")}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("servicesSubtitle")}
          </p>
        </div>

        <InteractiveServicesTabs
          tabs={{
            customs: t("tabs.customs"),
            transport: t("tabs.transport"),
            warehouse: t("tabs.warehouse"),
            fiscal: t("tabs.fiscal")
          }}
          customsDetail={{
            title: t("customsDetail.title"),
            desc: t("customsDetail.desc"),
            point1: t("customsDetail.point1"),
            point2: t("customsDetail.point2"),
            point3: t("customsDetail.point3")
          }}
          transportDetail={{
            title: t("transportDetail.title"),
            desc: t("transportDetail.desc"),
            point1: t("transportDetail.point1"),
            point2: t("transportDetail.point2"),
            point3: t("transportDetail.point3")
          }}
          warehouseDetail={{
            title: t("warehouseDetail.title"),
            desc: t("warehouseDetail.desc"),
            point1: t("warehouseDetail.point1"),
            point2: t("warehouseDetail.point2"),
            point3: t("warehouseDetail.point3")
          }}
          fiscalDetail={{
            title: t("fiscalDetail.title"),
            desc: t("fiscalDetail.desc"),
            point1: t("fiscalDetail.point1"),
            point2: t("fiscalDetail.point2"),
            point3: t("fiscalDetail.point3")
          }}
        />
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import { InteractiveServicesTabs } from "./interactive-services-tabs";

export async function ServicesSection() {
  const t = await getTranslations("Home");

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/20 border-b border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {t("servicesTitle")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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

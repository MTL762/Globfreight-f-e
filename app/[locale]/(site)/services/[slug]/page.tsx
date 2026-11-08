import { notFound } from "next/navigation";
import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicServiceDetail } from "@/components/pages/services/public-service-detail";
import { DynamicSlugPageSeo } from "@/components/alternate-links-context";
import { Service, getServiceText } from "@/types/service";
import { resolveServicePage } from "@/utils/multilingual-slugs";
import { buildServiceMetadata, buildServiceSchemas } from "@/utils/service-seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.services" });

  try {
    const { service, alternates } = await resolveServicePage(slug, locale, false);
    if (!service) return { title: t("title") };
    return buildServiceMetadata(service, locale, alternates);
  } catch {
    return { title: t("title") };
  }
}

export default async function ServiceDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const [{ service, currentCanonicalSlug, alternates }, relatedRes] =
    await Promise.all([
      resolveServicePage(slug, locale, true),
      fetchHelper({
        endPoint: ["services"],
        params: { per_page: 6 },
        method: "GET",
        locale: locale as any
      }).catch(() => ({ data: [] }))
    ]);

  if (!service) {
    notFound();
  }

  const relatedServices: Service[] = (
    Array.isArray(relatedRes?.data) ? relatedRes.data : []
  )
    .filter((s: Service) => {
      const sSlug = typeof s.slug === "object" ? getServiceText(s.slug, locale) : s.slug;
      return s.id !== service.id && sSlug !== currentCanonicalSlug;
    })
    .slice(0, 4);

  return (
    <PublicShell alternateLinks={alternates.languages}>
      <DynamicSlugPageSeo
        links={alternates.languages}
        schemas={buildServiceSchemas(service, locale, alternates)}
      />
      <PublicServiceDetail
        service={service}
        relatedServices={relatedServices}
        locale={locale}
      />
    </PublicShell>
  );
}


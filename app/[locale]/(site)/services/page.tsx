import { StandardPage } from "@/components/pages/home/standard-page";
import { getPageAlternates } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.services" });
  return {
    title: t("title"),
    description: t("body"),
    alternates: getPageAlternates("/services", locale)
  };
}

export default async function ServicesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <StandardPage kind="services" />;
}


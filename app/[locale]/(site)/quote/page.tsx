import { ShipWithUsPage } from "@/components/pages/home/ship-with-us-page";
import { getPageAlternates } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ShipWithUs.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getPageAlternates("/quote", locale)
  };
}

export default async function QuoteRoute(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <ShipWithUsPage locale={locale} />;
}


import { ShipWithUsPage } from "@/components/pages/home/ship-with-us-page";
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
    description: t("description")
  };
}

export default async function ShipWithUsRoute(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <ShipWithUsPage locale={locale} />;
}

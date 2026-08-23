import { fetchHelper } from "@/api/fetch";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { SettingsItem } from "@/components/pages/_settings/settings.types";
import SettingsDomainNav from "@/components/pages/_settings/SettingsDomainNav";
import SettingsFormPage from "@/components/pages/_settings/settingsForm.page";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const DEFAULT_DOMAIN = "BUSINESS";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("settings");
  return {
    title: headerName + PROJECT_NAME,
    description: "Manage " + headerName + " items in the HR dashboard"
  };
}

async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const domain = ((await searchParams)?.domain as string) ?? DEFAULT_DOMAIN;
  const response = await fetchHelper({
    endPoint: ["settings"],
    method: "GET",
    params: { domain }
  });

  const settings = (response?.data ?? []) as SettingsItem[];

  return (
    <div className="flex flex-col gap-4">
      <CustomHeader />
      <div className="px-6">
        <SettingsDomainNav />
      </div>
      <div className="px-6 pb-8">
        <SettingsFormPage settings={settings} domain={domain} />
      </div>
    </div>
  );
}

export default page;

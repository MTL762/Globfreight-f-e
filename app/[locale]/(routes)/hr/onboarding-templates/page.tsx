import { fetchHelper } from "@/api/fetch";
import TableBasic from "@/components/common/table/TableBasic";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OnboardingTemplatesColumns from "./OnboardingTemplatesColumns";
import { PROJECT_NAME } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Onboarding-templates");
  return {
    title: headerName + PROJECT_NAME,
    description: "Manage " + headerName + " items in the HR dashboard"
  };
}

async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["hrOnboardingTemplates"],
    method: "GET",
    params: await searchParams
  });

  if (!data) return <div>Error...</div>;

  const filteredData = data?.data || [];

  return (
    <>
      <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={OnboardingTemplatesColumns}
        pagination={{
          total: data?.total
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["hrOnboardingTemplates"]
        }}
        cardHeader={t("Onboarding-templates")}
        filters={[]}
      />
    </>
  );
}

export default page;

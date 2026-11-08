import { fetchHelper } from "@/api/fetch";
import TableBasic from "@/components/common/table/TableBasic";
import { getTranslations } from "next-intl/server";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import ServicesColumns from "./ServicesColumns";
import { PROJECT_NAME } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Services");
  return {
    title: headerName + PROJECT_NAME,
    description: "Manage " + headerName + " items in the admin dashboard"
  };
}

async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["adminServices"],
    method: "GET",
    params: await searchParams
  });

  const filteredData = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={ServicesColumns}
        pagination={{
          total: data?.total ?? filteredData.length
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["adminServices"]
        }}
        cardHeader={t("Services")}
        filters={[{ name: "search", type: "text", width: 3 }]}
      />
    </>
  );
}

export default page;


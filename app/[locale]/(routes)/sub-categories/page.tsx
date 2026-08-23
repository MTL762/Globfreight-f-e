import { fetchHelper } from "@/api/fetch";
import TableBasic from "@/components/common/table/TableBasic";
import { getTranslations } from "next-intl/server";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import SubCategoriesColumns from "./SubCategoriesColumns";
import { PROJECT_NAME } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("SubCategories");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Manage ${headerName} in the dashboard`
  };
}

async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["adminSubCategories"],
    method: "GET",
    params: await searchParams
  });

  if (!data) return <div>Error loading data...</div>;

  const filteredData = data?.data || [];

  return (
    <>
      <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={SubCategoriesColumns}
        pagination={{
          total: data?.total
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["adminSubCategories"]
        }}
        cardHeader={t("SubCategories")}
        filters={[{ name: "name", type: "text", width: 3 }]}
      />
    </>
  );
}

export default page;

import { fetchHelper } from "@/api/fetch";
import TableBasic from "@/components/common/table/TableBasic";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContractColumns from "./ContractColumns";
// import GenerateStaticParams from '@/api/metadata';
import { PROJECT_NAME } from "@/utils/config";
// export const generateStaticParams = GenerateStaticParams;
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Contract");
  return {
    title: headerName + PROJECT_NAME,
    description: "Manage " + headerName + " items in the HR dashboard"
  };
}
async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["hrContracts"],
    method: "GET",
    params: await searchParams
  });
  if (!data) return <div>Error...</div>;

  const filteredData = data.data;
  return (
    <>
      <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={ContractColumns}
        pagination={{
          total: data?.total
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["hrContracts"]
          //onInfo: true,
        }}
        cardHeader={t("Contract")}
        filters={[{ name: "name", type: "text", width: 3 }]}
      />
    </>
  );
}

export default page;

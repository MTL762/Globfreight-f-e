
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import SectionsColumns from './SectionsColumns';
import SectionsTreeView from './SectionsTreeView';
// import GenerateStaticParams from '@/api/metadata';
import { PROJECT_NAME } from "@/utils/config";
// export const generateStaticParams = GenerateStaticParams;
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Sections");
  return {
    title: headerName + PROJECT_NAME,
    description: "Manage " + headerName + " items in the HR dashboard"
  };
}
async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["hrSections"],
    method: "GET",
    params: await searchParams,
  });

  if (!data) return <div>Error...</div>;

  const filteredData = data?.data ?? []
  console.log(filteredData, 'ads2edsa');
  return (
    <>
      <CustomHeader />
      <SectionsTreeView data={filteredData} />
      <TableBasic
        data={filteredData}
        columns={SectionsColumns}
        pagination={{
          total: data?.total,
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["hrSections"],
          //onInfo: true,
        }}
        cardHeader={t("Sections")}
        filters={[{ "name": "parent_id", "type": "selectPaginated", "width": 3 }]}
      />
    </>
  );
}

export default page;

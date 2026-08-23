
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import { getTranslations } from 'next-intl/server';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import LanguagesColumns from './LanguagesColumns';
// import GenerateStaticParams from '@/api/metadata';
import { PROJECT_NAME } from "@/utils/config";
// export const generateStaticParams = GenerateStaticParams;
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName= t("Languages");
  return {
     title:  headerName +PROJECT_NAME,
  description: "Manage " + headerName + " items in the HR System Dashboard"
  };
}
async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["hrLanguages"],
    method: "GET",
    params: await searchParams,
  });

  if (!data) return <div>Error...</div>;

  const filteredData = data?.data

  return (
    <>
    <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={LanguagesColumns}
        pagination={{
          total: data?.total,
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["hrLanguages"],
          //onInfo: true,
        }}
        cardHeader={t("Languages")}
        filters={[]}
      />
    </>
  );
}

export default page;

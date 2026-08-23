
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import SalariesColumns from './SalariesColumns';
// import GenerateStaticParams from '@/api/metadata';
import { PROJECT_NAME } from "@/utils/config";
// export const generateStaticParams = GenerateStaticParams;
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Salaries");
  return {
    title: headerName + PROJECT_NAME,
    description: "Manage " + headerName + " items in the HR dashboard"
  };
}
async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["hrSalaries"],
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
        columns={SalariesColumns}
        pagination={{
          total: data?.total,
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["hrSalaries"],
          //onInfo: true,
        }}
        cardHeader={t("Salaries")}
        filters={[]}
      />
    </>
  );
}

export default page;

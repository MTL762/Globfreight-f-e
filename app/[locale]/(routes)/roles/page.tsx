
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import { getTranslations } from 'next-intl/server';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import RolesColumns from './RolesColumns';
// import GenerateStaticParams from '@/api/metadata';
import { PROJECT_NAME } from "@/utils/config";
// export const generateStaticParams = GenerateStaticParams;
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Roles");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Manage ${headerName} items in the HR dashboard`
  };
}

export default async function Page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["roles"],
    method: "GET",
    params: await searchParams,
  });

  const filteredData = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="space-y-6">
      <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={RolesColumns}
        pagination={{
          total: data?.total || (Array.isArray(filteredData) ? filteredData.length : 0),
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["roles"],
        }}
        cardHeader={t("Roles")}
        filters={[{ name: "name", type: "text", width: 4 }]}
      />
    </div>
  );
}

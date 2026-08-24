
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import { getTranslations } from 'next-intl/server';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import CustomersColumns from './CustomersColumns';
// import GenerateStaticParams from '@/api/metadata';
import { PROJECT_NAME } from "@/utils/config";
// export const generateStaticParams = GenerateStaticParams;
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Customers");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Manage ${headerName} items in the HR dashboard`
  };
}

export default async function Page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["adminCustomers"],
    method: "GET",
    params: await searchParams,
  });

  const filteredData = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="space-y-6">
      <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={CustomersColumns}
        pagination={{
          total: data?.total || 0,
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["adminCustomers"],
        }}
        cardHeader={t("Customers")}
        filters={[{ name: "name", type: "text", width: 3 }]}
      />
    </div>
  );
}

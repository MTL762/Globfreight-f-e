
import { fetchHelper } from '@/api/fetch';
import { getTranslations } from 'next-intl/server';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import { CustomersTableWrapper } from "./components/CustomersTableWrapper";
import { PROJECT_NAME } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Customers");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Manage ${headerName} and client communications.`
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
      <CustomersTableWrapper
        data={filteredData}
        total={data?.total || 0}
        cardHeader={t("Customers")}
      />
    </div>
  );
}

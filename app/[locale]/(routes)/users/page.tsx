import { fetchHelper } from "@/api/fetch";
import TableBasic from "@/components/common/table/TableBasic";
import { getTranslations } from "next-intl/server";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import UsersColumns from "./UsersColumns";
import { PROJECT_NAME } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Users");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Manage ${headerName} and system accounts.`
  };
}

export default async function Page({
  searchParams
}: {
  searchParams: SearchParams;
}): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["adminUsers"],
    method: "GET",
    params: await searchParams
  });

  if (!data) return <div>Error loading users...</div>;

  const filteredData = data?.data || [];

  return (
    <div className="space-y-6">
      <CustomHeader />
      <TableBasic
        data={filteredData}
        columns={UsersColumns}
        pagination={{
          total: data?.total
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["adminUsers"]
        }}
        cardHeader={t("Users")}
        filters={[
          { name: "name", type: "text", width: 4 },
          { name: "email", type: "text", width: 4 }
        ]}
      />
    </div>
  );
}

import { fetchHelper } from "@/api/fetch";
import TableBasic from "@/components/common/table/TableBasic";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AttendancesColumns from "./AttendancesColumns";
import Link from "next/link";
import { Calculator } from "lucide-react";
// import GenerateStaticParams from '@/api/metadata';
import { PROJECT_NAME } from "@/utils/config";
// export const generateStaticParams = GenerateStaticParams;
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Attendances");
  return {
    title: headerName + PROJECT_NAME,
    description: "Manage " + headerName + " items in the HR System Dashboard"
  };
}
async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["hrAttendances"],
    method: "GET",
    params: await searchParams
  });

  if (!data) return <div>Error...</div>;

  const filteredData = data?.data;

  return (
    <>
      <CustomHeader />
      <div className="flex items-center justify-between px-6 pt-4">
        <h1 className="text-xl font-bold">{t("Attendances")}</h1>
        <Link
          href="/hr/attendances/calculator"
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl shadow hover:bg-primary/90 transition-all"
        >
          <Calculator className="w-4 h-4" /> Attendance Sheet Calculator
        </Link>
      </div>
      <TableBasic
        data={filteredData}
        columns={AttendancesColumns}
        hideCreateNew
        pagination={{
          total: data?.total
        }}
        tableActions={{
          // onEdit: true,
          onDelete: ["hrAttendances"]
          //onInfo: true,
        }}
        cardHeader={t("Attendances")}
        filters={[]}
      />
    </>
  );
}

export default page;

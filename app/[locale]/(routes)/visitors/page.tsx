import { fetchHelper } from "@/api/fetch";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import TableBasic from "@/components/common/table/TableBasic";
import VisitorsColumns from "./VisitorsColumns";
import { VisitorsAnalyticsCards } from "./components/VisitorsAnalyticsCards";
import { getTranslations } from "next-intl/server";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Visitors");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Track platform ${headerName}, telemetry and traffic analytics.`
  };
}

export default async function VisitorsPage({
  searchParams
}: {
  searchParams: SearchParams;
}): Promise<JSX.Element> {
  const t = await getTranslations();

  // Fetch visitor logs and analytics stats in parallel
  const [logsResponse, statsResponse] = await Promise.all([
    fetchHelper({
      endPoint: ["adminVisitors"],
      method: "GET",
      params: await searchParams
    }).catch(() => null),
    fetchHelper({
      endPoint: ["adminVisitorsStats"],
      method: "GET"
    }).catch(() => null)
  ]);

  const visitorLogs = logsResponse?.data || [];
  const analyticsStats = statsResponse?.data || {};

  return (
    <div className="space-y-8">
      <CustomHeader />

      {/* 1. Analytics & Visual Telemetry */}
      <VisitorsAnalyticsCards stats={analyticsStats} />

      {/* 2. Detailed Tracked Logs Table */}
      <TableBasic
        data={visitorLogs}
        columns={VisitorsColumns}
        pagination={{
          total: logsResponse?.total || visitorLogs.length
        }}
        tableActions={{
          onDelete: ["adminVisitors"]
        }}
        cardHeader={t("Visitors")}
        hideCreateNew={true}
        filters={[
          { name: "country", type: "text", width: 3 },
          { name: "city", type: "text", width: 3 },
          { name: "browser", type: "text", width: 3 }
        ]}
      />
    </div>
  );
}

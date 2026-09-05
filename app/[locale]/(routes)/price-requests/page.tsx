import { fetchHelper } from "@/api/fetch";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import { PriceRequestTableWrapper } from "./components/PriceRequestTableWrapper";
import { getTranslations } from "next-intl/server";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  let headerName = "Price Requests";
  try {
    const t = await getTranslations();
    headerName = t("PriceRequests") || "Price Requests";
  } catch {
    // Fallback if translations not yet loaded
  }

  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: "Manage freight quotations and price requests."
  };
}

export default async function PriceRequestsPage({
  searchParams
}: {
  searchParams: SearchParams;
}): Promise<JSX.Element> {
  const resolvedParams = await searchParams;

  const data = await fetchHelper({
    endPoint: ["adminPriceRequests"],
    method: "GET",
    params: resolvedParams,
    tags: ["adminPriceRequests"],
    cache: "no-cache"
  });

  const requestList = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta || {};
  const total = meta.total ?? data?.total ?? requestList.length;
  const currentPage = meta.current_page ?? (Number(resolvedParams?.page) || 1);
  const lastPage = meta.last_page ?? ((Math.ceil(total / (meta.per_page || 15))) || 1);
  const perPage = meta.per_page ?? 15;

  return (
    <div className="space-y-6">
      <CustomHeader />
      <PriceRequestTableWrapper
        data={requestList}
        total={total}
        currentPage={currentPage}
        lastPage={lastPage}
        perPage={perPage}
      />
    </div>
  );
}

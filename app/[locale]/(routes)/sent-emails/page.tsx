import { fetchHelper } from "@/api/fetch";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import { SentEmailsTableWrapper } from "./components/SentEmailsTableWrapper";
import { getTranslations } from "next-intl/server";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("SentEmails");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Manage ${headerName} and email dispatch history.`
  };
}

export default async function SentEmailsPage({
  searchParams
}: {
  searchParams: SearchParams;
}): Promise<JSX.Element> {
  const data = await fetchHelper({
    endPoint: ["adminSentEmails"],
    method: "GET",
    params: await searchParams
  });

  const emailList = data?.data || [];

  return (
    <div className="space-y-6">
      <CustomHeader />
      <SentEmailsTableWrapper
        data={emailList}
        total={data?.total}
      />
    </div>
  );
}

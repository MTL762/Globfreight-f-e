import { fetchHelper } from "@/api/fetch";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import { ContactUsTableWrapper } from "./components/ContactUsTableWrapper";
import { getTranslations } from "next-intl/server";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("ContactUs");
  return {
    title: `${headerName} | ${PROJECT_NAME}`,
    description: `Manage ${headerName} and customer inquiries.`
  };
}

export default async function ContactUsPage({
  searchParams
}: {
  searchParams: SearchParams;
}): Promise<JSX.Element> {
  const data = await fetchHelper({
    endPoint: ["adminContactUs"],
    method: "GET",
    params: await searchParams
  });

  const messageList = data?.data || [];

  return (
    <div className="space-y-6">
      <CustomHeader />
      <ContactUsTableWrapper
        data={messageList}
        total={data?.total}
      />
    </div>
  );
}

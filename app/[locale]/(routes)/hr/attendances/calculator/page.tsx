import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import AttendanceCalculatorView from "@/components/pages/_attendances/AttendanceCalculatorView";
import { PROJECT_NAME } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName = t("Attendances") + " Calculator";
  return {
    title: headerName + PROJECT_NAME,
    description: "Parse employee attendance sheets and calculate worked hours, late minutes, and export client-side files."
  };
}

export default async function AttendanceCalculatorPage(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <AttendanceCalculatorView />
    </>
  );
}

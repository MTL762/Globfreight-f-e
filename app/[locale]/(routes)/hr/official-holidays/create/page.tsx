import CustomHeader from "@/components/layouts/header/CustomHeader";
import OfficialHolidaysFormPage from "@/components/pages/_officialHolidays/officialHolidaysForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <OfficialHolidaysFormPage />
    </>
  );
}

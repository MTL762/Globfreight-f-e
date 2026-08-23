import CustomHeader from "@/components/layouts/header/CustomHeader";
import AnnouncementsFormPage from "@/components/pages/_announcements/announcementsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <AnnouncementsFormPage />
    </>
  );
}

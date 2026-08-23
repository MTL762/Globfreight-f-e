import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import AnnouncementsFormPage from "@/components/pages/_announcements/announcementsForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrAnnouncements", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <AnnouncementsFormPage data={data?.data} />
    </>
  );
};

export default page;

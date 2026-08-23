import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import OfficialHolidaysFormPage from "@/components/pages/_officialHolidays/officialHolidaysForm.page";

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrOfficialHolidays", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <OfficialHolidaysFormPage data={data?.data} />
    </>
  );
};

export default page;

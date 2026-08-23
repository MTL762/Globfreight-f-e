import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import ShiftsFormPage from "@/components/pages/_shifts/shiftsForm.page";

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrShifts", Number((await params).id)],
    method: "GET"
  });

  return (
    <>
      <CustomHeader />
      <ShiftsFormPage data={data} />
    </>
  );
};

export default page;

import { fetchHelper } from "@/api/fetch";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import LeaveTypesFormPage from "@/components/pages/_leaveTypes/leaveTypesForm.page";

const page = async ({ params }: { params: Params }) => {
  const data: any = await fetchHelper({
    endPoint: ["hrLeaveTypes", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <LeaveTypesFormPage data={data?.data} />
    </>
  );
};

export default page;

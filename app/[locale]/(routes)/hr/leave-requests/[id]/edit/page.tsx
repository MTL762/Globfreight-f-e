import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import LeaveRequestsFormPage from "@/components/pages/_leaveRequests/leaveRequestsForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrLeaveRequests", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <LeaveRequestsFormPage data={data?.data} />
    </>
  );
};

export default page;

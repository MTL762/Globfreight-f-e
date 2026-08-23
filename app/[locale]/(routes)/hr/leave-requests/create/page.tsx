import CustomHeader from "@/components/layouts/header/CustomHeader";
import LeaveRequestsFormPage from "@/components/pages/_leaveRequests/leaveRequestsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <LeaveRequestsFormPage />
    </>
  );
}

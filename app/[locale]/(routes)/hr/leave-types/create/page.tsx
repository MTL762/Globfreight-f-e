import CustomHeader from "@/components/layouts/header/CustomHeader";
import LeaveTypesFormPage from "@/components/pages/_leaveTypes/leaveTypesForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <LeaveTypesFormPage />
    </>
  );
}

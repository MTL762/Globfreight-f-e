import CustomHeader from "@/components/layouts/header/CustomHeader";
import EmployeeDocumentsFormPage from "@/components/pages/_employeeDocuments/employeeDocumentsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <EmployeeDocumentsFormPage />
    </>
  );
}

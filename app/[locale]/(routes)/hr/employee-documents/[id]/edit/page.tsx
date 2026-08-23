import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import EmployeeDocumentsFormPage from "@/components/pages/_employeeDocuments/employeeDocumentsForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrEmployeeDocuments", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <EmployeeDocumentsFormPage data={data?.data} />
    </>
  );
};

export default page;

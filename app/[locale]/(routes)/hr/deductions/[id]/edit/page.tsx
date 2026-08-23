import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import DeductionsFormPage from "@/components/pages/_deductions/deductionsForm.page";

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrDeductions", Number((await params).id)],
    method: "GET"
  });

  return (
    <>
      <CustomHeader />
      <DeductionsFormPage data={data?.data} />
    </>
  );
};

export default page;

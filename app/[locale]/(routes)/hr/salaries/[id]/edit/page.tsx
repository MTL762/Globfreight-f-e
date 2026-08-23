import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import SalariesFormPage from "@/components/pages/_salaries/salariesForm.page";

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrSalaries", Number((await params).id)],
    method: "GET"
  });
  console.log(data, "data");
  return (
    <>
      <CustomHeader />
      <SalariesFormPage data={data?.data} />
    </>
  );
};

export default page;

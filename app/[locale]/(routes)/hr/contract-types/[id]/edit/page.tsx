import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import ContractTypesFormPage from "@/components/pages/_contractTypes/contractTypesForm.page";

const page = async ({ params }: { params: Params }) => {
  const data: any = await fetchHelper({
    endPoint: ["hrContractTypes", Number((await params).id)],
    method: "GET"
  });
  return (
    <>
      <CustomHeader />
      <ContractTypesFormPage data={data} />
    </>
  );
};

export default page;

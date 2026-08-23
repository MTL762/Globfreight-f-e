import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import ContractFormPage from "@/components/pages/_contract/contractForm.page";

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrContracts", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <ContractFormPage data={{
        ...data,
        contract_type_id: data?.contract_type?.id,
        section_id: data?.section_id?.id,
        branch_id: data?.branch_id?.id,
        currency_id: data?.currency_id?.id,
      }} />
    </>
  );
};

export default page;

import CustomHeader from "@/components/layouts/header/CustomHeader";
import ContractTypesFormPage from "@/components/pages/_contractTypes/contractTypesForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <ContractTypesFormPage />
    </>
  );
}

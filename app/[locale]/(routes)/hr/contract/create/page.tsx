import CustomHeader from "@/components/layouts/header/CustomHeader";
import ContractFormPage from "@/components/pages/_contract/contractForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <ContractFormPage />
    </>
  );
}

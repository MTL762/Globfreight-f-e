import CustomHeader from "@/components/layouts/header/CustomHeader";
import DeductionsFormPage from "@/components/pages/_deductions/deductionsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <DeductionsFormPage />
    </>
  );
}

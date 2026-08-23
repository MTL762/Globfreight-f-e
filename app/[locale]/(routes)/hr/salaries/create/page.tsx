import CustomHeader from "@/components/layouts/header/CustomHeader";
import SalariesFormPage from "@/components/pages/_salaries/salariesForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <SalariesFormPage />
    </>
  );
}

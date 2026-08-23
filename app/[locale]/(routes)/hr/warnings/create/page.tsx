import CustomHeader from "@/components/layouts/header/CustomHeader";
import WarningsFormPage from "@/components/pages/_warnings/warningsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <WarningsFormPage />
    </>
  );
}

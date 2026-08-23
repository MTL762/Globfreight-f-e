import CustomHeader from "@/components/layouts/header/CustomHeader";
import ShiftsFormPage from "@/components/pages/_shifts/shiftsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <ShiftsFormPage />
    </>
  );
}

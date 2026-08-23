import CustomHeader from "@/components/layouts/header/CustomHeader";
import SectionsFormPage from "@/components/pages/_sections/sectionsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <SectionsFormPage />
    </>
  );
}

import CustomHeader from "@/components/layouts/header/CustomHeader";
import LanguagesFormPage from "@/components/pages/_languages/languagesForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <LanguagesFormPage />
    </>
  );
}

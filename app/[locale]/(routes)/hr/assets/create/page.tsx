import CustomHeader from "@/components/layouts/header/CustomHeader";
import AssetsFormPage from "@/components/pages/_assets/assetsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <AssetsFormPage />
    </>
  );
}

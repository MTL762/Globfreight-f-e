import CustomHeader from "@/components/layouts/header/CustomHeader";
import OnboardingTemplatesFormPage from "@/components/pages/_onboardingTemplates/onboardingTemplatesForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <OnboardingTemplatesFormPage />
    </>
  );
}

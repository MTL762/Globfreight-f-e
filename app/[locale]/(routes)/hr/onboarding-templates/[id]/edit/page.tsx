import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import OnboardingTemplatesFormPage from "@/components/pages/_onboardingTemplates/onboardingTemplatesForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrOnboardingTemplates", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <OnboardingTemplatesFormPage data={data?.data} />
    </>
  );
};

export default page;

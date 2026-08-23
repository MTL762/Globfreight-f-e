import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import SectionsFormPage from "@/components/pages/_sections/sectionsForm.page";

const page = async ({ params }: { params: Params }) => {
  const data: any = await fetchHelper({
    endPoint: ["hrSections", Number((await params).id)],
    method: "GET"
  });

  return (
    <>
      <CustomHeader />
      <SectionsFormPage data={data.data} />
    </>
  );
};

export default page;

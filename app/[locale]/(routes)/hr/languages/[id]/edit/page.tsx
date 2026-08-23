import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import LanguagesFormPage from "@/components/pages/_languages/languagesForm.page";

const page = async ({ params }: { params: Params }) => {
  const data: any = await fetchHelper({
    endPoint: ["hrLanguages", Number((await params).id)],
    method: "GET"
  });
  return (
    <>
      <CustomHeader />
      <LanguagesFormPage data={data.data} />
    </>
  );
};

export default page;

import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import WarningsFormPage from "@/components/pages/_warnings/warningsForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrWarnings", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <WarningsFormPage data={data?.data} />
    </>
  );
};

export default page;

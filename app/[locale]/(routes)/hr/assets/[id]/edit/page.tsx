import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import AssetsFormPage from "@/components/pages/_assets/assetsForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrAssets", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <AssetsFormPage data={data?.data} />
    </>
  );
};

export default page;

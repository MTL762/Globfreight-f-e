import CustomHeader from "@/components/layouts/header/CustomHeader";
import ServicesFormPage from "@/components/pages/_services/servicesForm.page";
import { fetchHelper } from "@/api/fetch";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetchHelper({
    endPoint: ["adminServices", Number(id)],
    method: "GET"
  });

  return (
    <>
      <CustomHeader />
      <ServicesFormPage data={data?.data} />
    </>
  );
};

export default page;


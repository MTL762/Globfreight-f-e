import CustomHeader from "@/components/layouts/header/CustomHeader";
import SubCategoriesFormPage from "@/components/pages/_sub-categories/subCategoriesForm.page";
import { fetchHelper } from "@/api/fetch";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetchHelper({
    endPoint: ["adminSubCategories", Number(id)],
    method: "GET"
  });

  return (
    <>
      <CustomHeader />
      <SubCategoriesFormPage data={data?.data} />
    </>
  );
};

export default page;

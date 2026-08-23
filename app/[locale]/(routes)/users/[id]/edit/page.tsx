import CustomHeader from "@/components/layouts/header/CustomHeader";
import UsersFormPage from "@/components/pages/_users/usersForm.page";
import { fetchHelper } from "@/api/fetch";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetchHelper({
    endPoint: ["adminUsers", Number(id)],
    method: "GET"
  });

  return (
    <>
      <CustomHeader />
      <UsersFormPage data={data?.data} />
    </>
  );
};

export default page;

import CustomHeader from "@/components/layouts/header/CustomHeader";

import { fetchHelper } from "@/api/fetch";
import RolesFormPage from "@/components/pages/_roles/rolesForm.page";

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["roles", Number((await params).id)],
    method: "GET"
  });
  const permissions = await fetchHelper({
    endPoint: ["permissionsSelectMenu"]
  });
  return (
    <>
      <CustomHeader />
      <RolesFormPage data={data} permissions={permissions?.data} />
    </>
  );
};

export default page;

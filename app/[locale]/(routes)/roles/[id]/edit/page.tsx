
import CustomHeader from "@/components/layouts/header/CustomHeader";

import RolesFormPage from '@/components/pages/_roles/rolesForm.page';
 import { fetchHelper } from '@/api/fetch';

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ['roles',Number((await params).id)],
    method: "GET",
  });

  return<>
  <CustomHeader />
   <RolesFormPage data={data?.data} /></>;
};

export default page;

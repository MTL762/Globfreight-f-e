
import CustomHeader from "@/components/layouts/header/CustomHeader";

import Sub-categoriesFormPage from '@/components/pages/_sub-categories/sub-categoriesForm.page';
 import { fetchHelper } from '@/api/fetch';

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ['adminSubCategories',Number((await params).id)],
    method: "GET",
  });

  return<>
  <CustomHeader />
   <Sub-categoriesFormPage data={data?.data} /></>;
};

export default page;

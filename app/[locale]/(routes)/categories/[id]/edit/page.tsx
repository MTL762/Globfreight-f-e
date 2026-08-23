
import CustomHeader from "@/components/layouts/header/CustomHeader";

import CategoriesFormPage from '@/components/pages/_categories/categoriesForm.page';
 import { fetchHelper } from '@/api/fetch';

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ['adminCategories',Number((await params).id)],
    method: "GET",
  });

  return<>
  <CustomHeader />
   <CategoriesFormPage data={data?.data} /></>;
};

export default page;

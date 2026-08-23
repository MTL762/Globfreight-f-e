
import CustomHeader from "@/components/layouts/header/CustomHeader";

import BlogFormPage from '@/components/pages/_blog/blogForm.page';
 import { fetchHelper } from '@/api/fetch';

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ['adminBlogPosts',Number((await params).id)],
    method: "GET",
  });

  return<>
  <CustomHeader />
   <BlogFormPage data={data?.data} /></>;
};

export default page;

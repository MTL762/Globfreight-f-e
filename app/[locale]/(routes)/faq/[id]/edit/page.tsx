
import CustomHeader from "@/components/layouts/header/CustomHeader";

import FaqFormPage from '@/components/pages/_faq/faqForm.page';
 import { fetchHelper } from '@/api/fetch';

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ['adminFaqItems',Number((await params).id)],
    method: "GET",
  });

  return<>
  <CustomHeader />
   <FaqFormPage data={data?.data} /></>;
};

export default page;

import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import PerformanceReviewsFormPage from "@/components/pages/_performanceReviews/performanceReviewsForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrPerformanceReviews", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <PerformanceReviewsFormPage data={data?.data} />
    </>
  );
};

export default page;

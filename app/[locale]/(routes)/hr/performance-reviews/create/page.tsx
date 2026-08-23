import CustomHeader from "@/components/layouts/header/CustomHeader";
import PerformanceReviewsFormPage from "@/components/pages/_performanceReviews/performanceReviewsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <PerformanceReviewsFormPage />
    </>
  );
}

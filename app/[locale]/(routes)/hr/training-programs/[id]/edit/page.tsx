import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import TrainingProgramsFormPage from "@/components/pages/_trainingPrograms/trainingProgramsForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrTrainingPrograms", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <TrainingProgramsFormPage data={data?.data} />
    </>
  );
};

export default page;

import CustomHeader from "@/components/layouts/header/CustomHeader";
import TrainingProgramsFormPage from "@/components/pages/_trainingPrograms/trainingProgramsForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <TrainingProgramsFormPage />
    </>
  );
}

import CustomHeader from "@/components/layouts/header/CustomHeader";
import ExpensesFormPage from "@/components/pages/_expenses/expensesForm.page";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <ExpensesFormPage />
    </>
  );
}

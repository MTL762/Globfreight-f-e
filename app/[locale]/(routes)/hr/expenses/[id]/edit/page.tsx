import CustomHeader from "@/components/layouts/header/CustomHeader";
import { fetchHelper } from "@/api/fetch";
import ExpensesFormPage from "@/components/pages/_expenses/expensesForm.page";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ["hrExpenses", Number((await params).id)]
  });

  return (
    <>
      <CustomHeader />
      <ExpensesFormPage data={data?.data} />
    </>
  );
};

export default page;

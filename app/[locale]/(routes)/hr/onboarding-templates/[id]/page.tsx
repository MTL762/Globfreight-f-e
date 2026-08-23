import { fetchData } from "@/api/global/fetchData";
import DefaultItemDetailsCreator from "@/components/common/DefaultItemDetailsComponents/DefaultItemDetailsCreator";

async function page({ params }: { params: Params }): Promise<JSX.Element> {
  const { id } = await params;
  const data = await fetchData(["hrOnboardingTemplates", Number(id)]);

  return (
    <DefaultItemDetailsCreator
      data={data?.data}
    />
  );
}

export default page;

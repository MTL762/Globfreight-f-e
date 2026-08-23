
import Sub-categoriesFormPage from '@/components/pages/_sub-categories/sub-categoriesForm.page';
import CustomHeader from "@/components/layouts/header/CustomHeader";


export default async function Page() : Promise<JSX.Element>  {
  return <>
  <CustomHeader />
  <Sub-categoriesFormPage /></>;
}

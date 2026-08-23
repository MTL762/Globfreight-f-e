
import FaqFormPage from '@/components/pages/_faq/faqForm.page';
import CustomHeader from "@/components/layouts/header/CustomHeader";


export default async function Page() : Promise<JSX.Element>  {
  return <>
  <CustomHeader />
  <FaqFormPage /></>;
}

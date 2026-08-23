
import BlogFormPage from '@/components/pages/_blog/blogForm.page';
import CustomHeader from "@/components/layouts/header/CustomHeader";


export default async function Page() : Promise<JSX.Element>  {
  return <>
  <CustomHeader />
  <BlogFormPage /></>;
}

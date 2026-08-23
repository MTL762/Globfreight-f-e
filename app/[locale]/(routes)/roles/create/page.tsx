
import RolesFormPage from '@/components/pages/_roles/rolesForm.page';
import CustomHeader from "@/components/layouts/header/CustomHeader";


export default async function Page() : Promise<JSX.Element>  {
  return <>
  <CustomHeader />
  <RolesFormPage /></>;
}

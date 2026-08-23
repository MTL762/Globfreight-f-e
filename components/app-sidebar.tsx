import { fetchHelper } from "@/api/fetch";
import getPermissions from "@/api/permissions";
import { SidebarBrandHeader } from "@/components/sidebar-brand-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import SideBarItems from "./layouts/sidebar/SideBarItems";
import SidebarFooterContent from "./layouts/sidebar/SidebarFooterContent";
import { links } from "./layouts/sidebar/sidebar-data";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const permissions = await getPermissions();
  const filterLink = links({ permissions });
  const data = await fetchHelper({
    endPoint: ["profile"]
  });
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarBrandHeader />
      </SidebarHeader>
      <SidebarContent>
        <SideBarItems links={filterLink} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent
          email={data?.data?.email ?? ""}
          name={data?.data?.name ?? ""}
          image={data?.data?.avatar ?? ""}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

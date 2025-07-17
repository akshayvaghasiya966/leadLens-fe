import {
  Brain,
  House,
  Megaphone,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export interface NavItem {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

// Export the navigation data
export const navMainData: NavItem[] = [
  {
    title: "Overview",
    url: "",
    icon: House,
    isActive: true,
  },
  {
    title: "Campaigns",  
    url: "campaigns",
    icon: Megaphone,
    isActive: true,
  },
  {
    title: "Leads",  
    url: "leads",
    icon:Users,
    isActive: true,
  },
  {
    title: "Ai Insights",  
    url: "ai-insights",
    icon:Brain,
    isActive: true,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const profile = useSelector((state: RootState) => state.userData);

  const data = {
    user: profile,
    navMain: navMainData,
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {/* <div className="border bg-black border-gray-400 flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
            <img
              src="/prankriti.png" // Adjust the path to where your PNG is stored
              width={"95%"}
              height={"70%"}
            />
          </div> */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Lead lens</span>
            {/* <span className="truncate text-xs">India</span> */}
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

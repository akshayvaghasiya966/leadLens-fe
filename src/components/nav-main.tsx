import {type LucideIcon } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
}

export function NavMain({ items }: { items: NavItem[] }) {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item) => {
           const isActive =item?.title=="Overview"?location?.pathname===`/${item?.url}`:location.pathname.startsWith(`/${item.url}`);
            return (
              <SidebarMenuItem key={item?.title}>
                <Link to={item?.url}>
                  <SidebarMenuButton tooltip={item?.title} className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all 
                    ${isActive ? "bg-muted text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}>
                    {item?.icon && <item.icon className="h-4 w-4" />}
                    <span>{item?.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

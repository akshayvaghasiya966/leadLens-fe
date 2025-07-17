import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLocation } from 'react-router-dom'
import { navMainData } from "./app-sidebar"

export function Navbar() {

  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)

  const getDisplayName = (path: string) => {
    // First check main nav items
    const mainItem = navMainData.find(item =>
      item.url === path || item.items?.some(subItem => subItem.url.includes(path))
    )

    if (mainItem) {
      // If it's a main item
      if (mainItem.url === path) return mainItem.title

      // If it's a sub item
      const subItem = mainItem.items?.find(item => item.url.includes(path))
      if (subItem) return subItem.title
    }

    // Fallback to formatting the path
    return path.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            {paths.map((path, index) => (
              <BreadcrumbItem key={path}>
                {index === paths.length - 1 ? (
                  <BreadcrumbPage>{getDisplayName(path)}</BreadcrumbPage>
                ) : (
                  <></>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
} 
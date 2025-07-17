import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [excludeSidebar, setExcludeSidebar] = useState(false);
  const location = useLocation();
  const profile = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (!profile?.role) {
      setExcludeSidebar(true);
    } else {
      setExcludeSidebar(false);
    }
  }, [location.pathname]);

  return (
    <>
      {excludeSidebar ? (
        <Outlet />
      ) : (
        <SidebarProvider>
          <AppSidebar />
         <div className="w-full">
          <Navbar />
          <main className="min-h-screen w-full p-4">
            <Outlet />
          </main>
         </div>
        </SidebarProvider>
      )} 
    </>
  );
};

export default MainLayout;

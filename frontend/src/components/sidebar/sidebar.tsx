import { DesktopSidebar } from "./desktop-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

export function Sidebar() {
  return (
    <>
      <div className="hidden sm:flex">
        <DesktopSidebar />
      </div>

      <div className="flex sm:hidden">
        <MobileSidebar />
      </div>
    </>
  );
}

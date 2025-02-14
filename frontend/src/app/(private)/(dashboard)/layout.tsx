import { Sidebar } from "@/app/components/sidebar/sidebar";
import { BaseNextLayoutProps } from "@/shared/types/next-type";

export default function DashboardLayout({
  children,
}: Readonly<BaseNextLayoutProps>) {
  return (
    <div className="bg-[#F7F8FD] w-full h-screen flex items-center justify-center">
      <div className="max-w-[1110px] w-full h-full flex flex-col lg:flex-row sm:gap-x-[30px] sm:gap-y-10 sm:px-10 sm:pt-[56px] md:pt-[94px]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

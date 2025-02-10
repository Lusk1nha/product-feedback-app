import { Sidebar } from "@/components/sidebar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background w-full h-screen flex items-center justify-center">
      <div className="max-w-[1110px] w-full h-full flex flex-col lg:flex-row sm:gap-x-[30px] sm:gap-y-10 sm:px-10 sm:pt-[56px] md:pt-[94px]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

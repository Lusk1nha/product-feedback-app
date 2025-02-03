import { Sidebar } from "@/components/sidebar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background w-full h-screen flex items-center justify-center">
      <div className="max-w-[1110px] w-full h-full flex gap-x-[30px]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

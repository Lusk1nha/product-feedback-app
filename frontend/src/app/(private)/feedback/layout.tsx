import { BaseNextLayoutProps } from "@/shared/types/next-type";

export default function FeedbackLayout({
  children,
}: Readonly<BaseNextLayoutProps>) {
  return (
    <div className="bg-[#F7F8FD] w-full min-h-screen h-full flex justify-center p-6">
      {children}
    </div>
  );
}

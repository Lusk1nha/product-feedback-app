import { BaseNextLayoutProps } from "@/shared/types/next-type";

export default function PublicLayout({
  children,
}: Readonly<BaseNextLayoutProps>) {
  return <div className="bg-background w-full h-screen">{children}</div>;
}

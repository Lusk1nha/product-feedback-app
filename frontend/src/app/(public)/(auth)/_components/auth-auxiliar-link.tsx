import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthAuxiliarLinkProps {
  children: React.ReactNode;
  href: string;

  className?: string;
}

export function AuthAuxiliarLink(props: Readonly<AuthAuxiliarLinkProps>) {
  const { children, href, className } = props;

  return (
    <Link href={href}>
      <span
        className={cn(
          "text-[#647196] text-xs hover:text-[#4661E6] underline",
          className
        )}
      >
        {children}
      </span>
    </Link>
  );
}

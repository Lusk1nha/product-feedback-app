import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface GoBackLinkProps {
  variant?: "default" | "white";

  className?: string;
  href: string;
}

export function GoBackLink(props: Readonly<GoBackLinkProps>) {
  const { variant = "default", className, href = "/" } = props;

  if (variant === "white") {
    return (
      <Link
        href={href}
        className={cn("flex items-center gap-x-4 group", className)}
      >
        <ChevronLeft className="w-3 sm:w-4 text-white" strokeWidth={4} />
        <span className="text-white text-[13px] sm:text-sm font-bold group-hover:underline">
          Go Back
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("flex items-center gap-x-4 group", className)}
    >
      <ChevronLeft className="w-3 sm:w-4 text-[#4661E6]" strokeWidth={4} />
      <span className="text-[#647196] text-[13px] sm:text-sm font-bold group-hover:underline">
        Go Back
      </span>
    </Link>
  );
}

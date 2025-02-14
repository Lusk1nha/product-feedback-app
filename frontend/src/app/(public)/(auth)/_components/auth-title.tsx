import { cn } from "@/lib/utils";
import { memo } from "react";

interface AuthTitleProps {
  className?: string;
  children: React.ReactNode;
}

const AuthTitle = memo((props: Readonly<AuthTitleProps>) => {
  const { children, className } = props;
  return (
    <h2 className={cn("text-xl text-[#3A4374] font-bold", className)}>
      {children}
    </h2>
  );
});

AuthTitle.displayName = "AuthTitle";

export { AuthTitle };

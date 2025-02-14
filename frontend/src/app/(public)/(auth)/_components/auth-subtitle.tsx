import { cn } from "@/lib/utils";
import { memo } from "react";

interface AuthSubTitleProps {
  className?: string;
  children: React.ReactNode;
}

const AuthSubTitle = memo((props: Readonly<AuthSubTitleProps>) => {
  const { children, className } = props;
  return (
    <h3 className={cn("text-base text-[#647196] font-medium", className)}>
      {children}
    </h3>
  );
});

AuthSubTitle.displayName = "AuthSubTitle";

export { AuthSubTitle };

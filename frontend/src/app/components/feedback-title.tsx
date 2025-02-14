import { cn } from "@/lib/utils";
import { memo } from "react";

interface FeedbackTitleProps {
  className?: string;
  children: React.ReactNode;
}

const FeedbackTitle = memo((props: Readonly<FeedbackTitleProps>) => {
  const { children, className } = props;
  return (
    <h2 className={cn("text-lg text-[#3A4374] font-bold", className)}>
      {children}
    </h2>
  );
});

FeedbackTitle.displayName = "FeedbackTitle";

export { FeedbackTitle };

import { cn } from "@/lib/utils";
import { HTMLAttributes, memo } from "react";

interface SystemDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

const SystemDescription = memo((props: Readonly<SystemDescriptionProps>) => {
  const { className, ...rest } = props;
  return (
    <p
      className={cn("text-[13px] text-[#647196] font-normal", className)}
      {...rest}
    />
  );
});

export { SystemDescription };

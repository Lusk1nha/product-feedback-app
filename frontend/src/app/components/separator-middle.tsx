import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface SeparatorMiddleProps {
  children: React.ReactNode;
  className?: string;
}

export function SeparatorMiddle(props: Readonly<SeparatorMiddleProps>) {
  const { children, className } = props;

  return (
    <div className={cn("flex gap-x-2 items-center", className)}>
      <Separator className="flex-1 bg-[#647196]/25" />
      {children}
      <Separator className="flex-1 bg-[#647196]/25" />
    </div>
  );
}

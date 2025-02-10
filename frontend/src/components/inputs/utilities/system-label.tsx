import { cn } from "@/lib/utils";
import { LabelHTMLAttributes, memo } from "react";

interface SystemLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
}

const SystemLabel = memo((props: Readonly<SystemLabelProps>) => {
  const { className, required, ...rest } = props;
  return (
    <div className="flex gap-x-1">
      <label
        className={cn("text-[13px] text-[#3A4374] font-bold", className)}
        {...rest}
      />

      {required && (
        <span className="text-[#D73737] text-[11px] font-bold">*</span>
      )}
    </div>
  );
});

export { SystemLabel };

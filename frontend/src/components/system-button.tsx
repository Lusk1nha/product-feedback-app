import { cn } from "@/lib/utils";

interface SystemButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function SystemButton(props: Readonly<SystemButtonProps>) {
  const { className, ...rest } = props;

  return (
    <button
      className={cn(
        "min-w-[117px] w-full sm:w-auto h-10 sm:h-11 bg-[#AD1FEA] text-[13px] sm:text-sm md:text-[15px] font-medium text-white px-2 rounded-[10px] cursor-pointer disabled:bg-[#E0DBF7] disabled:cursor-not-allowed transition-colors",
        className
      )}
      {...rest}
    />
  );
}

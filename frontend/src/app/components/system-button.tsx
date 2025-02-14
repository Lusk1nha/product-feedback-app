import { cn } from "@/lib/utils";
import { Spinner } from "./ui/loading-spinner";

interface SystemButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  spinnerClassName?: string;

  isFetching?: boolean;
}

export function SystemButton(props: Readonly<SystemButtonProps>) {
  const {
    className,
    spinnerClassName,
    children,
    isFetching = false,
    ...rest
  } = props;

  return (
    <button
      className={cn(
        "min-w-[117px] w-full sm:w-auto h-10 sm:h-11 bg-[#AD1FEA] flex items-center justify-center text-[13px] sm:text-sm md:text-[15px] font-medium text-white px-2 rounded-[10px] cursor-pointer disabled:bg-[#E0DBF7] disabled:cursor-not-allowed transition-colors select-none gap-x-2",
        isFetching && "disabled:cursor-wait",
        className
      )}
      disabled={isFetching}
      {...rest}
    >
      {children}
      {isFetching && (
        <Spinner className={cn("w-4 h-4 text-white", spinnerClassName)} />
      )}
    </button>
  );
}

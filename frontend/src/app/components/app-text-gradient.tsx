import { cn } from "@/lib/utils";

interface AppTextGradientProps {
  className?: string;
  children: React.ReactNode;
}

export function AppTextGradient(props: Readonly<AppTextGradientProps>) {
  const { children, className } = props;

  return (
    <span
      className={cn(
        "bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

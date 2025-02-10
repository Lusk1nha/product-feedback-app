import { memo } from "react";

interface SystemErrorProps {
  message?: string;
}

const SystemError = memo((props: Readonly<SystemErrorProps>) => {
  const { message } = props;

  if (!message) return null;

  return (
    <span className="text-[13px] sm:text-[15px] text-[#D73737]">{message}</span>
  );
});

export { SystemError };

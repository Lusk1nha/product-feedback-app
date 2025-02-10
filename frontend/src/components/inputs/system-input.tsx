import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SystemError } from "./utilities/system-error";

interface SystemTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;

  placeholder?: string;
  onChange?: (comment: string) => void;

  disabled?: boolean;
}

export function SystemInput<F extends FieldValues>(
  props: Readonly<SystemTextAreaProps<F>>
) {
  const { name, placeholder, onChange, control, disabled } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <StyledInput
          {...field}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
            field.onChange(e);
          }}
          error={!!fieldState.error}
          message={fieldState.error?.message}
          disabled={disabled}
        />
      )}
    />
  );
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  message?: string;
}

function StyledInput(props: StyledInputProps) {
  const { error, message, ...rest } = props;

  return (
    <div className="w-full flex flex-col gap-y-2">
      <input
        className={cn(
          "w-full h-12 bg-[#F7F8FD] border  text-[#3A4374] text-[13px] sm:text-[15px] py-4 px-4 sm:px-6 rounded-[5px] focus:outline-none focus:ring-1",
          !error
            ? "border-[#F7F8FD] focus:border-[#4661E6] focus:ring-[#4661E6]"
            : "border-[#D73737] focus:border-[#D73737] focus:ring-[#D73737]"
        )}
        {...rest}
      />

      {error && <SystemError message={message} />}
    </div>
  );
}

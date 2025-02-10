"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SystemError } from "./utilities/system-error";

interface SystemTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;

  placeholder?: string;
  onChange?: (comment: string) => void;

  disabled?: boolean;
}

export function SystemTextArea<F extends FieldValues>(
  props: Readonly<SystemTextAreaProps<F>>
) {
  const { name, placeholder, onChange, control, disabled } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...field }, fieldState }) => (
        <StyledTextArea
          {...field}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
            field.onChange(e);
          }}
          value={field.value}
          error={!!fieldState.error}
          message={fieldState.error?.message}
          disabled={disabled}
        />
      )}
    />
  );
}

interface StyledTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error: boolean;
  message?: string;
}

function StyledTextArea(props: StyledTextAreaProps) {
  const { error, message, value, onChange, ...rest } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full bg-[#F7F8FD] border text-[#3A4374] text-[13px] sm:text-[15px] py-4 px-4 sm:px-6 rounded-[5px] focus:outline-none focus:ring-1 resize-none", // Added resize-none to prevent manual resizing
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

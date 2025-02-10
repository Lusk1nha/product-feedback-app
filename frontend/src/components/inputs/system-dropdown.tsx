"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronUp, PencilOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import { SystemError } from "./utilities/system-error";

export type SystemDropdownOption = {
  value: unknown;
  label: string;
};

interface SystemDropdownProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SystemDropdownOption[];
  defaultValue?: string;
  onChange?: (option: SystemDropdownOption) => void;
  placeholder?: string;

  disabled?: boolean;
}

export function SystemDropdown<F extends FieldValues>(
  props: Readonly<SystemDropdownProps<F>>
) {
  const { name, control, options, onChange, placeholder, disabled } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <StyledDropdown
          options={options}
          currentValue={field.value}
          onChange={(option) => {
            onChange?.(option);
            field.onChange(option.value);
          }}
          placeholder={placeholder}
          onBlur={field.onBlur}
          error={!!fieldState.error}
          message={fieldState.error?.message}
          disabled={disabled}
        />
      )}
    />
  );
}

interface StyledDropdownProps {
  options: SystemDropdownOption[];
  currentValue: string;
  onChange: (option: SystemDropdownOption) => void;
  onBlur?: () => void;
  placeholder?: string;
  error: boolean;
  message?: string;

  disabled?: boolean;
}

function StyledDropdown(props: Readonly<StyledDropdownProps>) {
  const {
    options,
    onChange,
    currentValue,
    placeholder,
    error,
    message,
    onBlur,
    disabled,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(
    (option) => option.value === currentValue
  );

  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOptionSelect = (option: SystemDropdownOption) => {
    onChange(option);
    setIsOpen(false);
    onBlur?.();
  };

  return (
    <div className="relative w-full flex flex-col gap-y-2" ref={dropdownRef}>
      <div
        ref={refs.setReference}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="dropdown-options"
        className={cn(
          "w-full min-h-12 bg-[#F7F8FD] border flex items-center rounded-[5px] focus:outline-none focus:ring-1 relative",
          !error
            ? "border-[#F7F8FD] focus:border-[#4661E6] focus:ring-[#4661E6]"
            : "border-[#D73737] focus:border-[#D73737] focus:ring-[#D73737]",
          disabled && "bg-[#F7F8FD] text-[#647196] cursor-not-allowed"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        onBlur={onBlur}
        tabIndex={0}
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-6">
          <p
            className={cn(
              "text-[13px] sm:text-[15px] font-normal",
              selectedOption ? "text-[#3A4374]" : "text-[#647196]"
            )}
          >
            {selectedOption?.label ?? placeholder}
          </p>

          {disabled ? (
            <PencilOff className="text-[#647196] w-4 h-4" strokeWidth={3} />
          ) : (
            <ChevronUp
              className={cn(
                "text-[#4661E6] w-4 h-4 transition-transform",
                isOpen && "rotate-180"
              )}
              strokeWidth={3}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 w-full"
        >
          <ul
            id="dropdown-options"
            role="listbox"
            className="bg-white w-full max-h-60 overflow-auto rounded-[10px] shadow-[0px_10px_25px_0px_#373f6859] border"
          >
            {options.map((option) => (
              <DropdownOption
                key={
                  typeof option.value === "string" ? option.value : option.label
                }
                option={option}
                onClick={() => handleOptionSelect(option)}
                isSelected={option.value === currentValue}
              />
            ))}
          </ul>
        </div>
      )}

      {error && <SystemError message={message} />}
    </div>
  );
}

interface DropdownOptionProps {
  option: SystemDropdownOption;
  onClick: () => void;
  isSelected?: boolean;
}

function DropdownOption({ option, onClick, isSelected }: DropdownOptionProps) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      className={cn(
        "w-full h-12 flex items-center justify-between px-4",
        "text-[#647196] hover:text-[#AD1FEA] hover:bg-[#F7F8FD]",
        "font-normal text-sm sm:text-base cursor-pointer",
        "border-b last:border-b-0 border-[#979797]/15",
        "transition-colors"
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      tabIndex={0}
    >
      {option.label}
      {isSelected && <Check className="text-[#AD1FEA] w-4 h-4" />}
    </li>
  );
}

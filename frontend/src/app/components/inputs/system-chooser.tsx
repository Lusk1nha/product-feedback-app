"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronUp, PencilOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from "@floating-ui/react";

export type SystemChooserOption = {
  value: unknown;
  label: string;
};

interface SystemChooserProps {
  options: SystemChooserOption[];
  value?: string;

  onChange?: (option: SystemChooserOption) => void;
  placeholder?: string;

  disabled?: boolean;
}

export function SystemChooser(props: Readonly<SystemChooserProps>) {
  const { options, onChange, value, placeholder, disabled } = props;

  return (
    <StyledChooser
      options={options}
      currentValue={value}
      onChange={(option) => {
        onChange?.(option);
      }}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

interface StyledChooserProps {
  options: SystemChooserOption[];
  currentValue: string | undefined;

  onChange: (option: SystemChooserOption) => void;

  placeholder?: string;

  disabled?: boolean;
}

function StyledChooser(props: Readonly<StyledChooserProps>) {
  const { options, onChange, currentValue, placeholder, disabled } = props;

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

  const handleOptionSelect = (option: SystemChooserOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-y-2" ref={dropdownRef}>
      <div
        ref={refs.setReference}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="dropdown-options"
        className={cn(
          "cursor-pointer select-none",
          disabled && "bg-[#F7F8FD] text-[#647196] cursor-not-allowed"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        tabIndex={0}
      >
        <div className="flex items-center justify-between gap-x-1 sm:gap-x-2.5">
          <div className="flex items-center gap-x-0.5 sm:gap-x-1 text-[#F2F4FE]">
            <p
              className={cn(
                "hidden sm:block text-[13px] sm:text-sm font-normal"
              )}
            >
              {placeholder}
            </p>

            <span className="hidden sm:block text-[13px] sm:text-sm">:</span>

            <p className="text-[13px] sm:text-sm font-semibold">
              {selectedOption?.label}
            </p>
          </div>

          {disabled ? (
            <PencilOff className="text-white w-4 h-4" strokeWidth={3} />
          ) : (
            <ChevronUp
              className={cn(
                "text-white w-4 h-4 transition-transform",
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
          className="z-50 w-[150%]"
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
    </div>
  );
}

interface DropdownOptionProps {
  option: SystemChooserOption;
  onClick: () => void;
  isSelected?: boolean;
}

function DropdownOption({ option, onClick, isSelected }: DropdownOptionProps) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      className={cn(
        "w-full h-12 flex items-center justify-between px-4 gap-x-4",
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

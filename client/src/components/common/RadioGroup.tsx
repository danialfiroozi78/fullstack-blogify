"use client";

import { useId, type InputHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

type RadioOption = {
  label: string;
  value: string;
};

interface RadioGroupProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "name" | "onChange"
> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  helperText?: string;
  options: RadioOption[];
  fullWidth?: boolean;
  direction?: "row" | "column";
  rules?: RegisterOptions<T, Path<T>>;
}

export function RadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  options,
  fullWidth = true,
  direction = "row",
  disabled = false,
  className = "",
  id,
  rules,
  ...props
}: RadioGroupProps<T>) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const messageId = `${groupId}-message`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const errorMessage = error ?? fieldState.error?.message;

        return (
          <fieldset
            disabled={disabled}
            className={`flex flex-col gap-2 ${
              fullWidth ? "w-full" : "w-fit"
            } ${className}`}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={
              errorMessage || helperText ? messageId : undefined
            }
          >
            {label && (
              <legend className="mb-2 mr-2 text-sm font-medium text-text-primary">
                {label}
                {props.required && <span className="ms-1 text-red-500">*</span>}
              </legend>
            )}

            <div
              className={`flex gap-3 ${
                direction === "column" ? "flex-col" : "flex-row flex-wrap"
              }`}
            >
              {options.map((option, index) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-2
                    rounded-xl border bg-card px-3 py-2
                    text-sm font-medium text-text-primary
                    transition-colors duration-200
                    hover:border-primary/40
                    has-checked:border-primary
                    has-checked:bg-primary/5
                    ${errorMessage ? "border-red-500" : "border-border"}
                    ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  <input
                    ref={index === 0 ? field.ref : undefined}
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    onBlur={field.onBlur}
                    disabled={disabled}
                    className="h-4 w-4 accent-primary"
                  />

                  <span>{option.label}</span>
                </label>
              ))}
            </div>

            {(errorMessage || helperText) && (
              <p
                id={messageId}
                role={errorMessage ? "alert" : undefined}
                className={`text-xs ${
                  errorMessage ? "text-red-600" : "text-text-secondary"
                }`}
              >
                {errorMessage || helperText}
              </p>
            )}
          </fieldset>
        );
      }}
    />
  );
}

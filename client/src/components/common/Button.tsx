"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "dangerGhost"
  | "dangerOutline";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconOnly?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-violet-900",

  secondary: "bg-box text-primary hover:bg-violet-100 active:bg-violet-200",

  outline:
    "border border-primary bg-transparent text-primary hover:text-white hover:bg-primary active:bg-violet-900",

  ghost: "bg-transparent text-primary hover:bg-box active:bg-violet-100",

  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",

  dangerGhost: "text-red-700 bg-red-50 hover:bg-red-100 active:bg-red-200",

  dangerOutline:
    "text-red-700 border border-red-700 bg-white hover:bg-red-700 hover:text-white active:bg-red-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-11 px-4 text-[15px] font-bold gap-2",
  lg: "h-12 px-10 text-base gap-2.5",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      iconOnly = false,
      icon,
      iconPosition = "start",
      fullWidth = false,
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const classes = [
      "relative inline-flex shrink-0 items-center justify-center",
      "rounded-xl font-bold whitespace-nowrap",
      "transition-colors duration-200",
      "cursor-pointer select-none",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-primary/40",
      "focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "disabled:pointer-events-none",
      variants[variant],
      iconOnly ? iconSizes[size] : sizes[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        ) : iconOnly ? (
          (icon ?? children)
        ) : (
          <>
            {icon && iconPosition === "start" && icon}

            {children}

            {icon && iconPosition === "end" && icon}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

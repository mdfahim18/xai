"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { m, HTMLMotionProps } from "framer-motion";
import { cn } from "@/src/lib/utils/cn";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

type MotionButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  as?: "button" | "motion";
};

type NormalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  as?: "button" | "motion";
};

type ButtonProps = NormalButtonProps | MotionButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary text-white",
    "hover:bg-primary-hover",
    "active:scale-[0.98]",
    "shadow-glow",
    "hover:shadow-glow-strong",
  ].join(" "),

  outline: [
    "bg-transparent text-primary",
    "border-2 border-primary",
    "hover:bg-primary/10",
    "hover:border-primary-hover",
    "hover:text-primary-hover",
    "active:scale-[0.98]",
  ].join(" "),

  ghost: [
    "bg-transparent text-text-secondary",
    "hover:bg-surface",
    "hover:text-text-primary",
    "active:scale-[0.98]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      as = "button",
      ...rest
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2",
      "font-medium",
      "transition-all duration-300 ease-spring",
      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (as === "motion") {
      const motionRest = rest as HTMLMotionProps<"button">;
      return (
        <m.button
          ref={ref}
          className={baseStyles}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          {...motionRest}
        >
          {children}
        </m.button>
      );
    }

    const normalRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref} className={baseStyles} {...normalRest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/src/lib/utils/cn";

export type CardVariant = "default" | "glass" | "bordered" | "glow";
export type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
  className?: string;
  as?: "div" | "motion";
  hoverable?: boolean;
}

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantStyles: Record<CardVariant, string> = {
  default: ["bg-surface", "border border-border", "shadow-card"].join(" "),

  glass: [
    "bg-surface/80",
    "backdrop-blur-xl",
    "border border-white/10",
    "shadow-card",
  ].join(" "),

  bordered: [
    "bg-transparent",
    "border-2 border-primary/30",
    "hover:border-primary/60",
    "transition-colors duration-300",
  ].join(" "),

  glow: [
    "bg-surface",
    "border border-primary/20",
    "shadow-glow",
    "hover:shadow-glow-strong",
    "transition-shadow duration-300",
  ].join(" "),
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      children,
      className,
      as = "div",
      hoverable = false,
      ...rest
    },
    ref
  ) => {
    const baseStyles = cn(
      "rounded-xl",
      "transition-all duration-300 ease-spring",
      variantStyles[variant],
      paddingStyles[padding],
      hoverable && [
        "hover:scale-[1.01]",
        "hover:border-primary/40",
        "hover:shadow-glow-strong",
        "cursor-pointer",
      ],
      className
    );

    if (as === "motion") {
      const motionRest = rest as HTMLMotionProps<"div">;
      return (
        <motion.div
          ref={ref}
          className={baseStyles}
          whileHover={hoverable ? { scale: 1.02, y: -4 } : undefined}
          whileTap={hoverable ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          {...motionRest}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseStyles} {...rest}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...rest}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, CardSectionProps>(
  ({ children, className, ...rest }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold text-text-primary leading-none",
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, CardSectionProps>(
  ({ children, className, ...rest }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-text-secondary", className)}
      {...rest}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={cn("", className)} {...rest}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...rest}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/src/lib/utils/cn";

export type ContainerMaxWidth =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxWidth?: ContainerMaxWidth;
  padding?: boolean | string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

const maxWidthClasses: Record<ContainerMaxWidth, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "3xl": "max-w-7xl",
  "4xl": "max-w-[1600px]",
  "5xl": "max-w-[1800px]",
  "6xl": "max-w-[2000px]",
  "7xl": "max-w-[2200px]",
  full: "max-w-full",
};

const defaultPadding = "px-4 sm:px-6 lg:px-8";

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      className,
      maxWidth = "7xl",
      padding = true,
      as: Component = "div",
      ...rest
    },
    ref
  ) => {
    const paddingClass =
      typeof padding === "string" ? padding : padding ? defaultPadding : "";

    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full",
          maxWidthClasses[maxWidth],
          paddingClass,
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export default Container;

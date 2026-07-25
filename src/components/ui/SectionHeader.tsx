"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/src/lib/utils/cn";

export type SectionHeaderAlignment = "left" | "center" | "right";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  alignment?: SectionHeaderAlignment;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  badgeClassName?: string;
}

const alignmentClasses: Record<SectionHeaderAlignment, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      badge,
      title,
      description,
      alignment = "center",
      className,
      titleClassName,
      descriptionClassName,
      badgeClassName,
      ...rest
    },
    ref
  ) => {
    const containerClasses = cn(
      "flex flex-col gap-2",
      alignmentClasses[alignment],
      className
    );

    const titleClasses = cn(
      "text-3xl md:text-4xl lg:text-5xl font-bold text-white",
      "tracking-tight",
      titleClassName
    );

    const descriptionClasses = cn(
      "text-base md:text-lg text-text-secondary",
      "max-w-3xl",
      alignment === "center" && "mx-auto",
      alignment === "right" && "ml-auto",
      descriptionClassName
    );

    const badgeClasses = cn(
      "inline-block bg-surface px-4 py-1.5 rounded-full border border-border",
      "text-sm font-medium text-primary",
      badgeClassName
    );

    return (
      <div ref={ref} className={containerClasses} {...rest}>
        {badge && <div className={badgeClasses}>{badge}</div>}
        <h2 className={titleClasses}>{title}</h2>
        {description && <p className={descriptionClasses}>{description}</p>}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;

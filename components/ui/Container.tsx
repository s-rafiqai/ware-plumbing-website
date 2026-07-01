import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Semantic element to render as (e.g. "section", "header"). Defaults to div. */
  as?: ElementType;
}

/**
 * Centres content to the 1200px page width with responsive side gutters
 * (24px mobile → 32px on large screens), per the design system layout spec.
 */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-page px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}

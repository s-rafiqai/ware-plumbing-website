import type { ElementType, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  /** Applies the off-white surface background for alternating sections. */
  muted?: boolean;
  className?: string;
  /** Extra classes on the inner Container. */
  innerClassName?: string;
  as?: ElementType;
  id?: string;
  "aria-labelledby"?: string;
}

/**
 * A full-width section with the design system's responsive vertical rhythm
 * (40 → 64 → 96px), wrapping its content in the page Container.
 */
export function Section({
  children,
  muted,
  className,
  innerClassName,
  as: Tag = "section",
  id,
  ...aria
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("py-10 md:py-16 lg:py-24", muted && "bg-surface", className)}
      {...aria}
    >
      <Container className={innerClassName}>{children}</Container>
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Optional supporting paragraph below the title. */
  intro?: string;
  /** Centre the heading block (used for full-width sections). */
  centered?: boolean;
  /** Heading id, so a Section can reference it via aria-labelledby. */
  id?: string;
  className?: string;
}

/** Eyebrow + title (+ intro) block used to introduce a section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  centered,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-small font-semibold uppercase tracking-wide text-blue">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="mt-3 text-h2 text-ink text-balance">
        {title}
      </h2>
      {intro && <p className="mt-4 text-body text-ink-soft text-pretty">{intro}</p>}
    </div>
  );
}

import type { ElementType, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Vertical rhythm presets — deliberate dynamic range between sections. */
type Space = "tight" | "default" | "spacious";
const SPACE: Record<Space, string> = {
  tight: "py-8 md:py-10",
  default: "py-10 md:py-16 lg:py-24", // the design system's 40→64→96
  spacious: "py-16 md:py-24 lg:py-32",
};

interface SectionProps {
  children: ReactNode;
  /** Applies the off-white surface background for alternating sections. */
  muted?: boolean;
  /** Vertical rhythm preset (default = 40→64→96). */
  space?: Space;
  className?: string;
  /** Extra classes on the inner Container. */
  innerClassName?: string;
  as?: ElementType;
  id?: string;
  "aria-labelledby"?: string;
}

/**
 * A full-width section wrapping its content in the page Container, with a
 * selectable vertical-rhythm preset so the page can breathe unevenly on purpose.
 */
export function Section({
  children,
  muted,
  space = "default",
  className,
  innerClassName,
  as: Tag = "section",
  id,
  ...aria
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(SPACE[space], muted && "bg-surface", className)}
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
  /**
   * Choreograph the block on scroll — eyebrow and intro fade while the title
   * plays a line/clip reveal, staggered on one track. When set, the caller
   * should NOT also wrap this in <Reveal>. Off by default (static markup) so
   * existing callers are unchanged.
   */
  animate?: boolean;
}

/** Eyebrow + title (+ intro) block used to introduce a section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  centered,
  id,
  className,
  animate = false,
}: SectionHeadingProps) {
  const wrapperClass = cn(
    "max-w-2xl",
    centered && "mx-auto text-center",
    className,
  );
  const eyebrowEl = eyebrow && (
    <p className="text-small font-semibold uppercase tracking-wide text-blue">
      {eyebrow}
    </p>
  );
  const titleEl = (
    <h2 id={id} className="mt-3 text-h2 text-ink text-balance">
      {title}
    </h2>
  );
  const introEl = intro && (
    <p className="mt-4 text-body text-ink-soft text-pretty">{intro}</p>
  );

  if (!animate) {
    return (
      <div className={wrapperClass}>
        {eyebrowEl}
        {titleEl}
        {introEl}
      </div>
    );
  }

  return (
    <RevealGroup className={wrapperClass} stagger={0.08}>
      {eyebrow && <RevealItem>{eyebrowEl}</RevealItem>}
      <RevealItem variant="line">{titleEl}</RevealItem>
      {intro && <RevealItem>{introEl}</RevealItem>}
    </RevealGroup>
  );
}

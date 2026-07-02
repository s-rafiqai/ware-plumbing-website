"use client";

import type { ReactNode } from "react";
import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import {
  makeFadeUp,
  staggerContainer,
  staggerItem,
  lineReveal,
  maskReveal,
  inViewport,
} from "@/lib/motion";

/** Which entrance a reveal plays. `fade` = the original fade-and-rise. */
export type RevealVariant = "fade" | "line" | "mask";

/** Resolve a variant name to its Variants object (fade honours the `y` prop). */
function variantsFor(variant: RevealVariant, y: number): Variants {
  if (variant === "line") return lineReveal;
  if (variant === "mask") return maskReveal;
  return makeFadeUp(y);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Rise distance in px for the `fade` variant (default 16). */
  y?: number;
  /** Delay before this reveal plays, in seconds. */
  delay?: number;
  /** Entrance behaviour: `fade` (default), `line` (headline clip), `mask` (photo wipe). */
  variant?: RevealVariant;
}

/**
 * Reveal a block into view once, on scroll. Defaults to the original
 * fade-and-rise; `variant` swaps in the line (headline) or mask (photo) reveal.
 * Under reduced-motion it renders a plain, fully-visible div — no transform,
 * opacity or clip gate.
 */
export function Reveal({
  children,
  className,
  y = 16,
  delay = 0,
  variant = "fade",
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variantsFor(variant, y)}
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  stagger?: number;
  /** Delay before the first child, in seconds. */
  delayChildren?: number;
  /** Render as a list when the children are RevealItem `li`s. */
  as?: "div" | "ul";
}

/**
 * Staggers its `RevealItem` children into view — for grids and lists, so items
 * cascade rather than appearing all at once. Static under reduced motion.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = "div",
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const Tag = as === "ul" ? motion.ul : motion.div;
  const Plain = as === "ul" ? "ul" : "div";
  if (reduce) return <Plain className={className}>{children}</Plain>;

  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
    >
      {children}
    </Tag>
  );
}

/**
 * A single item within a RevealGroup. Render as the list element via `as`.
 * `variant` lets one item play a different entrance (e.g. a `line` reveal on a
 * heading) while still riding the parent's stagger timing.
 */
export function RevealItem({
  children,
  className,
  as = "div",
  variant = "fade",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  const Plain = as === "li" ? "li" : "div";
  if (reduce) return <Plain className={className}>{children}</Plain>;

  const variants =
    variant === "line" ? lineReveal : variant === "mask" ? maskReveal : staggerItem;
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}

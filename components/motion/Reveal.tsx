"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  makeFadeUp,
  staggerContainer,
  staggerItem,
  inViewport,
} from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Rise distance in px (default 16). */
  y?: number;
  /** Delay before this reveal plays, in seconds. */
  delay?: number;
}

/**
 * Fade-and-rise a block into view once, on scroll. Under reduced-motion it
 * renders a plain, fully-visible div — no transform, no opacity gate.
 */
export function Reveal({ children, className, y = 16, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const variants = makeFadeUp(y);
  return (
    <motion.div
      className={className}
      variants={variants}
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

/** A single item within a RevealGroup. Render as the list element via `as`. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  const Plain = as === "li" ? "li" : "div";
  if (reduce) return <Plain className={className}>{children}</Plain>;

  return (
    <Tag className={className} variants={staggerItem}>
      {children}
    </Tag>
  );
}

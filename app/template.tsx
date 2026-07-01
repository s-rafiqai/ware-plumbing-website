"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Wraps each route's content. Because Next remounts template.tsx on every
 * navigation, this gives a subtle enter transition between pages. Kept cheap
 * (opacity + small rise) and skipped entirely under reduced motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const className = "flex flex-1 flex-col";
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface CountUpProps {
  /** Target integer to count to. */
  value: number;
  prefix?: string;
  suffix?: string;
  durationSeconds?: number;
  className?: string;
}

/**
 * Counts up to `value` the first time it scrolls into view. SSR renders the
 * final value (no CLS, correct with JS off); on the client it arms from 0 while
 * off-screen and animates on entry. Under reduced motion it stays at the final
 * value and never animates.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationSeconds = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduce) return; // keep final value
    if (!inView) {
      // Arm from 0 while off-screen. This synchronous setState is intentional:
      // SSR/no-JS keep the final value, and the reset happens below the fold so
      // there's no visible flash before the count animates in.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      duration: durationSeconds,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, durationSeconds]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

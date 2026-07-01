import type { Variants, Transition } from "motion/react";

/**
 * Motion primitives shared across the site. These mirror the CSS motion tokens
 * in globals.css (--ease-out-expo, --dur-*) so JS-driven and CSS-driven motion
 * feel identical.
 *
 * All consumers must gate these behind `useReducedMotion()` and render the
 * static equivalent when reduced motion is requested.
 */

/** cubic-bezier(0.16, 1, 0.3, 1) — matches --ease-out-expo. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const DUR = { fast: 0.15, base: 0.3, slow: 0.7 } as const;

/** Default reveal transition: a slow, confident settle. */
export const revealTransition: Transition = {
  duration: DUR.slow,
  ease: EASE_OUT_EXPO,
};

/** Single fade-and-rise from `y` px (spec entrance: opacity 0→1 + 20px rise). */
export const makeFadeUp = (y = 20): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: revealTransition },
});

export const fadeUp = makeFadeUp();

/** Container that staggers its RevealItem children into view. */
export const staggerContainer = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Child of a staggerContainer — rises and fades as the container plays. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: revealTransition },
};

/** Viewport config so reveals fire ~20% into view, once only. */
export const inViewport = { once: true, margin: "0px 0px -20% 0px" } as const;

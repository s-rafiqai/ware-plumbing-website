import type { Variants, Transition } from "motion/react";

/**
 * Motion primitives shared across the site. These mirror the CSS motion tokens
 * in globals.css (--ease-out-expo, --dur-*) so JS-driven and CSS-driven motion
 * feel identical.
 *
 * All consumers must gate these behind `useReducedMotion()` and render the
 * static equivalent when reduced motion is requested.
 */

/** cubic-bezier(0.16, 1, 0.3, 1) — matches --ease-out-expo. Entrances/reveals. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * cubic-bezier(0.33, 1, 0.68, 1) — matches --ease-out-soft. The gentler curve:
 * its home is hover/micro-interactions (was defined in CSS but unused before).
 */
export const EASE_OUT_SOFT = [0.33, 1, 0.68, 1] as const;

/**
 * Durations mirror the CSS --dur-* tokens exactly (150 / 300 / 600ms). `slow`
 * was 0.7s here vs 600ms in CSS — reconciled to a single 0.6s value.
 */
export const DUR = { fast: 0.15, base: 0.3, slow: 0.6 } as const;

/** Default reveal transition: a slow, confident settle. */
export const revealTransition: Transition = {
  duration: DUR.slow,
  ease: EASE_OUT_EXPO,
};

/** Micro-interaction tween (hover/press colour + small shifts). Uses the soft curve. */
export const softTransition: Transition = {
  duration: DUR.base,
  ease: EASE_OUT_SOFT,
};

/**
 * Gentle settle spring — for entrances. High damping, minimal overshoot: it
 * arrives with weight, it does not wobble. Centralised so no component inlines
 * its own spring config.
 */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
};

/** Snappier spring — for hover/press micro-interactions. Quick, barely overshoots. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
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

/** Spring-settled stagger child — for choreographed hero-style cascades. */
export const staggerItemGentle: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: springGentle },
};

/**
 * Entrance variety — new reveal variants so fade-up is no longer the only move.
 * Each is transform/opacity/clip-path only (GPU-composited, no layout cost) and
 * every consumer gates them behind reduced motion.
 */

/**
 * Image mask-reveal: a top-to-bottom clip wipe with a slight scale settle, for
 * photos. The clip means the image is present (no opacity flash on LCP-critical
 * art if you skip it there) but unveiled.
 */
export const maskReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)", scale: 1.04 },
  show: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/**
 * Line/clip reveal: a headline wipes up into view from a clipped baseline —
 * cleaner and more deliberate than a fade-up for titles.
 */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: "0.35em", clipPath: "inset(0 0 105% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 -15% 0)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Viewport config so reveals fire ~20% into view, once only. */
export const inViewport = { once: true, margin: "0px 0px -20% 0px" } as const;

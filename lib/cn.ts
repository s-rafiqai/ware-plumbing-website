import { clsx, type ClassValue } from "clsx";

/**
 * Compose class names conditionally.
 *
 * Deliberately clsx-only (no tailwind-merge): our theme adds custom utilities
 * such as `text-h1` and `bg-ink`, which tailwind-merge can mis-group and drop.
 * Style components via their `variant` props; use `className` for additive
 * layout tweaks (margins, widths), not to override a variant's colours.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

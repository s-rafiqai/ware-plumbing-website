import { cn } from "@/lib/cn";

interface LogoProps {
  /** Use the white-on-dark treatment (for the ink footer). */
  reversed?: boolean;
  className?: string;
}

/**
 * Placeholder logo lockup: a monochrome "W" monogram + "Ware Plumbing" wordmark.
 *
 * TODO: replace with the final Ware Plumbing logo asset (SVG preferred) when
 * supplied — see brief §9. The design system's "WG" mark is only a reference;
 * keep the clear-space (≈ mark height) and ink / reversed-white colour rules.
 */
export function Logo({ reversed, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "grid size-9 place-items-center rounded-sm text-lg font-extrabold",
          reversed ? "bg-white text-ink" : "bg-ink text-white",
        )}
      >
        W
      </span>
      <span
        className={cn(
          "text-h3 font-extrabold tracking-tight",
          reversed ? "text-white" : "text-ink",
        )}
      >
        Ware Plumbing
      </span>
    </span>
  );
}

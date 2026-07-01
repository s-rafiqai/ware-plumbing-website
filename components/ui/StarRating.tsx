import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface StarRatingProps {
  /** Rating out of `max`. */
  value: number;
  max?: number;
  className?: string;
}

/** Row of filled stars with an accessible label; icons themselves are decorative. */
export function StarRating({ value, max = 5, className }: StarRatingProps) {
  return (
    <span
      role="img"
      aria-label={`Rated ${value} out of ${max}`}
      className={cn("inline-flex gap-0.5 text-warning", className)}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className="size-4"
          fill={i < value ? "currentColor" : "none"}
          stroke={i < value ? "none" : "currentColor"}
        />
      ))}
    </span>
  );
}

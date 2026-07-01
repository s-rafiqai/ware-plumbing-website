import { cn } from "@/lib/cn";

/** Initials from a name: first letter of the first and last word (e.g. "Rhonda Smith" → "RS"). */
function initials(name: string): string {
  const words = name.replace(/[^\p{L}\s]/gu, "").trim().split(/\s+/);
  if (words.length === 0 || words[0] === "") return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : words[0][1] ?? "";
  return (first + last).toUpperCase();
}

interface AvatarProps {
  name: string;
  className?: string;
}

/**
 * Monogram avatar generated from a person's initials. Used for testimonials —
 * the quotes are real, but the faces on the old site were stock (brief §8), so
 * we never show a photo.
 */
export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full bg-blue-tint text-body font-semibold text-blue-dark",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: readonly string[];
  className?: string;
}

/** One copy of the list; the second copy (aria-hidden) makes the loop seamless. */
function MarqueeList({
  items,
  hidden,
}: {
  items: readonly string[];
  hidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-8 px-4 [&>li]:flex [&>li]:items-center [&>li]:gap-8"
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="text-body font-medium text-ink-soft">
          {item}
          <span aria-hidden className="size-1.5 rounded-full bg-blue" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Continuous horizontal marquee. Pure CSS (transform-only, GPU-friendly) so it
 * needs no client JS: it pauses on hover and sits static under reduced motion
 * via `motion-reduce`. The second list copy is aria-hidden so the text is
 * announced once.
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("marquee-mask group flex overflow-hidden", className)}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <MarqueeList items={items} />
        <MarqueeList items={items} hidden />
      </div>
    </div>
  );
}

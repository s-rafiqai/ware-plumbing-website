import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

// Real figures only (brief §1 + testimonials): 30+ years, the serviced suburbs,
// and the fact that every one of the nine reviews is five stars.
const STATS = [
  { value: 30, suffix: "+", label: "Years serving the community" },
  { value: SITE.suburbs.length, suffix: "", label: "South-East suburbs served" },
  { value: 5, suffix: "★", label: "Five stars on every review" },
];

/** A band of oversized counting numerals — lets the type scale flex mid-page. */
export function StatBand() {
  return (
    <Section
      aria-labelledby="stats-heading"
      className="relative overflow-hidden border-y border-line"
    >
      <h2 id="stats-heading" className="sr-only">
        Ware Plumbing by the numbers
      </h2>
      {/* Faint oversized cool halo behind the numerals — a depth layer, not a
          decoration you notice. Static; purely presentational. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="h-64 w-[46rem] max-w-full rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--color-blue-tint),transparent_70%)] opacity-70" />
      </div>
      <Reveal className="relative z-10">
        <dl className="grid gap-8 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(i > 0 && "sm:border-l sm:border-line sm:pl-8")}
            >
              <dt className="text-display-lg text-ink">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dt>
              <dd className="mt-2 text-body text-grey">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

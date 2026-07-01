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
    <Section aria-labelledby="stats-heading" className="border-y border-line">
      <h2 id="stats-heading" className="sr-only">
        Ware Plumbing by the numbers
      </h2>
      <Reveal>
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

import { Section, SectionHeading } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";
import { cn } from "@/lib/cn";

// One quote is pulled out large; the rest support it in a compact grid.
const FEATURED_NAME = "Joanne Guinane";
const featured =
  TESTIMONIALS.find((t) => t.name === FEATURED_NAME) ?? TESTIMONIALS[0];
const supporting = TESTIMONIALS.filter((t) => t !== featured);

/** Testimonials with hierarchy: a large featured pull-quote + a supporting set. */
export function Testimonials() {
  return (
    <Section space="spacious" aria-labelledby="testimonials-heading">
      <SectionHeading
        animate
        id="testimonials-heading"
        eyebrow="Our happy customers"
        title="Trusted by families, schools and agents"
      />

      {/* Featured pull-quote — the type flexes here, layered over an oversized
          faint brand-blue quote glyph for depth. */}
      <Reveal className="mt-10">
        <figure className="relative overflow-hidden rounded-md bg-surface-2 p-8 shadow-md lg:p-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-3 -top-24 select-none font-serif text-[18rem] leading-none text-blue/10"
          >
            &ldquo;
          </span>
          <div className="relative z-10">
            <StarRating value={featured.rating} />
            <blockquote className="mt-6 text-h1 text-ink lg:text-display text-balance">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <Avatar name={featured.name} />
              <div>
                <div className="text-body font-semibold text-ink">
                  {featured.name}
                </div>
                {featured.company && (
                  <div className="text-small text-ink-soft">
                    {featured.company}
                  </div>
                )}
              </div>
            </figcaption>
          </div>
        </figure>
      </Reveal>

      {/* Supporting set — even cards drift down a touch on wide screens so the
          row reads as a composed cluster, not a flat strip. */}
      <RevealGroup
        as="ul"
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {supporting.map((testimonial, i) => (
          <RevealItem
            as="li"
            key={testimonial.name}
            className={cn(i % 2 === 1 && "lg:translate-y-6")}
          >
            <TestimonialCard testimonial={testimonial} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

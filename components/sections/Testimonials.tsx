import { Section, SectionHeading } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";

// One quote is pulled out large; the rest support it in a compact grid.
const FEATURED_NAME = "Joanne Guinane";
const featured =
  TESTIMONIALS.find((t) => t.name === FEATURED_NAME) ?? TESTIMONIALS[0];
const supporting = TESTIMONIALS.filter((t) => t !== featured);

/** Testimonials with hierarchy: a large featured pull-quote + a supporting set. */
export function Testimonials() {
  return (
    <Section space="spacious" aria-labelledby="testimonials-heading">
      <Reveal>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Our happy customers"
          title="Trusted by families, schools and agents"
        />
      </Reveal>

      {/* Featured pull-quote — the type flexes here. */}
      <Reveal className="mt-10">
        <figure className="rounded-md bg-surface p-8 lg:p-14">
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
                <div className="text-small text-ink-soft">{featured.company}</div>
              )}
            </div>
          </figcaption>
        </figure>
      </Reveal>

      {/* Supporting set. */}
      <RevealGroup
        as="ul"
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {supporting.map((testimonial) => (
          <RevealItem as="li" key={testimonial.name}>
            <TestimonialCard testimonial={testimonial} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

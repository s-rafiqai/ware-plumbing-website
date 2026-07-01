import { Section, SectionHeading } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";

/** "What our customers say" — the real testimonials in a responsive grid. */
export function Testimonials() {
  return (
    <Section aria-labelledby="testimonials-heading">
      <Reveal>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Our happy customers"
          title="Trusted by families, schools and agents"
          intro="Real words from the people and businesses we look after across Melbourne's South East."
        />
      </Reveal>
      <RevealGroup
        as="ul"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TESTIMONIALS.map((testimonial) => (
          <RevealItem as="li" key={testimonial.name}>
            <TestimonialCard testimonial={testimonial} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

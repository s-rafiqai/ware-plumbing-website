import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SERVICES } from "@/content/services";

/**
 * Services grid — a uniform, even grid of service cards (all the same size).
 * Cards use the brand glyphs and lift with an outward arrow on hover.
 */
export function ServicesGrid() {
  return (
    <Section muted aria-labelledby="services-heading">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <SectionHeading
          animate
          id="services-heading"
          eyebrow="What we do"
          title="Plumbing services, big or small"
          intro="Our qualified technicians consistently go above and beyond to make sure each job is done the right way, the first time."
        />
        <Reveal className="hidden sm:block">
          <Button href="/services" variant="ghost" arrow>
            All services
          </Button>
        </Reveal>
      </div>

      <RevealGroup
        as="ul"
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <RevealItem as="li" key={service.slug}>
            <ServiceCard service={service} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

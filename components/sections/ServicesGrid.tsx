import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SERVICES } from "@/content/services";

/**
 * Services as a bento: the first service is a large feature card and the rest
 * fill around it, so the block reads as a composed layout rather than a flat
 * even grid. Cards use the brand glyphs and lift with an outward arrow on hover.
 */
export function ServicesGrid() {
  const [feature, ...rest] = SERVICES;
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
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense"
      >
        <RevealItem
          as="li"
          className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
        >
          <ServiceCard service={feature} featured />
        </RevealItem>
        {rest.map((service) => (
          <RevealItem as="li" key={service.slug}>
            <ServiceCard service={service} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

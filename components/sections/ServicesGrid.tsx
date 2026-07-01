import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SERVICES } from "@/content/services";

/** Homepage services grid: intro + the seven service cards on a muted background. */
export function ServicesGrid() {
  return (
    <Section muted aria-labelledby="services-heading">
      <Reveal>
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Plumbing services, big or small"
          intro="Our qualified technicians consistently go above and beyond to make sure each job is done the right way, the first time. You can always count on us to go the extra mile."
        />
      </Reveal>
      <RevealGroup
        as="ul"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <RevealItem as="li" key={service.slug}>
            <ServiceCard service={service} />
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-10">
        <Button href="/services" variant="ghost">
          See all services
        </Button>
      </Reveal>
    </Section>
  );
}

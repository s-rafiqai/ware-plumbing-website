import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { FullBleedImage } from "@/components/ui/FullBleedImage";
import { ContactCta } from "@/components/sections/ContactCta";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceGlyph } from "@/components/ServiceIcon";
import { SERVICES } from "@/content/services";
import { PRIMARY_CTA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Water leaks, blocked drains, taps and toilets, gas fitting, hot water systems, burst pipes and roofing — professional plumbing across Melbourne's South East.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="A full line of plumbing services"
        intro="Our qualified technicians consistently go above and beyond to make sure each job is done the right way, the first time. You can always count on us to go the extra mile."
      />

      {/* Full-bleed photographic band (reuses the existing tagline as its line). */}
      <FullBleedImage
        src="/assets/photos/roofing.jpg"
        alt="" /* decorative — the overlaid line carries meaning */
        scale
        scrim
        minHeightClassName="min-h-[380px] md:min-h-[460px]"
      >
        <Container className="w-full pb-10 pt-24 md:pb-14">
          <div className="max-w-xl">
            <p className="text-small font-semibold uppercase tracking-wide text-blue">
              Plumbing &amp; roofing
            </p>
            <p className="mt-3 text-h1 text-white text-balance">
              {SITE.tagline}.
            </p>
            <Button href={PRIMARY_CTA.href} size="lg" className="mt-7">
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </Container>
      </FullBleedImage>

      <Section>
        <div className="divide-y divide-line">
          {SERVICES.map((service) => (
            <Reveal key={service.slug} className="py-10 first:pt-0 last:pb-0">
              <article
                id={service.slug}
                className="scroll-mt-28 grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-sm bg-blue-tint">
                    <ServiceGlyph name={service.icon} className="size-6" />
                  </span>
                  <h2 className="text-h2 text-ink text-balance">
                    {service.title}
                  </h2>
                </div>
                <div className="max-w-2xl">
                  <p className="text-body text-ink-soft text-pretty">
                    {service.description}
                  </p>
                  <Button href="/contact" variant="ghost" arrow className="mt-4">
                    Get a quote
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ContactCta } from "@/components/sections/ContactCta";
import { SERVICE_ICONS } from "@/components/ServiceIcon";
import { SERVICES } from "@/content/services";

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

      <Section>
        <div className="divide-y divide-line">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 py-10 first:pt-0 last:pb-0"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-sm bg-blue-tint text-blue">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <h2 className="text-h2 text-ink text-balance">{service.title}</h2>
                  </div>
                  <div className="max-w-2xl">
                    <p className="text-body text-ink-soft text-pretty">
                      {service.description}
                    </p>
                    <Button href="/contact" variant="ghost" className="mt-4">
                      Get a quote
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}

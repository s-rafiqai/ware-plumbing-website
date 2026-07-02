import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBand } from "@/components/sections/StatBand";
import { ContactCta } from "@/components/sections/ContactCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { WHY_CHOOSE } from "@/content/trust";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ware Plumbing is a family-run team of licensed plumbers serving Melbourne's South East for over 30 years. Honest, transparent and guaranteed work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Qualified plumbers for all your needs"
        intro="We're a family-run team of professional, licensed plumbers who have served Melbourne's South East for over 30 years."
      />

      {/* Story — overlapping photo + offset text card (the page's designed moment). */}
      <Section space="spacious" aria-labelledby="story-heading">
        <div className="lg:grid lg:grid-cols-12 lg:items-center">
          <Reveal variant="mask" className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-lg">
              <Image
                src="/assets/photos/roofing.jpg"
                alt="Ware Plumbing carrying out roofing work."
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal
            y={28}
            delay={0.1}
            className="relative z-10 -mt-10 lg:col-span-6 lg:col-start-7 lg:-ml-12 lg:mt-0"
          >
            <div className="rounded-md border border-line surface-sheen p-8 shadow-lg lg:p-10">
              <h2 id="story-heading" className="text-h2 text-ink text-balance">
                The friendly, neighbourhood plumber you&rsquo;ve been looking for
              </h2>
              <div className="mt-5 space-y-4 text-body text-ink-soft text-pretty">
                <p>
                  We guarantee the work we do, and believe transparency and
                  honesty are the most important parts of our relationship with
                  our customers.
                </p>
                <p>
                  Whether you need a quick and simple fix or an extensive repair
                  or replacement, we have the experience and expertise to make it
                  happen. As a family living in your community, we&rsquo;ve served
                  your family for over 30 years — any way we can — to make sure
                  your home or business runs safely and smoothly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <StatBand />

      {/* Mission */}
      <Section muted aria-labelledby="mission-heading">
        <div className="max-w-3xl">
          <SectionHeading
            animate
            id="mission-heading"
            eyebrow="Our mission"
            title="Recognised and respected home-service professionals"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 text-lead text-ink-soft text-pretty">
              Ware Plumbing&rsquo;s goal is to become the most recognised and
              respected home-service professionals for consumers in Australia.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Why choose us */}
      <Section aria-labelledby="why-heading">
        <SectionHeading
          animate
          id="why-heading"
          eyebrow="Why choose us"
          title="We genuinely want to provide the best service we can"
          intro="On every level. We always aim to keep our customers happy, satisfied and ready to stay with us for years to come."
        />
        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
          {WHY_CHOOSE.map((item) => (
            <RevealItem
              as="li"
              key={item}
              className="flex items-center gap-3 rounded-md border border-line surface-sheen px-5 py-4 shadow-sm"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-tint text-blue">
                <Check aria-hidden className="size-4" />
              </span>
              <span className="text-body text-ink">{item}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <ContactCta />
    </>
  );
}

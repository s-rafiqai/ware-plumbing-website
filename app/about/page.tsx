import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/sections/ContactCta";
import { WHY_CHOOSE } from "@/content/trust";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ware Plumbing is a family-run team of licensed plumbers serving Melbourne's South East for over 30 years. Honest, transparent and guaranteed work.",
  alternates: { canonical: "/about" },
};

const STATS = [
  { value: "30+", label: "Years serving the community" },
  { value: `${SITE.suburbs.length}`, label: "South East suburbs covered" },
  { value: "Licensed", label: "Professional, guaranteed work" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Qualified plumbers for all your needs"
        intro="We're a family-run team of professional, licensed plumbers who have served Melbourne's South East for over 30 years."
      />

      {/* Story */}
      <Section aria-labelledby="story-heading">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="max-w-2xl">
            <h2 id="story-heading" className="text-h2 text-ink text-balance">
              The friendly, neighbourhood plumber you&rsquo;ve been looking for
            </h2>
            <div className="mt-5 space-y-4 text-body text-ink-soft text-pretty">
              <p>
                We guarantee the work we do, and believe transparency and honesty
                are the most important parts of our relationship with our
                customers.
              </p>
              <p>
                Whether you need a quick and simple fix or an extensive repair or
                replacement, we have the experience and expertise to make it
                happen. As a family living in your community, we&rsquo;ve served
                your family for over 30 years — any way we can — to make sure your
                home or business runs safely and smoothly.
              </p>
            </div>
          </div>

          {/* Stats */}
          <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-line bg-white p-6"
              >
                <dt className="text-h2 font-extrabold tracking-tight text-blue">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-body text-ink-soft">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Mission */}
      <Section muted aria-labelledby="mission-heading">
        <div className="max-w-3xl">
          <SectionHeading
            id="mission-heading"
            eyebrow="Our mission"
            title="Recognised and respected home-service professionals"
          />
          <p className="mt-5 text-h3 font-normal text-ink-soft text-pretty">
            Ware Plumbing&rsquo;s goal is to become the most recognised and
            respected home-service professionals for consumers in Australia.
          </p>
        </div>
      </Section>

      {/* Why choose us */}
      <Section aria-labelledby="why-heading">
        <SectionHeading
          id="why-heading"
          eyebrow="Why choose us"
          title="We genuinely want to provide the best service we can"
          intro="On every level. We always aim to keep our customers happy, satisfied and ready to stay with us for years to come."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {WHY_CHOOSE.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-md border border-line bg-white px-5 py-4"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-tint text-blue">
                <Check aria-hidden className="size-4" />
              </span>
              <span className="text-body text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}

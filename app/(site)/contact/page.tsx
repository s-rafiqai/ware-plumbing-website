import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Smartphone, Mail, MapPin, Clock, CalendarClock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BOOK_CTA, isPlaceholder, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Contact Ware Plumbing on 03 9790 5550 or send an enquiry online. Servicing Melbourne's South East — we'll get back to you promptly.",
  alternates: { canonical: "/contact" },
};

const CONTACT_ROWS = [
  { icon: Phone, label: "Call us", value: SITE.phone.display, href: SITE.phone.href },
  { icon: Smartphone, label: "Mobile", value: SITE.mobile.display, href: SITE.mobile.href },
  { icon: Mail, label: "Email", value: SITE.email.display, href: SITE.email.href },
];

export default function ContactPage() {
  const hoursKnown = !isPlaceholder(SITE.hours);
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Get in touch"
        intro="To schedule an appointment, call us on 03 9790 5550 or submit an enquiry online. Our friendly team in Melbourne's South East will get back to you promptly to sort out what you need."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Details + photographic panel */}
          <Reveal>
            <h2 className="text-h3 text-ink">Contact details</h2>
            <ul className="mt-5 space-y-4">
              {CONTACT_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <li key={row.label} className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-blue-tint text-blue">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block text-small text-grey">{row.label}</span>
                      <a
                        href={row.href}
                        className="text-body font-medium text-ink hover:text-blue"
                      >
                        {row.value}
                      </a>
                    </span>
                  </li>
                );
              })}
              <li className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-blue-tint text-blue">
                  <MapPin aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-small text-grey">Service area</span>
                  <span className="text-body font-medium text-ink">
                    Melbourne South East
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-blue-tint text-blue">
                  <Clock aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-small text-grey">Hours</span>
                  {/* TODO: business hours pending (brief §9). */}
                  <span className="text-body font-medium text-ink">
                    {hoursKnown ? SITE.hours : "To be confirmed"}
                  </span>
                </span>
              </li>
            </ul>

            {/* Online booking is now live (the /book funnel). */}
            <div className="mt-8 rounded-md border border-line bg-blue-tint p-6">
              <div className="flex items-start gap-3">
                <CalendarClock aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
                <div>
                  <h3 className="text-h3 text-ink">Book online in under a minute</h3>
                  <p className="mt-1 text-body text-ink-soft text-pretty">
                    Pick a service and a time that suits — no phone tag.
                  </p>
                </div>
              </div>
              <Button href={BOOK_CTA.href} className="mt-4 w-full sm:w-auto">
                {BOOK_CTA.label}
              </Button>
            </div>

            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-md shadow-md">
              <Image
                src="/assets/photos/hero-plumber.png"
                alt="" /* decorative */
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal
            delay={0.1}
            className="h-max rounded-md border border-line surface-sheen p-6 shadow-md sm:p-8"
          >
            <h2 className="text-h3 text-ink">Get a free quote</h2>
            <p className="mt-2 text-body text-ink-soft">
              Send us a few details and we&rsquo;ll get back to you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

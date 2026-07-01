import type { Metadata } from "next";
import { Phone, Smartphone, Mail, MapPin, Clock, CalendarClock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { isPlaceholder, SITE } from "@/lib/site";

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
          {/* Details */}
          <div>
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

            {/* Booking anchor — brief §5 references an online booking enquiry. */}
            {/* TODO: embed the booking widget here in the form-container style once details land. */}
            <div className="mt-8 flex gap-3 rounded-md border border-line bg-surface p-5">
              <CalendarClock aria-hidden className="size-5 shrink-0 text-blue" />
              <p className="text-small text-ink-soft text-pretty">
                <span className="font-semibold text-ink">Online booking is coming soon.</span>{" "}
                For now, call us or send the form and we&rsquo;ll be in touch
                promptly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-h3 text-ink">Get a free quote</h2>
            <p className="mt-2 text-body text-ink-soft">
              Send us a few details and we&rsquo;ll get back to you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

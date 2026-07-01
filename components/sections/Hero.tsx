import { Check, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { isPlaceholder, PRIMARY_CTA, SITE } from "@/lib/site";

const HIGHLIGHTS = [
  "Licensed plumbers",
  "Emergency service",
  "Guaranteed work",
  "Seniors discount",
];

/** Homepage hero: positioning headline + CTAs on the left, a "call now" card right. */
export function Hero() {
  const hoursKnown = !isPlaceholder(SITE.hours);
  return (
    <Section className="lg:pt-24" aria-labelledby="hero-heading">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div>
          <p className="text-small font-semibold uppercase tracking-wide text-blue">
            Melbourne&rsquo;s South East · 30+ years
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-h1 text-ink sm:text-display text-balance"
          >
            Your trusted choice for all plumbing works
          </h1>
          <p className="mt-5 max-w-xl text-h3 font-normal text-ink-soft text-pretty">
            Family-run and serving the community for over 30 years — from a
            dripping tap to a burst pipe, no job is too big or small.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
            <Button href={SITE.phone.href} variant="outline">
              Call {SITE.phone.display}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-body text-ink-soft">
                <Check aria-hidden className="size-4 shrink-0 text-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Call-now card */}
        <div className="rounded-md border border-line bg-white p-8 shadow-md">
          <p className="text-small font-semibold uppercase tracking-wide text-grey">
            Call now
          </p>
          <a
            href={SITE.phone.href}
            className="mt-2 block text-h2 font-extrabold tracking-tight text-ink hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 rounded-sm"
          >
            {SITE.phone.display}
          </a>
          <p className="mt-2 text-body text-ink-soft">
            We&rsquo;re ready to help across Melbourne&rsquo;s South East.
          </p>

          <dl className="mt-6 space-y-3 border-t border-line pt-6 text-body">
            <div className="flex justify-between gap-4">
              <dt className="text-grey">Mobile</dt>
              <dd>
                <a href={SITE.mobile.href} className="text-ink hover:text-blue">
                  {SITE.mobile.display}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-grey">Email</dt>
              <dd>
                <a href={SITE.email.href} className="text-ink hover:text-blue">
                  {SITE.email.display}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-grey">Hours</dt>
              {/* TODO: business hours pending (brief §9). */}
              <dd className="text-ink">{hoursKnown ? SITE.hours : "To be confirmed"}</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-2 text-small text-ink-soft">
            <MapPin aria-hidden className="size-4 shrink-0 text-grey" />
            {SITE.suburbs.slice(0, 4).join(" · ")} &amp; more
          </div>

          <Button href={PRIMARY_CTA.href} className="mt-6 w-full">
            {PRIMARY_CTA.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}

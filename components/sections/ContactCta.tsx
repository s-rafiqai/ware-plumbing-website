import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA, SITE } from "@/lib/site";

/**
 * Conversion band above the footer: a dark panel with the primary actions and
 * the service-area suburbs. (Replaces the old generic map pin — there's no real
 * street address yet; brief §9.)
 */
export function ContactCta() {
  return (
    <Section aria-labelledby="cta-heading">
      <div className="rounded-md bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="cta-heading" className="text-h2 text-white text-balance">
            Need a plumber in Melbourne&rsquo;s South East?
          </h2>
          <p className="mt-4 text-body text-white/70 text-pretty">
            Call us or send a message and our team will get back to you promptly
            to sort out your plumbing — big or small.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
            <Button href={SITE.phone.href} variant="outline">
              Call {SITE.phone.display}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {SITE.suburbs.map((suburb) => (
              <li
                key={suburb}
                className="rounded-pill border border-white/15 px-3 py-1 text-small text-white/70"
              >
                {suburb}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

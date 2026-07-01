import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PRIMARY_CTA, SITE } from "@/lib/site";

/**
 * Conversion band above the footer: a contained dark panel with the primary
 * actions — the light-theme bookend to the dark hero. Service-area suburbs now
 * live in the marquee just above, so they're not repeated here.
 */
export function ContactCta() {
  return (
    <Section aria-labelledby="cta-heading">
      <Reveal className="rounded-md bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
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
        </div>
      </Reveal>
    </Section>
  );
}

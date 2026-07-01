import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BOOK_CTA, SITE } from "@/lib/site";

/** Mid-page conversion band pointing at the booking funnel. */
export function BookCtaBand() {
  return (
    <Section space="tight">
      <Reveal>
        <div className="flex flex-col items-start gap-6 rounded-md bg-blue-tint px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h2 className="text-h2 text-ink text-balance">
              Book your plumber online in under a minute
            </h2>
            <p className="mt-2 text-body text-ink-soft">
              Pick a service, verify your mobile, done — or call{" "}
              <a href={SITE.phone.href} className="font-medium text-blue hover:text-blue-dark">
                {SITE.phone.display}
              </a>
              .
            </p>
          </div>
          <Button href={BOOK_CTA.href} size="lg" arrow className="shrink-0">
            {BOOK_CTA.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

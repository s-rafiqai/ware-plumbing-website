import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA, SITE } from "@/lib/site";

/**
 * Placeholder home page. Confirms the shell (header, footer, tokens) and shows
 * the button variants. The real homepage is built in Phase 3.
 */
export default function Home() {
  return (
    <Container className="flex flex-1 flex-col justify-center py-24">
      <div className="max-w-2xl">
        <p className="text-small font-semibold uppercase tracking-wide text-blue">
          Site shell ready
        </p>
        <h1 className="mt-3 text-h1 text-ink sm:text-display text-balance">
          Professional and affordable plumbing across Melbourne&rsquo;s South East
        </h1>
        <p className="mt-5 max-w-prose text-h3 font-normal text-ink-soft">
          {SITE.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
          <Button href={SITE.phone.href} variant="outline">
            Call {SITE.phone.display}
          </Button>
          <Button href="/services" variant="ghost">
            View our services
          </Button>
        </div>
      </div>
    </Container>
  );
}

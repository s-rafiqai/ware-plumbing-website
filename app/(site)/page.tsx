import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatBand } from "@/components/sections/StatBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";
import { Marquee } from "@/components/ui/Marquee";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ServicesGrid />
      <StatBand />
      <Testimonials />

      {/* Service-area marquee (signature #3) — full-bleed, suburbs auto-scroll. */}
      <section
        aria-labelledby="area-heading"
        className="border-y border-line bg-surface py-8"
      >
        <Container>
          <h2
            id="area-heading"
            className="text-center text-small font-semibold uppercase tracking-wide text-grey"
          >
            Proudly serving Melbourne&rsquo;s South East
          </h2>
        </Container>
        <div className="mt-5">
          <Marquee items={SITE.suburbs} />
        </div>
      </section>

      <ContactCta />
    </>
  );
}

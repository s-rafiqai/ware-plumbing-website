import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ServicesGrid />
      <Testimonials />
      <ContactCta />
    </>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Services" };

// Placeholder route so navigation works; real content lands in a later phase.
export default function ServicesPage() {
  return (
    <Container className="py-24">
      <p className="text-small font-semibold uppercase tracking-wide text-blue">
        Coming soon
      </p>
      <h1 className="mt-3 text-h1 text-ink">Our services</h1>
      <p className="mt-4 max-w-prose text-body text-ink-soft">
        This page is being built in a later phase.
      </p>
    </Container>
  );
}

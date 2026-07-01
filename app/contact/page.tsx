import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Get in touch" };

// Placeholder route so navigation works; real content lands in a later phase.
export default function ContactPage() {
  return (
    <Container className="py-24">
      <p className="text-small font-semibold uppercase tracking-wide text-blue">
        Coming soon
      </p>
      <h1 className="mt-3 text-h1 text-ink">Get in touch</h1>
      <p className="mt-4 max-w-prose text-body text-ink-soft">
        This page is being built in a later phase.
      </p>
    </Container>
  );
}

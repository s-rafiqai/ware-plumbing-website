import Link from "next/link";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { DemoRibbon } from "@/components/book/DemoRibbon";
import { SITE } from "@/lib/site";

/**
 * Minimal funnel chrome — logo + click-to-call only, no marketing nav/footer,
 * so the booking flow stays focused. The demo ribbon sits top-right.
 */
export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <header className="border-b border-line bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label="Ware Plumbing & Roofing — home"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <Logo />
          </Link>
          <a
            href={SITE.phone.href}
            className="inline-flex items-center gap-2 rounded-pill border border-line px-3.5 py-2 text-small font-semibold text-ink transition-colors hover:border-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <Phone aria-hidden className="size-4 text-blue" />
            <span className="hidden sm:inline">{SITE.phone.display}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </Container>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <DemoRibbon />
    </div>
  );
}

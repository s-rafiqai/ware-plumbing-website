import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { Phone, Smartphone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { BOOK_CTA, isPlaceholder, NAV_LINKS, SITE } from "@/lib/site";

/** Brand glyphs (Feather-style) — lucide dropped brand icons, so inline them. */
function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const SOCIAL_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Facebook: FacebookGlyph,
  Instagram: InstagramGlyph,
};

/** Small heading above each footer column. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-small font-semibold uppercase tracking-wide text-white/60">
      {children}
    </h2>
  );
}

/**
 * Dark (ink) site footer with the reversed logo: brand blurb + socials, quick
 * links, contact details, and a trust/service-area column, over a legal bar.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + socials */}
          <div className="space-y-4">
            <Logo variant="lockup" reversed />
            <p className="max-w-xs text-body text-white/70">
              Family-run plumbing serving Melbourne&rsquo;s South East for over 30
              years. Reliable, professional and local.
            </p>
            <ul className="flex gap-3">
              {SITE.socials.map((social) => {
                const Glyph = SOCIAL_GLYPHS[social.label];
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${SITE.name} on ${social.label}`}
                      className="grid size-10 place-items-center rounded-sm border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      {Glyph ? (
                        <Glyph aria-hidden className="size-5" />
                      ) : (
                        <span className="text-small">{social.label}</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="space-y-4">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-2.5">
              {[...NAV_LINKS, BOOK_CTA].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="space-y-2.5 text-body text-white/70">
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden className="size-4 shrink-0 text-white/50" />
                <a href={SITE.phone.href} className="hover:text-white">
                  {SITE.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Smartphone aria-hidden className="size-4 shrink-0 text-white/50" />
                <a href={SITE.mobile.href} className="hover:text-white">
                  {SITE.mobile.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden className="size-4 shrink-0 text-white/50" />
                <a href={SITE.email.href} className="hover:text-white">
                  {SITE.email.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin aria-hidden className="size-4 shrink-0 text-white/50" />
                <span>Melbourne South East</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock aria-hidden className="size-4 shrink-0 text-white/50" />
                {/* TODO: business hours — replace SITE.hours placeholder (brief §9). */}
                <span>{isPlaceholder(SITE.hours) ? "Hours to be confirmed" : SITE.hours}</span>
              </li>
            </ul>
          </div>

          {/* Trust / service area */}
          <div className="space-y-4">
            <ColumnHeading>Service area</ColumnHeading>
            <p className="text-body text-white/70">
              Trusted across {SITE.suburbs.slice(0, -1).join(", ")} and{" "}
              {SITE.suburbs[SITE.suburbs.length - 1]}.
            </p>
            <Button href={BOOK_CTA.href} variant="primary" size="sm">
              {BOOK_CTA.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-small text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Ware Plumbing. All rights reserved.</p>
          <p>
            {/* TODO: ABN + licence number — replace placeholders (brief §9). */}
            ABN {isPlaceholder(SITE.abn) ? "to be confirmed" : SITE.abn}
            {" · "}
            Licence {isPlaceholder(SITE.licenceNo) ? "to be confirmed" : SITE.licenceNo}
          </p>
        </Container>
      </div>
    </footer>
  );
}

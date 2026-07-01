"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Site header: wordmark left, centred links, outlined pill action right.
 * Sticky, gaining a subtle bottom border once the page scrolls. Collapses to a
 * toggle menu below the `md` breakpoint.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Add the bottom border/shadow only once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow",
        scrolled ? "border-b border-line shadow-sm" : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Left: wordmark */}
          <div className="flex justify-start">
            <Link
              href="/"
              aria-label="Ware Plumbing — home"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              <Logo />
            </Link>
          </div>

          {/* Centre: primary links (desktop) */}
          <nav
            aria-label="Primary"
            className="hidden md:flex md:justify-center md:gap-8"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-sm text-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                    active
                      ? "font-semibold text-ink"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: action + mobile toggle */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden md:block">
              <Button href={PRIMARY_CTA.href} variant="outline" pill>
                {PRIMARY_CTA.label}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-sm text-ink md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-line bg-white md:hidden"
        >
          <Container>
            {/* Close the menu when any link inside is activated (event delegation). */}
            <ul className="flex flex-col py-2" onClick={() => setOpen(false)}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-sm px-2 py-3 text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue",
                        active ? "font-semibold text-ink" : "text-ink-soft",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="px-2 py-3">
                <Button href={PRIMARY_CTA.href} variant="primary" className="w-full">
                  {PRIMARY_CTA.label}
                </Button>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}

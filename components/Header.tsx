"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/site";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

// Desktop nav link with an animated underline that grows from the left on hover
// and stays put when the link is active. Sentence-case, per the design system.
const navLinkClass =
  "relative rounded-sm py-1 text-body transition-colors focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 " +
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full " +
  "after:bg-blue after:transition-transform after:duration-200 after:ease-out-expo " +
  "motion-reduce:after:transition-none";

/**
 * Site header: wordmark left, centred links, outlined pill action right.
 * Sticky, gaining a subtle bottom border once the page scrolls. Collapses to a
 * toggle menu below the `md` breakpoint.
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
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
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              <Logo priority />
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
                    navLinkClass,
                    // Underline: present (scale-x-100) when active, grows from
                    // 0 on hover otherwise.
                    active
                      ? "font-semibold text-ink after:scale-x-100"
                      : "text-ink-soft hover:text-ink after:scale-x-0 hover:after:scale-x-100",
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

      {/* Mobile menu panel — animated open/close (height + fade). */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            className="overflow-hidden border-t border-line bg-white md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.28, ease: EASE_OUT_EXPO }
            }
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
                          "block rounded-sm px-2 py-3 text-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue",
                          active ? "font-semibold text-ink" : "text-ink-soft hover:text-ink",
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA, SITE } from "@/lib/site";
import { EASE_OUT_EXPO } from "@/lib/motion";

const HIGHLIGHTS = [
  "Licensed plumbers",
  "Emergency service",
  "Guaranteed work",
  "Seniors discount",
];

/**
 * Homepage hero — the single most important moment on the site.
 *
 * Asymmetric: a dominant headline column on the left, a layered photo on the
 * right (offset accent panel behind, overlapping stat badge in front). On
 * scroll the photo scales subtly (Ken-Burns) for depth. Entrance is tuned for
 * LCP: the headline slides without fading and the photo never fades, so the
 * largest paint isn't gated behind JS. All motion is disabled under
 * prefers-reduced-motion.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const scale = reduce ? 1 : rawScale;

  // Slide-only for the headline (opacity stays 1 → LCP-safe); fade+rise for the
  // supporting elements, which aren't the largest paint.
  const headline = reduce
    ? {}
    : {
        initial: { y: 18 },
        animate: { y: 0 },
        transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.05 },
      };
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
        };

  return (
    <section className="overflow-x-clip py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div>
            {/* Brand lockup — modest, reads as a mark, not a second header. */}
            <motion.div {...rise(0)} className="mb-6">
              {/* Decorative: the header home-link already names the business,
                  so this instance is alt="" to avoid a double announcement. */}
              <Image
                src="/assets/logo/logo-full-lockup.png"
                alt=""
                width={2030}
                height={974}
                priority
                sizes="200px"
                className="h-auto w-[150px] sm:w-[176px] lg:w-[200px]"
              />
            </motion.div>
            <motion.p
              {...rise(0.05)}
              className="text-small font-semibold uppercase tracking-wide text-blue"
            >
              Melbourne&rsquo;s South East · 30+ years
            </motion.p>
            <motion.h1
              {...headline}
              className="mt-4 text-display text-ink lg:text-display-lg text-balance"
            >
              Your trusted choice for all plumbing works
            </motion.h1>
            <motion.p
              {...rise(0.15)}
              className="mt-5 max-w-xl text-lead text-ink-soft text-pretty"
            >
              Family-run and serving the community for over 30 years — from a
              dripping tap to a burst pipe, no job is too big or small.
            </motion.p>

            <motion.div
              {...rise(0.25)}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button href={PRIMARY_CTA.href} size="lg">
                {PRIMARY_CTA.label}
              </Button>
              <Button href={SITE.phone.href} variant="outline" size="lg">
                Call {SITE.phone.display}
              </Button>
            </motion.div>

            <motion.ul
              {...rise(0.35)}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-body text-ink-soft">
                  <Check aria-hidden className="size-4 shrink-0 text-blue" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Layered photo */}
          <div className="relative">
            {/* Offset accent panel behind, for depth. */}
            <div
              aria-hidden
              className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-md bg-blue-tint"
            />
            <div
              ref={frameRef}
              className="relative aspect-[4/3] overflow-hidden rounded-md shadow-lg"
            >
              <motion.div style={{ scale }} className="absolute inset-0">
                <Image
                  src="/assets/photos/hero-plumber.png"
                  alt="A Ware Plumbing plumber on the job."
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>

            {/* Overlapping stat badge, in front of the photo. */}
            <motion.div
              {...rise(0.4)}
              className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3 shadow-lg sm:left-6"
            >
              <span className="text-h2 font-extrabold tracking-tight text-blue">30+</span>
              <span className="text-small text-ink-soft">
                years serving
                <br />
                Melbourne&rsquo;s South East
              </span>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

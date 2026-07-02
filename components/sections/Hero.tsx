"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { FullBleedImage } from "@/components/ui/FullBleedImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, staggerItemGentle } from "@/lib/motion";
import { BOOK_CTA, SITE } from "@/lib/site";

/**
 * Homepage hero — the single dark full-bleed photographic moment (signature #1).
 * The plumber photo covers the viewport under a bottom-weighted slate scrim; the
 * brand lockup, headline and CTAs sit over it, bottom-left.
 *
 * Choreography: the image scales and the whole overlay drifts on scroll (two
 * parallax tracks, in FullBleedImage), while the supporting elements (eyebrow →
 * subhead → CTAs) cascade in on a gentle spring. The logo and the H1 are the
 * paint-critical elements and stay STATIC — never gated behind JS, no CLS.
 */
export function Hero() {
  const reduce = useReducedMotion();

const logo = (
  <Image
    src="/assets/logo/logo-full-lockup.png"
    alt="Ware Plumbing & Roofing"
    width={2030}
    height={974}
    priority
    sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 260px"
    className="h-auto w-[260px] drop-shadow-sm sm:w-[340px] lg:w-[420px]"
  />
);
  const eyebrow = (
    <p className="mt-6 text-small font-semibold uppercase tracking-wide text-blue">
      Melbourne&rsquo;s South East · 30+ years
    </p>
  );
  const headline = (
    <h1 className="mt-4 text-display text-white lg:text-display-lg text-balance">
      Your trusted choice for all plumbing works
    </h1>
  );
  const subhead = (
    <p className="mt-5 max-w-xl text-lead text-white/85 text-pretty">
      Family-run and serving the community for over 30 years - from a dripping tap
      to a burst pipe, no job is too big or small.
    </p>
  );
  const ctas = (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <Button href={BOOK_CTA.href} size="lg">
        Book a service
      </Button>
      <Button href={SITE.phone.href} variant="outline" size="lg">
        Call {SITE.phone.display}
      </Button>
    </div>
  );

  return (
    <FullBleedImage
      src="/assets/photos/homepagebackground.png"
      alt="" /* decorative — the headline names the business */
      priority
      scale
      parallax
      scrim
      sizes="100vw"
      /* Subject sits centre-right; the text block is bottom-left. Bias the crop
         left on mobile (keeps text over the dark navy area), centre on desktop
         (where little is cropped and the full composition shows). */
      imageClassName="object-left md:object-center"
    >
      <Container className="w-full pb-14 pt-16 md:pb-20 md:pt-20">
        {reduce ? (
          <div className="max-w-2xl">
            {logo}
            {eyebrow}
            {headline}
            {subhead}
            {ctas}
          </div>
        ) : (
          // Supporting elements cascade on one track; logo + H1 stay static
          // (paint-critical) as plain children the stagger simply skips.
          <motion.div
            className="max-w-2xl"
            variants={staggerContainer(0.09, 0.1)}
            initial="hidden"
            animate="show"
          >
            {logo}
            <motion.div variants={staggerItemGentle}>{eyebrow}</motion.div>
            {headline}
            <motion.div variants={staggerItemGentle}>{subhead}</motion.div>
            <motion.div variants={staggerItemGentle}>{ctas}</motion.div>
          </motion.div>
        )}
      </Container>
    </FullBleedImage>
  );
}

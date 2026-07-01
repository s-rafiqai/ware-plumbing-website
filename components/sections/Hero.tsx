import Image from "next/image";
import { FullBleedImage } from "@/components/ui/FullBleedImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA, SITE } from "@/lib/site";

/**
 * Homepage hero — the single dark full-bleed photographic moment (signature #1).
 * The plumber photo covers the viewport under a bottom-weighted scrim; the
 * brand lockup, headline and CTAs sit over it, bottom-left. The overlay text is
 * intentionally NOT animated so the hero's large paint (LCP) isn't gated behind
 * JS; the only motion here is the image's subtle scroll-scale.
 */
export function Hero() {
  return (
    <FullBleedImage
      src="/assets/photos/hero-plumber.png"
      alt="" /* decorative — the headline names the business */
      priority
      scale
      scrim
      sizes="100vw"
    >
      <Container className="w-full pb-14 pt-28 md:pb-20">
        <div className="max-w-2xl">
          <Image
            src="/assets/logo/logo-full-lockup.png"
            alt="Ware Plumbing & Roofing"
            width={2030}
            height={974}
            priority
            sizes="180px"
            className="h-auto w-[150px] drop-shadow-sm sm:w-[172px]"
          />
          <p className="mt-6 text-small font-semibold uppercase tracking-wide text-blue">
            Melbourne&rsquo;s South East · 30+ years
          </p>
          <h1 className="mt-4 text-display text-white lg:text-display-lg text-balance">
            Your trusted choice for all plumbing works
          </h1>
          <p className="mt-5 max-w-xl text-lead text-white/85 text-pretty">
            Family-run and serving the community for over 30 years — from a
            dripping tap to a burst pipe, no job is too big or small.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </Button>
            <Button href={SITE.phone.href} variant="outline" size="lg">
              Call {SITE.phone.display}
            </Button>
          </div>
        </div>
      </Container>
    </FullBleedImage>
  );
}

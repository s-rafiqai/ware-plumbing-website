"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

interface FullBleedImageProps {
  src: string;
  /** Empty string marks the photo decorative (overlay text carries meaning). */
  alt: string;
  priority?: boolean;
  /** Scroll-driven scale 1→1.05 (transform only). Off under reduced motion. */
  scale?: boolean;
  /**
   * Scroll-driven parallax: the overlaid content drifts up as the section
   * scrolls away, on a separate track from the image scale — a subtle depth
   * cue. Transform only, off under reduced motion.
   */
  parallax?: boolean;
  /** Dark scrim for legibility of overlaid light text (bottom-weighted). */
  scrim?: boolean;
  /** Tailwind min-height class; defaults to the --size-hero token. */
  minHeightClassName?: string;
  sizes?: string;
  className?: string;
  /** Classes on the overlay content wrapper (e.g. justify/align). */
  contentClassName?: string;
  /** Overlaid content (rendered above the scrim). */
  children?: ReactNode;
}

/**
 * A full-bleed photographic section: the image covers the box, an optional dark
 * scrim sits over it, and overlaid content sits above that. Optionally the
 * image scales slightly on scroll (transform only, so no layout cost). The
 * overlay content is never animated here — callers keep hero LCP text static.
 */
export function FullBleedImage({
  src,
  alt,
  priority,
  scale,
  parallax,
  scrim,
  minHeightClassName = "min-h-[var(--size-hero)]",
  sizes = "100vw",
  className,
  contentClassName = "justify-end",
  children,
}: FullBleedImageProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  // Content drifts up ~64px as the hero scrolls away — a separate track from the
  // image scale. Starts at identity (y:0) so it never gates paint of the text.
  const rawContentY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const imgScale = scale && !reduce ? rawScale : 1;
  const contentY = parallax && !reduce ? rawContentY : 0;

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex w-full flex-col overflow-hidden",
        minHeightClassName,
        className,
      )}
    >
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>

      {scrim && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-deep/95 via-slate-deep/60 to-slate-deep/35"
        />
      )}

      {children && (
        <motion.div
          style={{ y: contentY }}
          className={cn("relative z-10 flex flex-1 flex-col", contentClassName)}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}

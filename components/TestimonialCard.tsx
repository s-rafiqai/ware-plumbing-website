"use client";

import { motion, useReducedMotion } from "motion/react";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { springSnappy } from "@/lib/motion";
import type { Testimonial } from "@/content/testimonials";

/** A single customer testimonial: rating, quote, and a monogram + name/company. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, company, rating, quote } = testimonial;
  const reduce = useReducedMotion();
  return (
    <motion.figure
      whileHover={reduce ? undefined : { y: -6 }}
      transition={springSnappy}
      className="flex h-full flex-col rounded-md border border-line surface-sheen p-6 shadow-sm transition-[box-shadow,border-color] duration-200 ease-out-soft hover:border-blue/20 hover:shadow-lg"
    >
      <StarRating value={rating} />
      <blockquote className="mt-4 flex-1 text-body text-ink-soft text-pretty">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={name} />
        <div>
          <div className="text-body font-semibold text-ink">{name}</div>
          {company && <div className="text-small text-ink-soft">{company}</div>}
        </div>
      </figcaption>
    </motion.figure>
  );
}

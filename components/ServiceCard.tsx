"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/content/services";
import { ServiceGlyph } from "@/components/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { springSnappy } from "@/lib/motion";
import { bookHref } from "@/lib/book/services";
import { cn } from "@/lib/cn";

interface ServiceCardProps {
  service: Service;
  /** Where the title/card links (defaults to the service's section). */
  href?: string;
  /** Larger treatment for the bento feature card. */
  featured?: boolean;
}

/**
 * Service card. The title is a stretched link over the whole card (→ services
 * page); the "Book" button sits above it (z-10) and deep-links into the funnel
 * with this service pre-selected — two actions, no nested interactive elements.
 */
export function ServiceCard({ service, href, featured }: ServiceCardProps) {
  const target = href ?? `/services#${service.slug}`;
  const reduce = useReducedMotion();
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={springSnappy}
      className={cn(
        "group relative flex h-full flex-col rounded-md border border-line surface-sheen",
        // Colour/shadow stay CSS (soft curve); the lift is a gentle spring above.
        "transition-[box-shadow,border-color] duration-200 ease-out-soft",
        "hover:border-blue/30 hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-blue focus-within:ring-offset-2",
        // The featured bento card rests higher than its neighbours.
        featured ? "p-8 shadow-md" : "p-6 shadow-sm",
      )}
    >
      <ArrowUpRight
        aria-hidden
        className="absolute right-5 top-5 size-5 text-grey opacity-0 transition-[transform,opacity,color] duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue group-hover:opacity-100 motion-reduce:transition-none motion-reduce:opacity-100"
      />
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-sm bg-blue-tint",
          featured ? "size-14" : "size-12",
        )}
      >
        <ServiceGlyph name={service.icon} className={featured ? "size-7" : "size-6"} />
      </span>
      <h3 className={cn("mt-5 text-ink", featured ? "text-h2" : "text-h3")}>
        <Link
          href={target}
          className="rounded-sm after:absolute after:inset-0 focus:outline-none"
        >
          {service.title}
        </Link>
      </h3>
      <p
        className={cn(
          "mt-2 flex-1 text-ink-soft text-pretty",
          featured ? "text-lead max-w-md" : "text-body",
        )}
      >
        {service.summary}
      </p>
      <div className="relative z-10 mt-5">
        <Button
          href={bookHref(service.bookSlug)}
          size="sm"
          aria-label={`Book ${service.title}`}
        >
          Book now
        </Button>
      </div>
    </motion.article>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { ServiceGlyph } from "@/components/ServiceIcon";
import { cn } from "@/lib/cn";

interface ServiceCardProps {
  service: Service;
  /** Where the card links (defaults to the service's section on the services page). */
  href?: string;
  /** Larger treatment for the bento feature card. */
  featured?: boolean;
}

/**
 * Service card: brand glyph, title, teaser, and an outward-arrow affordance that
 * surfaces on hover. The whole card lifts on hover (transform + shadow). Used at
 * two sizes so the services grid can read as a bento rather than a flat grid.
 */
export function ServiceCard({ service, href, featured }: ServiceCardProps) {
  const target = href ?? `/services#${service.slug}`;
  return (
    <Link
      href={target}
      className={cn(
        "group relative flex h-full flex-col rounded-md border border-line bg-white",
        "transition-[transform,box-shadow,border-color] duration-200 ease-out-expo",
        "hover:-translate-y-1 hover:border-blue/30 hover:shadow-md",
        "motion-reduce:hover:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
        featured ? "p-8" : "p-6",
      )}
    >
      {/* Outward-arrow affordance: fades/lifts in on hover, always shown under reduced motion. */}
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
        {service.title}
      </h3>
      <p
        className={cn(
          "mt-2 flex-1 text-ink-soft text-pretty",
          featured ? "text-lead max-w-md" : "text-body",
        )}
      >
        {service.summary}
      </p>
    </Link>
  );
}

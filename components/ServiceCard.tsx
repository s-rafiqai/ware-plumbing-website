import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Service } from "@/content/services";
import { SERVICE_ICONS } from "@/components/ServiceIcon";

interface ServiceCardProps {
  service: Service;
  /** Where the card links (defaults to the service's section on the services page). */
  href?: string;
}

/** Service summary card: focal blue icon, title, teaser and a "learn more" cue. */
export function ServiceCard({ service, href }: ServiceCardProps) {
  const Icon = SERVICE_ICONS[service.icon];
  const target = href ?? `/services#${service.slug}`;
  return (
    <Link
      href={target}
      className="group flex h-full flex-col rounded-md border border-line bg-white p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
    >
      <span className="grid size-12 place-items-center rounded-sm bg-blue-tint text-blue">
        <Icon aria-hidden className="size-6" />
      </span>
      <h3 className="mt-4 text-h3 text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-body text-ink-soft text-pretty">
        {service.summary}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-body font-medium text-blue">
        Learn more
        <ChevronRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Droplet,
  Waves,
  ShowerHead,
  Flame,
  ThermometerSun,
  Wrench,
  House,
} from "lucide-react";
import type { Service, ServiceIconName } from "@/content/services";

/** Maps a service's icon key to its Lucide icon (explicit, so it tree-shakes). */
const ICONS: Record<ServiceIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  droplet: Droplet,
  waves: Waves,
  shower: ShowerHead,
  flame: Flame,
  thermometer: ThermometerSun,
  wrench: Wrench,
  roof: House,
};

interface ServiceCardProps {
  service: Service;
  /** Where the card links (defaults to the services page). */
  href?: string;
}

/** Service summary card: focal blue icon, title, teaser and a "learn more" cue. */
export function ServiceCard({ service, href = "/services" }: ServiceCardProps) {
  const Icon = ICONS[service.icon];
  return (
    <Link
      href={href}
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

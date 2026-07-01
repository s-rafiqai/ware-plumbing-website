import type { ComponentType, SVGProps } from "react";
import {
  Droplet,
  Waves,
  ShowerHead,
  Flame,
  ThermometerSun,
  Wrench,
  House,
} from "lucide-react";
import type { ServiceIconName } from "@/content/services";

/**
 * Maps each service's icon key to its Lucide icon. Explicit (not dynamic) so
 * only the icons we use are bundled. Shared by the service card and the
 * services page.
 */
export const SERVICE_ICONS: Record<
  ServiceIconName,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  droplet: Droplet,
  waves: Waves,
  shower: ShowerHead,
  flame: Flame,
  thermometer: ThermometerSun,
  wrench: Wrench,
  roof: House,
};

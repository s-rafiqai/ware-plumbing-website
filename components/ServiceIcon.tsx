import type { CSSProperties } from "react";
import type { ServiceIconName } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Brand service-icon PNGs (public/assets/icons), keyed by the service's icon
 * name. Rendered via CSS `mask-image`: the PNG's alpha becomes the shape and
 * `bg-blue` fills it, so every icon renders in uniform brand blue regardless of
 * its source colour. This fixes both the white-on-light invisibility and the
 * odd red roofing icon in one move — no recolouring needed.
 */
const ICON_SRC: Record<ServiceIconName, string> = {
  droplet: "/assets/icons/water-leaks.png",
  waves: "/assets/icons/drain-cleaning.png",
  shower: "/assets/icons/taps-toilets.png",
  flame: "/assets/icons/gas-fitting.png",
  thermometer: "/assets/icons/hot-water.png",
  wrench: "/assets/icons/burst-pipe.png",
  roof: "/assets/icons/roofing.png",
};

interface ServiceGlyphProps {
  name: ServiceIconName;
  /** Size utilities etc. (default size-6). */
  className?: string;
}

export function ServiceGlyph({ name, className }: ServiceGlyphProps) {
  const src = ICON_SRC[name];
  const maskStyle: CSSProperties = {
    maskImage: `url("${src}")`,
    WebkitMaskImage: `url("${src}")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  };
  return (
    <span
      aria-hidden
      className={cn("block size-6 bg-blue", className)}
      style={maskStyle}
    />
  );
}

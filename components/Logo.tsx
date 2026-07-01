import Image from "next/image";
import { cn } from "@/lib/cn";

// Intrinsic size of the cropped logo asset (public/assets/logo).
const LOGO_W = 1000;
const LOGO_H = 555;

interface LogoProps {
  /**
   * For dark surfaces (the ink footer): the logo has a white background, so it
   * sits on a white chip rather than being recoloured.
   */
  reversed?: boolean;
  className?: string;
  /** Eagerly load (use in the header, where the logo is above the fold). */
  priority?: boolean;
}

/** The Ware Plumbing and Roofing logo lockup. */
export function Logo({ reversed, className, priority }: LogoProps) {
  const img = (
    <Image
      src="/assets/logo/ware-plumbing-logo.png"
      alt="Ware Plumbing and Roofing"
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      sizes="220px"
      className="h-full w-auto"
    />
  );

  if (reversed) {
    return (
      <span
        className={cn(
          "inline-flex h-14 items-center rounded-sm bg-white px-3 py-2",
          className,
        )}
      >
        {img}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex h-12 items-center", className)}>{img}</span>
  );
}

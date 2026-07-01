import Image from "next/image";
import { cn } from "@/lib/cn";

// Intrinsic sizes of the transparent logo assets (public/assets/logo).
const ASSETS = {
  monogram: { src: "/assets/logo/logo-wpr-monogram.png", w: 2030, h: 507 }, // ~4:1
  lockup: { src: "/assets/logo/logo-full-lockup.png", w: 2030, h: 974 }, // ~2:1
} as const;

interface LogoProps {
  /** `monogram` (wide WPR mark) for the header; `lockup` (WPR + wordmark) elsewhere. */
  variant?: "monogram" | "lockup";
  /**
   * Sit the logo on a white chip — for dark surfaces (the ink footer), since
   * the mark uses grey/blue that would lose contrast on ink.
   */
  reversed?: boolean;
  /** Eagerly load (header — above the fold). */
  priority?: boolean;
  /** Wrapper classes; height controls the rendered size. */
  className?: string;
}

/** The Ware Plumbing & Roofing logo (transparent PNG), sized via wrapper height. */
export function Logo({
  variant = "monogram",
  reversed,
  priority,
  className,
}: LogoProps) {
  const asset = ASSETS[variant];
  const img = (
    <Image
      src={asset.src}
      alt="Ware Plumbing & Roofing"
      width={asset.w}
      height={asset.h}
      priority={priority}
      sizes={variant === "monogram" ? "180px" : "120px"}
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
    <span className={cn("inline-flex h-10 items-center", className)}>{img}</span>
  );
}

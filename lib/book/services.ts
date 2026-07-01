import type { ServiceType } from "@/lib/book/config";

/**
 * Single source of truth mapping a deep-link slug ⇄ the funnel service label.
 * Used by the marketing service CTAs (`/book?service=<slug>`) AND the funnel,
 * so the two can't drift. Labels MUST match SERVICE_TYPES exactly.
 */
export interface BookService {
  slug: string;
  label: ServiceType;
}

export const BOOK_SERVICES: readonly BookService[] = [
  { slug: "blocked-drains", label: "Blocked Drains & CCTV" },
  { slug: "taps-toilets", label: "Taps & Toilet Repairs" },
  { slug: "gas-fitting", label: "Gas Fitting & Repairs" },
  { slug: "hot-water", label: "Hot Water Systems" },
  { slug: "burst-pipe", label: "Burst Pipe Location & Repairs" },
  { slug: "roofing", label: "Roofing & Repairs" },
  { slug: "general", label: "General Plumbing" },
  { slug: "emergency", label: "Emergency" },
];

/** Resolve a deep-link slug to its funnel label (undefined if unknown). */
export function labelForBookSlug(slug?: string | null): ServiceType | undefined {
  if (!slug) return undefined;
  return BOOK_SERVICES.find((s) => s.slug === slug)?.label;
}

/** Build a /book link, optionally deep-linking a service (and suburb). */
export function bookHref(slug?: string, suburb?: string): string {
  const params = new URLSearchParams();
  if (slug) params.set("service", slug);
  if (suburb) params.set("suburb", suburb);
  const qs = params.toString();
  return qs ? `/book?${qs}` : "/book";
}

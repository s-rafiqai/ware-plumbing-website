import { SITE } from "@/lib/site";

/**
 * Booking funnel configuration. Everything a demo operator or the owner is
 * likely to tweak lives here.
 */

/* ---------------------------------------------------------------------------
 * Rates — DEMO PLACEHOLDERS. // TODO: replace with the owner's real rates.
 * Amounts are in whole AUD dollars.
 * ------------------------------------------------------------------------- */
export const RATE_CALLOUT = 99; // TODO: real call-out fee
export const RATE_LABOUR = 132; // TODO: real hourly labour rate

/* --------------------------------------------------------------------------- */

/** Service types offered in Step 3. */
export const SERVICE_TYPES = [
  "Blocked Drains & CCTV",
  "Taps & Toilet Repairs",
  "Gas Fitting & Repairs",
  "Hot Water Systems",
  "Burst Pipe Location & Repairs",
  "Roofing & Repairs",
  "General Plumbing",
  "Emergency",
] as const;
export type ServiceType = (typeof SERVICE_TYPES)[number];

/** Preferred time windows. */
export const TIME_WINDOWS = ["Morning", "Afternoon", "Anytime"] as const;
export type TimeWindow = (typeof TIME_WINDOWS)[number];

/** Serviced suburbs (from the site config) — used to validate the address. */
export const SERVICE_SUBURBS = SITE.suburbs;

/** Case-insensitive membership test for the service-area warning. */
export function isServicedSuburb(value: string): boolean {
  const v = value.trim().toLowerCase();
  return SERVICE_SUBURBS.some((s) => s.toLowerCase() === v);
}

/** Canonical-cased suburb name if serviced, else undefined (for deep-links). */
export function canonicalSuburb(value: string): string | undefined {
  const v = value.trim().toLowerCase();
  return SERVICE_SUBURBS.find((s) => s.toLowerCase() === v);
}

/** Seconds before the "Resend code" control re-enables. */
export const RESEND_SECONDS = 30;

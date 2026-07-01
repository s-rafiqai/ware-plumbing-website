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

/* ---------------------------------------------------------------------------
 * Payment mode — what the card step captures. Switch via NEXT_PUBLIC_PAYMENT_MODE.
 *   deposit      → capture the call-out fee now as a booking deposit (default)
 *   prepay       → capture an upfront estimate (call-out + 1h labour)
 *   card_on_file → authorise $0, keep the card on file, charge after the job
 * ------------------------------------------------------------------------- */
export type PaymentMode = "deposit" | "prepay" | "card_on_file";

export const PAYMENT_MODE: PaymentMode =
  (process.env.NEXT_PUBLIC_PAYMENT_MODE as PaymentMode) || "deposit";

/** The amount (in dollars) the card step captures for the current mode. */
export function paymentAmount(mode: PaymentMode = PAYMENT_MODE): number {
  switch (mode) {
    case "deposit":
      return RATE_CALLOUT;
    case "prepay":
      return RATE_CALLOUT + RATE_LABOUR; // call-out + first hour estimate
    case "card_on_file":
      return 0;
  }
}

/** Human label for what's being captured, shown on the pay step. */
export function paymentLabel(mode: PaymentMode = PAYMENT_MODE): string {
  switch (mode) {
    case "deposit":
      return "Booking deposit (call-out fee)";
    case "prepay":
      return "Estimated total (paid upfront)";
    case "card_on_file":
      return "Card on file — nothing charged now";
  }
}

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

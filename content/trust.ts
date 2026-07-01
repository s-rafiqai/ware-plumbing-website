/**
 * Trust content — homepage trust badges (brief §1) and the "why choose us"
 * checklist (brief §4). Copy is sentence-cased and voice-consistent; supporting
 * lines don't assert facts beyond the brief. `icon` keys map to Lucide icons in
 * the component layer.
 */

export type TrustIconName = "award" | "building" | "wrench";

export interface TrustBadge {
  title: string;
  description: string;
  icon: TrustIconName;
}

export const TRUST_BADGES: readonly TrustBadge[] = [
  {
    title: "#1 in service",
    description:
      "Prompt, reliable and reputation-driven — the way a family business should be.",
    icon: "award",
  },
  {
    title: "Real estate property specialists",
    description:
      "Trusted by local agents for pre-sale inspections and rental repairs.",
    icon: "building",
  },
  {
    title: "Home plumbing & maintenance",
    description:
      "Everything from a dripping tap to a full hot water system replacement.",
    icon: "wrench",
  },
];

/** "Why choose us" — the eight-point checklist from the brief (§4). */
export const WHY_CHOOSE: readonly string[] = [
  "Professional, licensed plumbers",
  "Affordable prices",
  "No hidden costs",
  "Discounts for senior citizens",
  "Emergency services",
  "Guaranteed work",
  "Fast, reliable service",
  "Highly trained staff",
];

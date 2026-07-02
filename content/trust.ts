/**
 * Trust content — homepage trust badges (brief §1) and the "why choose us"
 * checklist (brief §4). Copy is sentence-cased and voice-consistent; supporting
 * lines don't assert facts beyond the brief. `icon` keys map to Lucide icons in
 * the component layer.
 */

export type TrustIconName = "award" | "building" | "wrench" | "clock";

export interface TrustBadge {
  title: string;
  description: string;
  icon: TrustIconName;
}

export const TRUST_BADGES: readonly TrustBadge[] = [
  {
    title: "Trusted Local Plumbers",
    description:
      "Fast response, quality workmanship and service you can rely on.",
    icon: "award",
  },
  {
    title: "Commercial & Education specialists",
    description:
      "Trusted by businesses, schools and facility managers for reliable plumbing maintenance, repairs and upgrades.",
    icon: "building",
  },
  {
    title: "Home plumbing & maintenance",
    description:
      "Everything from a dripping tap to a full hot water system replacement.",
    icon: "wrench",
  },
  {
    title: "24/7 Emergency Plumbing",
    description:
      "Available day or night for urgent plumbing emergencies when you need us most.",
    icon: "clock",
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

/**
 * Central site configuration.
 *
 * Single source of truth for business identity, contact details and service
 * area, sourced from the content brief (§1). Import `SITE` anywhere rather than
 * hard-coding these values, so contact details change in exactly one place.
 *
 * Values wrapped in {{DOUBLE_BRACES}} are unresolved gaps from the brief (§9).
 * They are intentionally NOT invented — grep for `{{` or `TODO:` to find them.
 */

export interface SocialLink {
  /** Human-readable network name, e.g. "Facebook". */
  label: string;
  /** Absolute URL to the profile. */
  href: string;
}

export interface ContactPoint {
  /** How the value is shown to a human, e.g. "03 9790 5550". */
  display: string;
  /** Machine href for the link, e.g. "tel:+61397905550" or "mailto:…". */
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Legal / registered styling if it differs from the display name. */
  legalName: string;
  tagline: string;
  description: string;

  phone: ContactPoint;
  mobile: ContactPoint;
  email: ContactPoint;

  /** Serviced suburbs, in the order presented on the site (brief §1). */
  suburbs: readonly string[];
  socials: readonly SocialLink[];

  // --- Unresolved placeholders (brief §9) — do NOT invent real values. ---
  /** TODO: {{ABN}} — Australian Business Number pending from client. */
  abn: string;
  /** TODO: {{LICENCE_NO}} — plumbing licence number(s) pending. */
  licenceNo: string;
  /** TODO: {{HOURS}} — operating hours / whether 24-7 emergency is offered. */
  hours: string;
  /** TODO: {{STREET_ADDRESS}} — physical address pending (currently "Melbourne South East"). */
  streetAddress: string;
}

export const SITE = {
  name: "Ware Plumbing",
  legalName: "Ware Plumbing",
  tagline: "Professional and affordable plumbing across Melbourne's South East",
  description:
    "Family-run plumbing serving Melbourne's South East suburbs for over 30 years — leaks, drains, hot water, gas fitting, burst pipes, roofing and more.",

  phone: { display: "03 9790 5550", href: "tel:+61397905550" },
  mobile: { display: "0412 331 405", href: "tel:+61412331405" },
  email: {
    display: "admin@wareplumbing.com.au",
    href: "mailto:admin@wareplumbing.com.au",
  },

  suburbs: [
    "Dandenong",
    "Endeavour Hills",
    "Doveton",
    "Hallam",
    "Narre Warren",
    "Berwick",
    "Pakenham",
    "Cranbourne",
  ],

  socials: [
    { label: "Facebook", href: "https://facebook.com/wareplumbing.com.au" },
    { label: "Instagram", href: "https://instagram.com/ware__plumbing" },
  ],

  // Placeholders — see brief §9. Replace the token, then delete its TODO.
  abn: "{{ABN}}", // TODO: {{ABN}}
  licenceNo: "{{LICENCE_NO}}", // TODO: {{LICENCE_NO}}
  hours: "{{HOURS}}", // TODO: {{HOURS}}
  streetAddress: "{{STREET_ADDRESS}}", // TODO: {{STREET_ADDRESS}}
} as const satisfies SiteConfig;

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation links (the "Get in touch" CTA is handled separately). */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
];

/** The persistent primary call-to-action shown in the header and footer. */
export const PRIMARY_CTA = { label: "Get in touch", href: "/contact" } as const;

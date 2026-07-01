import { SITE, SITE_URL } from "@/lib/site";

/**
 * LocalBusiness (Plumber) structured data for rich results. Only facts we
 * actually know are included — no street address or hours yet (brief §9).
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: SITE.phone.href.replace("tel:", ""),
    email: SITE.email.display,
    address: {
      "@type": "PostalAddress",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    areaServed: SITE.suburbs.map((name) => ({ "@type": "City", name })),
    sameAs: SITE.socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static and contains no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

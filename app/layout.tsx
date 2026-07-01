import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

// Inter, loaded and self-hosted by next/font. Exposed as the `--font-inter`
// CSS variable, which globals.css feeds into the Tailwind `--font-sans` token.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  // Shared OG bits only. Per-page title/description flow into og:/twitter:
  // automatically, and each page sets its own canonical. The default social
  // image comes from app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16181d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // en-AU: Australian English is the site default (spelling, date/number formats).
  return (
    <html lang="en-AU" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Safety net: if JS is disabled/fails, scroll-reveal elements (which
            Motion server-renders at opacity:0) are forced visible. */}
        <noscript>
          <style>{`[style]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

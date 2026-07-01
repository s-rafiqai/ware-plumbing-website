import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

// Inter, loaded and self-hosted by next/font. Exposed as the `--font-sans`
// CSS variable so Tailwind's font-sans utility (see globals.css) resolves to it.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // en-AU: Australian English is the site default (spelling, date/number formats).
  return (
    <html lang="en-AU" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        {children}
      </body>
    </html>
  );
}

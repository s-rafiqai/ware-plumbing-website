import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

// Inter, loaded and self-hosted by next/font. Exposed as the `--font-inter`
// CSS variable, which globals.css feeds into the Tailwind `--font-sans` token.
const inter = Inter({
  variable: "--font-inter",
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
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

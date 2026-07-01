import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCtaBar } from "@/components/StickyCtaBar";

/** Marketing chrome: header + footer around the page content. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Keyboard/screen-reader users can jump straight to the content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      {/* Spacer so the fixed mobile bar never covers footer content. */}
      <div aria-hidden className="h-16 md:hidden" />
      <StickyCtaBar />
    </>
  );
}

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BOOK_CTA, SITE } from "@/lib/site";

/**
 * Fixed bottom action bar for phones (hidden ≥ md): Call + Book, one thumb-tap
 * each. Safe-area aware. Rendered only in the (site) layout, so it never shows
 * inside the booking funnel. A spacer in the layout keeps it off the footer.
 */
export function StickyCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 shadow-[0_-4px_14px_rgba(20,24,29,0.06)] backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <Button
          href={SITE.phone.href}
          variant="outline"
          className="w-full"
          aria-label={`Call ${SITE.phone.display}`}
        >
          <Phone aria-hidden className="size-4 text-blue" />
          Call
        </Button>
        <Button href={BOOK_CTA.href} className="w-full">
          {BOOK_CTA.label}
        </Button>
      </div>
    </div>
  );
}

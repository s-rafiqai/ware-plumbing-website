"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { DEMO_MODE } from "@/lib/demo";

/** Dismissible "Demo" ribbon (top-right). Only renders in demo mode. */
export function DemoRibbon() {
  const [hidden, setHidden] = useState(false);
  if (!DEMO_MODE || hidden) return null;
  return (
    <div className="fixed bottom-3 right-3 z-[70] flex items-center gap-2 rounded-pill border border-warning/40 bg-warning/15 px-3 py-1.5 text-small font-semibold text-ink shadow-md backdrop-blur">
      <span aria-hidden className="size-2 rounded-full bg-warning" />
      Demo
      <button
        type="button"
        onClick={() => setHidden(true)}
        aria-label="Hide demo ribbon"
        className="ml-0.5 rounded-sm p-0.5 text-grey transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
      >
        <X aria-hidden className="size-3.5" />
      </button>
    </div>
  );
}

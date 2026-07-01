"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { store } from "@/lib/integrations";
import type { StoredBooking } from "@/lib/integrations/types";
import { DEMO_MODE } from "@/lib/demo";

/** Shows the last booking's exact payload — the JSON that would go to Fergus. */
export function DebugViewer() {
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    store.getLastBooking().then((b) => {
      setBooking(b);
      setLoaded(true);
    });
  }, []);

  const json = booking ? JSON.stringify(booking.payload, null, 2) : "";

  async function copy() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <p className="text-small font-semibold uppercase tracking-wide text-blue">
        Debug {DEMO_MODE ? "· demo mode" : "· live mode"}
      </p>
      <h1 className="mt-2 text-h2 text-ink">Last booking payload</h1>
      <p className="mt-2 text-body text-ink-soft">
        This is the exact JSON the funnel hands to the job provider — in live
        mode it&rsquo;s POSTed to the Fergus Zapier webhook.
      </p>

      {!loaded ? (
        <p className="mt-8 text-body text-grey">Loading…</p>
      ) : booking ? (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-small text-grey">
              Reference{" "}
              <span className="font-semibold text-ink">{booking.reference}</span>{" "}
              · {new Date(booking.createdAt).toLocaleString("en-AU")}
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1.5 text-small font-medium text-ink transition-colors hover:border-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              {copied ? (
                <Check aria-hidden className="size-3.5 text-success" />
              ) : (
                <Copy aria-hidden className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy JSON"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-md border border-line bg-ink p-5 text-small leading-relaxed text-surface">
            <code>{json}</code>
          </pre>
        </div>
      ) : (
        <p className="mt-8 rounded-md border border-line bg-surface p-6 text-body text-ink-soft">
          No booking yet. Run the{" "}
          <a href="/book" className="font-medium text-blue hover:text-blue-dark">
            /book
          </a>{" "}
          funnel and this will show the payload.
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useBook } from "@/components/book/BookProvider";
import { Summary } from "@/components/book/Summary";
import { Button } from "@/components/ui/Button";
import { store } from "@/lib/integrations";
import type { BookingPayload, Details } from "@/lib/book/schema";

/**
 * Step 4 — review & confirm. The customer checks their booking and confirms;
 * no charge is taken. On submit it POSTs the payload to /api/book and moves to
 * the confirmation.
 */
export function ReviewStep() {
  const { state, dispatch } = useBook();
  const [processing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  async function bookNow() {
    setSubmitError(undefined);
    setProcessing(true);

    const payload: BookingPayload = {
      mobile: state.mobile,
      mobileVerified: true,
      details: state.details as Details,
      photos: state.photos.map((p) => p.name),
      source: "web-booking-funnel",
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setProcessing(false);
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      await store.saveBooking({
        reference: data.reference,
        payload: data.payload,
        createdAt: data.createdAt,
      });
      dispatch({
        type: "CONFIRM",
        confirmation: {
          reference: data.reference,
          payload: data.payload,
          createdAt: data.createdAt,
        },
      });
    } catch {
      setProcessing(false);
      setSubmitError("Network error. Please try again.");
    }
  }

  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-h2 text-ink">Confirm booking</h1>
      <p className="mt-2 text-body text-ink-soft">
        Please review your booking before confirming.
      </p>

      <div className="mt-6">
        <Summary state={state} />
      </div>

      {submitError && (
        <p role="alert" className="mt-4 text-small text-error">
          {submitError}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <Button
          variant="outline"
          onClick={() => dispatch({ type: "GOTO", step: 3 })}
          disabled={processing}
        >
          Back
        </Button>
        <Button onClick={bookNow} disabled={processing} size="md" className="flex-1">
          {processing ? "Processing…" : "Book now"}
        </Button>
      </div>
    </div>
  );
}

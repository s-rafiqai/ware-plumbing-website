"use client";

import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { useBook } from "@/components/book/BookProvider";
import { Summary } from "@/components/book/Summary";
import { Field, fieldInput } from "@/components/book/Field";
import { Button } from "@/components/ui/Button";
import { paymentProvider, store } from "@/lib/integrations";
import { cardSchema, type BookingPayload, type Details } from "@/lib/book/schema";
import {
  PAYMENT_MODE,
  paymentAmount,
  paymentLabel,
} from "@/lib/book/config";
import { PAYMENT_ENABLED } from "@/lib/demo";
import { DEMO_MODE } from "@/lib/demo";

const formatCard = (v: string) =>
  v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

type CardErrors = { cardNumber?: string; expiry?: string; cvc?: string };

export function PayStep() {
  const { state, dispatch } = useBook();
  const [card, setCard] = useState({ cardNumber: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<CardErrors>({});
  const [processing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const amount = paymentAmount();
  const label = paymentLabel();
  const collectsCard = PAYMENT_ENABLED; // card_on_file still collects a card

  async function bookNow() {
    setSubmitError(undefined);

    let status: BookingPayload["payment"]["status"] = "skipped";
    let last4: string | undefined;

    if (collectsCard) {
      const parsed = cardSchema.safeParse(card);
      if (!parsed.success) {
        const next: CardErrors = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as keyof CardErrors;
          if (!next[key]) next[key] = issue.message;
        }
        setErrors(next);
        return;
      }
      setErrors({});
      setProcessing(true);
      const intent = await paymentProvider.createIntent(amount);
      const result = await paymentProvider.confirm(intent.id, parsed.data);
      if (!result.ok) {
        setProcessing(false);
        setSubmitError("Payment couldn't be processed. Please check your card.");
        return;
      }
      last4 = result.last4;
      status = PAYMENT_MODE === "card_on_file" ? "authorised" : "captured";
    } else {
      setProcessing(true);
    }

    const payload: BookingPayload = {
      mobile: state.mobile,
      mobileVerified: true,
      details: state.details as Details,
      photos: state.photos.map((p) => p.name),
      payment: { mode: PAYMENT_MODE, amount, status },
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
      dispatch({ type: "SET_PAYMENT", payment: { status, mode: PAYMENT_MODE, amount, last4 } });
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

  const paymentLine =
    !collectsCard || PAYMENT_MODE === "card_on_file"
      ? label
      : `${label} — $${amount}`;

  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-h2 text-ink">Confirm &amp; pay</h1>
      <p className="mt-2 text-body text-ink-soft">
        Please review your booking before confirming.
      </p>

      <div className="mt-6">
        <Summary state={state} paymentLine={paymentLine} />
      </div>

      <p className="mt-4 flex items-start gap-1.5 text-small text-grey">
        <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" />
        Your details are used to process this booking and are shared with Fergus
        (dispatch), Stripe (payments) and Xero (invoicing).
      </p>

      {collectsCard && (
        <div className="mt-6 rounded-md border border-line bg-surface p-5">
          <div className="flex items-center justify-between">
            <span className="text-small font-semibold text-ink">{label}</span>
            <span className="text-body font-bold text-ink">
              {PAYMENT_MODE === "card_on_file" ? "$0 today" : `$${amount}`}
            </span>
          </div>

          <div className="mt-4 space-y-4">
            <Field label="Card number" htmlFor="cardNumber" error={errors.cardNumber}>
              <input
                id="cardNumber"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={card.cardNumber}
                onChange={(e) => setCard((c) => ({ ...c, cardNumber: formatCard(e.target.value) }))}
                aria-invalid={!!errors.cardNumber}
                aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                className={fieldInput(errors.cardNumber ? "error" : "default")}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" htmlFor="expiry" error={errors.expiry}>
                <input
                  id="expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                  aria-invalid={!!errors.expiry}
                  aria-describedby={errors.expiry ? "expiry-error" : undefined}
                  className={fieldInput(errors.expiry ? "error" : "default")}
                />
              </Field>
              <Field label="CVC" htmlFor="cvc" error={errors.cvc}>
                <input
                  id="cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={card.cvc}
                  onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                  aria-invalid={!!errors.cvc}
                  aria-describedby={errors.cvc ? "cvc-error" : undefined}
                  className={fieldInput(errors.cvc ? "error" : "default")}
                />
              </Field>
            </div>
          </div>

          {DEMO_MODE && (
            <p className="mt-3 text-small text-ink-soft">
              <span className="rounded-sm bg-blue-tint px-1.5 py-0.5 font-medium text-blue-dark">
                Test card 4242 4242 4242 4242
              </span>{" "}
              — any future expiry &amp; any CVC.
            </p>
          )}
        </div>
      )}

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
          {processing ? (
            "Processing…"
          ) : (
            <>
              <Lock aria-hidden className="size-4" />
              Book now
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

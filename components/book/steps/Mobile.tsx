"use client";

import { useState } from "react";
import { Clock, Wrench, Wand2 } from "lucide-react";
import { useBook } from "@/components/book/BookProvider";
import { Field, fieldInput } from "@/components/book/Field";
import { RateCard } from "@/components/book/RateCard";
import { Button } from "@/components/ui/Button";
import { smsProvider } from "@/lib/integrations";
import { mobileSchema } from "@/lib/book/schema";
import { RATE_CALLOUT, RATE_LABOUR } from "@/lib/book/config";
import { DEMO_MODE } from "@/lib/demo";

/** Format digits as "0412 331 405" for the input display. */
function formatMobileInput(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  return [d.slice(0, 4), d.slice(4, 7), d.slice(7, 10)].filter(Boolean).join(" ");
}

export function MobileStep() {
  const { state, dispatch } = useBook();
  const [value, setValue] = useState(formatMobileInput(state.mobile));
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onContinue() {
    const parsed = mobileSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid mobile");
      return;
    }
    setError(undefined);
    setLoading(true);
    const mobile = parsed.data;
    dispatch({ type: "SET_MOBILE", mobile });
    await smsProvider.sendCode(mobile);
    setLoading(false);
    dispatch({ type: "GOTO", step: 2 });
  }

  function prefill() {
    const mobile = "0412331405";
    setValue(formatMobileInput(mobile));
    dispatch({ type: "SET_MOBILE", mobile });
    const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
    dispatch({
      type: "SET_DETAILS",
      details: {
        serviceType: "Blocked Drains & CCTV",
        description:
          "Kitchen sink is draining slowly and gurgling — think it's blocked.",
        fullName: "Sample Customer",
        email: "sample@example.com",
        address: "12 Sample Street",
        suburb: "Dandenong",
        preferredDate: tomorrow,
        timeWindow: "Morning",
      },
    });
  }

  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-h2 text-ink">Book a plumber</h1>
      <p className="mt-2 text-body text-ink-soft">
        Enter your mobile and we&rsquo;ll text you a quick verification code.
      </p>

      <div className="mt-6">
        <Field
          label="Mobile number"
          htmlFor="mobile"
          required
          error={error}
          hint="Australian mobile, e.g. 0412 331 405"
        >
          <input
            id="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="04xx xxx xxx"
            value={value}
            onChange={(e) => {
              setValue(formatMobileInput(e.target.value));
              setError(undefined);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? "mobile-error" : "mobile-hint"}
            className={fieldInput(error ? "error" : "default")}
          />
        </Field>
      </div>

      <div className="mt-6">
        <h2 className="text-small font-semibold uppercase tracking-wide text-grey">
          Our rates
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <RateCard label="Call-out" amount={RATE_CALLOUT} unit="per visit" icon={Clock} focal />
          <RateCard label="Labour" amount={RATE_LABOUR} unit="per hour" icon={Wrench} />
        </div>
      </div>

      <Button onClick={onContinue} disabled={loading} size="lg" className="mt-8 w-full">
        {loading ? "Sending code…" : "Continue"}
      </Button>

      {DEMO_MODE && (
        <button
          type="button"
          onClick={prefill}
          className="mt-4 inline-flex items-center gap-1.5 text-small font-medium text-blue transition-colors hover:text-blue-dark"
        >
          <Wand2 aria-hidden className="size-3.5" />
          Prefill sample data
        </button>
      )}
    </div>
  );
}

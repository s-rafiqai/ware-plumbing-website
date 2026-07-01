"use client";

import { useEffect, useState } from "react";
import { useBook } from "@/components/book/BookProvider";
import { OtpInput } from "@/components/book/OtpInput";
import { Button } from "@/components/ui/Button";
import { smsProvider } from "@/lib/integrations";
import { DEMO_MODE } from "@/lib/demo";
import { RESEND_SECONDS } from "@/lib/book/config";
import { formatMobile } from "@/lib/book/format";
import { SITE } from "@/lib/site";

export function VerifyStep() {
  const { state, dispatch } = useBook();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  const demoCode = DEMO_MODE ? smsProvider.peekCode?.(state.mobile) : undefined;

  // Resend countdown.
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  // Demo: auto-fill the code after ~1s so the flow demos smoothly.
  useEffect(() => {
    if (!DEMO_MODE) return;
    const t = setTimeout(() => {
      const c = smsProvider.peekCode?.(state.mobile);
      if (c) setCode(c);
    }, 1100);
    return () => clearTimeout(t);
  }, [state.mobile]);

  async function verify(current: string) {
    if (!/^\d{6}$/.test(current)) {
      setError("Enter the 6-digit code");
      return;
    }
    setError(undefined);
    setLoading(true);
    const { ok } = await smsProvider.verifyCode(state.mobile, current);
    setLoading(false);
    if (ok) dispatch({ type: "MOBILE_VERIFIED" });
    else setError("That code doesn't match. Please try again.");
  }

  async function resend() {
    await smsProvider.sendCode(state.mobile);
    setSeconds(RESEND_SECONDS);
    setCode("");
    setError(undefined);
  }

  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-h2 text-ink">Verify your mobile</h1>
      <p className="mt-2 text-body text-ink-soft">
        We sent a 6-digit code to{" "}
        <span className="font-semibold text-ink">{formatMobile(state.mobile)}</span>.{" "}
        <button
          type="button"
          onClick={() => dispatch({ type: "GOTO", step: 1 })}
          className="font-medium text-blue underline-offset-2 hover:underline"
        >
          Change
        </button>
      </p>

      <div className="mt-6">
        <OtpInput
          value={code}
          onChange={(v) => {
            setCode(v);
            setError(undefined);
            if (v.length === 6) verify(v);
          }}
          disabled={loading}
          invalid={!!error}
          id="otp"
          describedBy={error ? "otp-error" : demoCode ? "otp-hint" : undefined}
        />
        {error ? (
          <p id="otp-error" role="alert" className="mt-2 text-small text-error">
            {error}
          </p>
        ) : demoCode ? (
          <p id="otp-hint" className="mt-2 text-small text-ink-soft">
            <span className="rounded-sm bg-blue-tint px-1.5 py-0.5 font-semibold text-blue-dark">
              Demo code: {demoCode}
            </span>{" "}
            (auto-fills in a moment)
          </p>
        ) : null}
      </div>

      <Button
        onClick={() => verify(code)}
        disabled={loading}
        size="lg"
        className="mt-6 w-full"
      >
        {loading ? "Verifying…" : "Verify"}
      </Button>

      <div className="mt-5 flex items-center justify-between text-small">
        {seconds > 0 ? (
          <span className="text-grey">Resend code in {seconds}s</span>
        ) : (
          <button
            type="button"
            onClick={resend}
            className="font-medium text-blue hover:text-blue-dark"
          >
            Resend code
          </button>
        )}
        <a href={SITE.phone.href} className="text-grey hover:text-ink">
          Having trouble? Call {SITE.phone.display}
        </a>
      </div>
    </div>
  );
}

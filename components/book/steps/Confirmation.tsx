"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Loader2, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useBook } from "@/components/book/BookProvider";
import { Summary } from "@/components/book/Summary";
import { Button } from "@/components/ui/Button";
import { paymentLabel } from "@/lib/book/config";
import { DEMO_MODE } from "@/lib/demo";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/cn";

const PIPELINE = [
  "Job created in Fergus",
  "Added to dispatch",
  "Confirmation SMS sent",
  "Synced to Xero",
];

export function Confirmation() {
  const { state, dispatch } = useBook();
  const reduce = useReducedMotion();
  const [done, setDone] = useState(reduce ? PIPELINE.length : 0);

  // Tick the simulated pipeline one item at a time.
  useEffect(() => {
    if (reduce || done >= PIPELINE.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), 650);
    return () => clearTimeout(t);
  }, [done, reduce]);

  const conf = state.confirmation;
  const pay = state.payment;
  const paymentLine = pay
    ? pay.status === "captured"
      ? `${paymentLabel(pay.mode)} — $${pay.amount} paid`
      : pay.status === "authorised"
        ? `${paymentLabel(pay.mode)}${pay.last4 ? ` — card ••${pay.last4}` : ""}`
        : "No payment taken"
    : undefined;

  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center text-center">
        <motion.span
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="grid size-14 place-items-center rounded-full bg-success/10"
        >
          <CheckCircle2 aria-hidden className="size-8 text-success" />
        </motion.span>
        <h1 className="mt-4 text-h2 text-ink">Booking confirmed</h1>
        {conf && (
          <p className="mt-1 text-body text-ink-soft">
            Reference{" "}
            <span className="font-semibold text-ink">{conf.reference}</span>
          </p>
        )}
      </div>

      <div className="mt-6">
        <Summary state={state} paymentLine={paymentLine} />
      </div>

      {/* Simulated downstream pipeline */}
      <div className="mt-6 rounded-md border border-line bg-surface p-5">
        <h2 className="text-small font-semibold uppercase tracking-wide text-grey">
          What happens next
        </h2>
        <ul className="mt-3 space-y-2.5">
          {PIPELINE.map((label, i) => {
            const isDone = i < done;
            const isActive = i === done;
            return (
              <li key={label} className="flex items-center gap-2.5 text-body">
                {isDone ? (
                  <CheckCircle2 aria-hidden className="size-5 shrink-0 text-success" />
                ) : isActive ? (
                  <Loader2 aria-hidden className="size-5 shrink-0 animate-spin text-blue" />
                ) : (
                  <Circle aria-hidden className="size-5 shrink-0 text-line" />
                )}
                <span className={cn(isDone ? "text-ink" : "text-grey")}>{label}</span>
              </li>
            );
          })}
        </ul>
        {DEMO_MODE && (
          <p className="mt-3 text-small text-ink-soft">
            Simulated for the demo — these steps run for real once the
            integrations are switched on.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={() => dispatch({ type: "RESET" })}>
          <RotateCcw aria-hidden className="size-4" />
          Restart demo
        </Button>
        <Button href="/" variant="ghost" className="justify-center sm:justify-start">
          Back to site
        </Button>
      </div>
    </div>
  );
}

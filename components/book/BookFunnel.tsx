"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BookProvider, useBook } from "@/components/book/BookProvider";
import { StepIndicator } from "@/components/book/StepIndicator";
import { MobileStep } from "@/components/book/steps/Mobile";
import { VerifyStep } from "@/components/book/steps/Verify";
import { DetailsStep } from "@/components/book/steps/Details";
import { PayStep } from "@/components/book/steps/Pay";
import { Confirmation } from "@/components/book/steps/Confirmation";
import type { Details } from "@/lib/book/schema";
import { EASE_OUT_EXPO } from "@/lib/motion";

function stepView(step: ReturnType<typeof useBook>["state"]["step"]) {
  switch (step) {
    case 1:
      return <MobileStep />;
    case 2:
      return <VerifyStep />;
    case 3:
      return <DetailsStep />;
    case 4:
      return <PayStep />;
    case "done":
      return <Confirmation />;
  }
}

function FunnelInner() {
  const { state } = useBook();
  const reduce = useReducedMotion();
  const step = state.step;

  return (
    <Container className="w-full max-w-xl py-8 md:py-12">
      {step !== "done" && (
        <div className="mb-6">
          <StepIndicator current={step} />
        </div>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={String(step)}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        >
          {stepView(step)}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}

/** The whole /book funnel: provider + step orchestration with transitions. */
export function BookFunnel({ initialDetails }: { initialDetails?: Partial<Details> }) {
  return (
    <BookProvider initialDetails={initialDetails}>
      <FunnelInner />
    </BookProvider>
  );
}

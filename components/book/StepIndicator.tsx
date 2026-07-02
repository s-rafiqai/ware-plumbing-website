import { TOTAL_STEPS } from "@/lib/book/state";

const LABELS = ["Mobile", "Verify", "Job details", "Confirm"];

/** "Step X of 4" with a blue progress bar. */
export function StepIndicator({ current }: { current: number }) {
  const pct = Math.round((current / TOTAL_STEPS) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-small font-semibold text-grey">
          Step {current} of {TOTAL_STEPS}
        </span>
        <span className="text-small font-medium text-ink-soft">
          {LABELS[current - 1]}
        </span>
      </div>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-line"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-label={`Step ${current} of ${TOTAL_STEPS}`}
      >
        <div
          className="h-full rounded-pill bg-blue transition-[width] duration-500 ease-out-expo motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";

interface RateCardProps {
  label: string;
  amount: number;
  /** e.g. "per call-out" or "per hour". */
  unit?: string;
  note?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** The one focal card gets the blue icon accent. */
  focal?: boolean;
}

/** A single rate (call-out fee, hourly labour) shown on Step 1. */
export function RateCard({ label, amount, unit, note, icon: Icon, focal }: RateCardProps) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="flex items-center gap-2 text-small font-semibold uppercase tracking-wide text-grey">
        {Icon && (
          <Icon
            aria-hidden
            className={cn("size-4", focal ? "text-blue" : "text-grey")}
          />
        )}
        {label}
      </div>
      <div className="mt-2 text-h2 font-extrabold tracking-tight text-ink">
        ${amount}
        {unit && <span className="text-body font-medium text-grey"> {unit}</span>}
      </div>
      {note && <p className="mt-1 text-small text-ink-soft">{note}</p>}
    </div>
  );
}

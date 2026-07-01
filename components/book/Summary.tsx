import type { ReactNode } from "react";
import type { BookState } from "@/lib/book/state";
import { formatMobile, formatDate } from "@/lib/book/format";

function Row({ label, value }: { label: string; value: ReactNode }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between gap-6 border-b border-line py-3 last:border-0">
      <dt className="shrink-0 text-small text-grey">{label}</dt>
      <dd className="text-right text-body text-ink">{value}</dd>
    </div>
  );
}

/** Read-only booking summary, used on the pay step and the confirmation. */
export function Summary({
  state,
  paymentLine,
}: {
  state: BookState;
  paymentLine?: string;
}) {
  const d = state.details;
  return (
    <dl className="rounded-md border border-line bg-white px-5">
      <Row label="Service" value={d.serviceType} />
      <Row label="Details" value={d.description} />
      <Row label="Name" value={d.fullName} />
      <Row label="Email" value={d.email} />
      <Row
        label="Address"
        value={d.address ? `${d.address}, ${d.suburb}` : undefined}
      />
      <Row
        label="Preferred"
        value={
          d.preferredDate
            ? `${formatDate(d.preferredDate)} · ${d.timeWindow}`
            : undefined
        }
      />
      <Row label="Mobile" value={formatMobile(state.mobile)} />
      <Row
        label="Photos"
        value={state.photos.length > 0 ? `${state.photos.length} attached` : undefined}
      />
      <Row label="Payment" value={paymentLine} />
    </dl>
  );
}

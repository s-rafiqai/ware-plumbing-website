/** Format a normalised mobile ("0412331405") as "0412 331 405". */
export function formatMobile(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length !== 10) return digits;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
}

/** Format an ISO date ("2026-07-10") as "Fri 10 Jul 2026" (en-AU). */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

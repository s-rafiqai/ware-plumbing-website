import type { Metadata } from "next";
import { BookFunnel } from "@/components/book/BookFunnel";
import { labelForBookSlug } from "@/lib/book/services";
import { canonicalSuburb } from "@/lib/book/config";
import type { Details } from "@/lib/book/schema";

export const metadata: Metadata = {
  title: "Book a plumber",
  description: "Book Ware Plumbing & Roofing online in a few quick steps.",
  robots: { index: false, follow: false },
};

/**
 * Deep-linking: `?service=<slug>` pre-selects the Step 3 service and
 * `?suburb=<name>` pre-fills a serviced suburb. The flow still starts at Step 1
 * (mobile verification) — params only pre-fill later fields. Unknown/missing
 * params behave exactly as the default funnel.
 */
export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const serviceParam = typeof sp.service === "string" ? sp.service : undefined;
  const suburbParam = typeof sp.suburb === "string" ? sp.suburb : undefined;

  const initial: Partial<Details> = {};
  const label = labelForBookSlug(serviceParam);
  if (label) initial.serviceType = label;
  const suburb = suburbParam ? canonicalSuburb(suburbParam) : undefined;
  if (suburb) initial.suburb = suburb;

  return (
    <BookFunnel
      initialDetails={Object.keys(initial).length > 0 ? initial : undefined}
    />
  );
}

import { NextResponse } from "next/server";
import { bookingPayloadSchema } from "@/lib/book/schema";
import { jobProvider } from "@/lib/integrations";

/**
 * Booking submit. Server-side zod validation (defence in depth alongside the
 * client), then hands the validated payload to the active job provider
 * (demo: logs it; real: POSTs to the Fergus Zap webhook).
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bookingPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  try {
    const result = await jobProvider.createBooking(parsed.data);
    return NextResponse.json({ ...result, createdAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Booking failed" },
      { status: 500 },
    );
  }
}

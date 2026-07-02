import type { BookingPayload } from "@/lib/book/schema";

/** SMS verification (demo: in-memory code; real: Twilio Verify). */
export interface SmsProvider {
  sendCode(mobile: string): Promise<{ ok: true }>;
  verifyCode(mobile: string, code: string): Promise<{ ok: boolean }>;
  /** Demo-only: reveal the code for the on-screen hint/autofill. */
  peekCode?(mobile: string): string | undefined;
}

/** Job dispatch (demo: log payload; real: POST to the Fergus Zapier webhook). */
export interface JobProvider {
  createBooking(payload: BookingPayload): Promise<{
    reference: string;
    payload: BookingPayload;
  }>;
}

/** Booking persistence (demo: localStorage; real: Supabase). */
export interface StoredBooking {
  reference: string;
  payload: BookingPayload;
  createdAt: string;
}
export interface Store {
  saveBooking(booking: StoredBooking): Promise<void>;
  getLastBooking(): Promise<StoredBooking | null>;
}

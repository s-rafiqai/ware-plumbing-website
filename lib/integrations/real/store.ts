import type { Store } from "@/lib/integrations/types";

/**
 * REAL STORE — Supabase.  TODO(go-live).
 *
 * Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (server) or
 * NEXT_PUBLIC_SUPABASE_ANON_KEY (client, with RLS).
 *
 * saveBooking     → insert into a `bookings` table (reference, payload, created_at)
 * getLastBooking  → select latest row (or by reference)
 */
function notConfigured(): never {
  throw new Error(
    "Real store (Supabase) is not wired up. Keep NEXT_PUBLIC_DEMO_MODE unset/true, " +
      "or implement lib/integrations/real/store.ts.",
  );
}

export const realStore: Store = {
  async saveBooking() {
    notConfigured();
  },
  async getLastBooking() {
    return notConfigured();
  },
};

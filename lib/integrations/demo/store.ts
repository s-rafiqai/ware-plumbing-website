import type { Store, StoredBooking } from "@/lib/integrations/types";

// Demo persistence: the browser's localStorage, so the /debug page can show the
// last booking even after a reload. SSR-guarded so it's a no-op on the server.
const KEY = "ware-demo-last-booking";

export const demoStore: Store = {
  async saveBooking(booking) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(booking));
  },
  async getLastBooking() {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredBooking) : null;
  },
};

import type { JobProvider } from "@/lib/integrations/types";
import { generateReference } from "@/lib/book/reference";

// Demo: log the exact payload that WOULD be sent to Fergus (via the Zap) and
// return a reference. Nothing leaves the app.
export const demoJob: JobProvider = {
  async createBooking(payload) {
    const reference = generateReference();
    console.log(
      "[demo jobProvider] createBooking →",
      JSON.stringify({ reference, payload }, null, 2),
    );
    return { reference, payload };
  },
};

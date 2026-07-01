import type { JobProvider } from "@/lib/integrations/types";
import { generateReference } from "@/lib/book/reference";

/**
 * REAL JOB DISPATCH — POST the booking to the Fergus Zapier Catch Hook.
 * This one is functional as soon as FERGUS_ZAP_WEBHOOK_URL is set (no SDK).
 *
 * Env (server-side): FERGUS_ZAP_WEBHOOK_URL
 * Zap: Catch Hook → Find/Create Customer → Create Job → Finalize (see README).
 */
export const realJob: JobProvider = {
  async createBooking(payload) {
    const url = process.env.FERGUS_ZAP_WEBHOOK_URL;
    if (!url) {
      throw new Error(
        "FERGUS_ZAP_WEBHOOK_URL is not set — see .env.example and the README 'Going live' section.",
      );
    }
    const reference = generateReference();
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reference, ...payload }),
    });
    if (!res.ok) {
      throw new Error(`Fergus webhook responded ${res.status}`);
    }
    return { reference, payload };
  },
};

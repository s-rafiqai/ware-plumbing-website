import type { SmsProvider } from "@/lib/integrations/types";

/**
 * REAL SMS — Twilio Verify.  TODO(go-live).
 *
 * Env (server-side only): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 * TWILIO_VERIFY_SERVICE_SID.
 *
 * The auth token must never reach the browser, so implement send/verify in
 * server routes and have this provider call them via fetch:
 *   sendCode   → POST /api/verify/send  { mobile }
 *                 twilio.verify.v2.services(SID).verifications.create({ to, channel: "sms" })
 *   verifyCode → POST /api/verify/check { mobile, code }
 *                 twilio.verify.v2.services(SID).verificationChecks.create({ to, code })
 */
function notConfigured(): never {
  throw new Error(
    "Real SMS (Twilio) is not wired up. Keep NEXT_PUBLIC_DEMO_MODE unset/true, " +
      "or implement lib/integrations/real/sms.ts + the /api/verify routes.",
  );
}

export const realSms: SmsProvider = {
  async sendCode() {
    notConfigured();
  },
  async verifyCode() {
    notConfigured();
  },
};

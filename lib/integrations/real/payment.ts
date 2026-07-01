import type { PaymentProvider } from "@/lib/integrations/types";

/**
 * REAL PAYMENT — Stripe.  TODO(go-live).
 *
 * Env: STRIPE_SECRET_KEY (server), NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (client).
 *
 * Recommended: use the Stripe Payment Element rather than raw card fields.
 *   createIntent → POST /api/pay/intent { amount } → stripe.paymentIntents.create(
 *                    { amount: amount * 100, currency: "aud", capture_method:
 *                      PAYMENT_MODE === "card_on_file" ? "manual" : "automatic" })
 *                  → return { id, clientSecret }
 *   confirm      → done client-side by the Payment Element with the clientSecret;
 *                  this method can become a no-op or a status check.
 */
function notConfigured(): never {
  throw new Error(
    "Real payments (Stripe) are not wired up. Keep NEXT_PUBLIC_DEMO_MODE unset/true, " +
      "or implement lib/integrations/real/payment.ts + the /api/pay routes.",
  );
}

export const realPayment: PaymentProvider = {
  async createIntent() {
    notConfigured();
  },
  async confirm() {
    notConfigured();
  },
};

import type { PaymentProvider } from "@/lib/integrations/types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Always-succeed mock. Validates card format only (see cardSchema); never
// contacts a payment processor and never charges anything.
export const demoPayment: PaymentProvider = {
  async createIntent(amountDollars) {
    await delay(300);
    return {
      id: `demo_pi_${Math.random().toString(36).slice(2, 10)}`,
      amount: amountDollars,
      clientSecret: "demo_secret_do_not_use",
    };
  },
  async confirm(_intentId, card) {
    await delay(1000); // let the "processing" animation breathe
    const digits = card.cardNumber.replace(/\s+/g, "");
    return { ok: true, last4: digits.slice(-4) };
  },
};

import type { SmsProvider } from "@/lib/integrations/types";

// In-memory code store (per process/session). No SMS is ever sent.
const codes = new Map<string, string>();

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const demoSms: SmsProvider = {
  async sendCode(mobile) {
    await delay(250);
    const code = String(Math.floor(100000 + Math.random() * 900000));
    codes.set(mobile, code);
    return { ok: true };
  },
  async verifyCode(mobile, code) {
    await delay(250);
    return { ok: codes.get(mobile) === code };
  },
  // Demo hint/autofill source; absent from the real provider.
  peekCode(mobile) {
    return codes.get(mobile);
  },
};

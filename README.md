# Ware Plumbing — website

Marketing website for Ware Plumbing, a family-run plumbing business serving
Melbourne's South East for 30+ years.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **Inter** via `next/font`
- Content lives in typed files under `content/` and `lib/` — no CMS in v1
- Deploy target: **Vercel**

## Requirements

- **Node 22 LTS** (see `.nvmrc`). With nvm: `nvm use`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in when integrations are added
npm run dev                  # http://localhost:3000
```

## Scripts

| Command         | What it does                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the dev server                |
| `npm run build` | Production build                    |
| `npm start`     | Serve the production build          |
| `npm run lint`  | Lint with ESLint (`eslint-config-next`) |

## Project structure

```
app/                Routes and layouts (App Router)
components/          Reusable UI components
content/            Typed content data (copy sourced from the brief)
lib/                Helpers and site-wide config
  site.ts           SITE config: contact details, suburbs, socials
public/assets/      Self-hosted images (see brief §8 — do not hotlink old URLs)
docs/               Content brief and design system (source of truth, not shipped)
```

## Conventions

- **Australian English** spelling throughout.
- **Design tokens** are centralised in `app/globals.css`. The values there are
  placeholders; the real system comes from `docs/Ware-Plumbing-Design-System.pdf`
  (Phase 1). Change tokens there, not in components.
- **Unresolved business details** (ABN, licence no., hours, street address) are
  intentionally left as `{{TOKENS}}` with `// TODO:` markers — grep before launch:
  ```bash
  grep -rn "TODO:\|{{" lib content app
  ```
- **No secrets in the repo.** Real values go in `.env.local` only.

## Deploy

Import the repo into Vercel. No custom configuration required; the default
Next.js build settings apply.

---

# Booking funnel demo (`/book`)

A fully clickable, sales-ready demo of the online booking experience — including
the SMS-code and card-payment steps — that runs with **no accounts, no API keys,
and no real SMS/charges**. Every integration sits behind an adapter with a
`DEMO_MODE` flag (default ON), so going live is a config change, not a rewrite.

## Run the demo

```bash
npm install && npm run dev      # → http://localhost:3000/book
```

Deploys to Vercel with **zero environment variables**. In demo mode:

- **SMS** — no Twilio; the 6-digit code is shown as a "Demo code" hint and
  auto-fills after ~1s. Verification succeeds against it.
- **Payment** — no Stripe; the card form validates formats only and always
  succeeds (test card `4242 4242 4242 4242`, any future expiry, any CVC).
- **Dispatch** — no Zapier/Fergus; the exact JSON payload is logged and shown
  on **`/debug`**.
- **Store** — the last booking is kept in `localStorage` (powers `/debug`).

### Demo controls
- **Restart demo** — on the confirmation screen (resets state to replay).
- **Demo ribbon** — dismissible badge, bottom-right (hidden when `DEMO_MODE` off).
- **Prefill sample data** — button on Step 1 (demo only) to speed up repeat runs.
- **`/debug`** — unlinked; shows the last booking's exact Fergus payload + copy.

### Rates & payment mode
Edit `lib/book/config.ts`: `RATE_CALLOUT` / `RATE_LABOUR` (demo placeholders —
`// TODO: real rates`) and the payment mode (`deposit` | `prepay` |
`card_on_file`, or set `NEXT_PUBLIC_PAYMENT_MODE`).

## Architecture

```
app/(site)/…             Marketing pages (unchanged URLs)
app/(funnel)/book/       The 4-step funnel (own minimal chrome)
app/api/book/route.ts    Submit — server-side zod → jobProvider
app/debug/               Payload viewer
components/book/          StepIndicator, Field, OtpInput, RateCard, Summary,
                         DemoRibbon, BookProvider, steps/*
lib/book/                config, schema (zod), state (reducer), format, reference
lib/integrations/        Adapter layer (see below)
lib/demo.ts              DEMO_MODE / PAYMENT_ENABLED resolution
```

The funnel only imports the **adapters**, never a concrete provider:

| Adapter          | Demo (live now)              | Real (stubbed, `lib/integrations/real/`) |
| ---------------- | ---------------------------- | ---------------------------------------- |
| `smsProvider`    | in-memory code + hint        | Twilio Verify                            |
| `paymentProvider`| always-succeed mock          | Stripe                                   |
| `jobProvider`    | logs payload, returns ref    | POST → Fergus Zap webhook (functional)   |
| `store`          | `localStorage`               | Supabase                                 |

`lib/integrations/index.ts` picks demo vs real via `DEMO_MODE`.

## Going live (flip one adapter at a time)

Set env vars in Vercel (see `.env.example`), then turn `DEMO_MODE` off **last**:

1. **SMS — Twilio Verify.** Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`,
   `TWILIO_VERIFY_SERVICE_SID`. Implement `real/sms.ts` to call server routes
   (`/api/verify/send` → `verifications.create`, `/api/verify/check` →
   `verificationChecks.create`) so the token stays server-side. Remove the demo
   code hint automatically (it's gated by `DEMO_MODE`).
2. **Payments — Stripe.** Set `STRIPE_SECRET_KEY` +
   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. Implement `real/payment.ts` + `/api/pay`
   routes; prefer the Stripe **Payment Element**. `capture_method` follows
   `PAYMENT_MODE` (`card_on_file` → `manual`). (You can also run Stripe **test**
   mode with just a publishable test key while keeping everything else mocked.)
3. **Dispatch — Zapier → Fergus.** Set `FERGUS_ZAP_WEBHOOK_URL`. `real/job.ts`
   already POSTs `{ reference, ...payload }` to it — no code needed.
4. **Store — Supabase.** Set the Supabase vars and implement `real/store.ts`
   (insert/select a `bookings` row).
5. Set `NEXT_PUBLIC_DEMO_MODE=false`.

### Zapier → Fergus Zap

Trigger **Catch Hook** (its URL is `FERGUS_ZAP_WEBHOOK_URL`), receiving the JSON
shown on `/debug`. Steps:

1. **Catch Hook** — receives the booking.
2. **Find/Create Customer** (Fergus) — match on `details.fullName` /
   `mobile` / `details.email`; create if none.
3. **Create Job** (Fergus) — map fields:
   | Fergus field       | From payload                          |
   | ------------------ | ------------------------------------- |
   | Customer           | (from step 2)                         |
   | Site address       | `details.address`, `details.suburb`   |
   | Job type / title   | `details.serviceType`                 |
   | Description         | `details.description`                 |
   | Contact mobile     | `mobile`                              |
   | Preferred date     | `details.preferredDate`               |
   | Preferred window   | `details.timeWindow`                  |
   | Reference          | `reference`                           |
4. **Finalize** — set status/priority (e.g. `Emergency` → high) and, optionally,
   notify dispatch (SMS/email/Slack).

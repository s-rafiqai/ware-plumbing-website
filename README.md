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

# Ware Plumbing — Claude Code Build Prompt

A phased prompt for building the Ware Plumbing website rebuild in **Claude Code inside VS Code** on your local machine.

---

## How to use this

1. Create an empty project folder, open it in VS Code, and start Claude Code.
2. **Copy `ware-plumbing-content-brief.md` into the repo root** — the prompt below tells Claude Code to treat it as the single source of truth for all copy.
3. Then either:
   - **Run it all at once** — paste the *Master Context* prompt, then paste "Execute all phases 0–5 in order, pausing after each for my review."
   - **Phase-by-phase (recommended)** — paste the *Master Context* once, then paste each Phase prompt in turn, reviewing/committing between them.

> Phase-by-phase gives you a clean git commit per phase and lets you catch design drift early. A marketing site is small enough that all-at-once works too, but you'll have less control.

---

## Master Context — paste this first (once)

```text
You are helping me build a new marketing website for Ware Plumbing, a family-run plumbing business in Melbourne's South East (30+ years, servicing Dandenong, Endeavour Hills, Doveton, Hallam, Narre Warren, Berwick, Pakenham, Cranbourne).

READ ./ware-plumbing-content-brief.md NOW and treat it as the single source of truth for all copy, business details, service descriptions, testimonials, and the image manifest. Do not invent copy that contradicts it.

## Tech stack (fixed)
- Next.js (latest, App Router) + TypeScript
- Tailwind CSS
- next/image for all imagery
- No CMS for v1 — content lives in typed data files (e.g. /content/*.ts) so it's easy to edit and later swap for a CMS
- Deploy target: Vercel (keep everything Vercel-compatible)

## Design direction (PLACEHOLDER — a full design system PDF will replace this later)
Treat these as tokens I can swap out in one place, so centralise them in the Tailwind theme + CSS variables:
- Base: near-black (#0A0A0A / #111) on white/off-white; high contrast, lots of whitespace
- Single accent: saturated blue #2D7FF9 (used sparingly for CTAs, links, active states)
- Typography: Inter (via next/font)
- Feel: modern, trustworthy, "premium trades" — clean, confident, not busy. Restrained rounding, subtle shadows, no gradients-for-the-sake-of-it.
- IMPORTANT: the current live site over-uses ALL-CAPS. Do NOT replicate that. Use sentence case with occasional emphasis.

## Hard rules (do not break)
- Australian English spelling throughout.
- DO NOT invent or guess any of: ABN, plumbing licence number(s), business hours, street address, or service prices. Where the brief lists these as gaps, insert a clearly-marked placeholder token like {{ABN}}, {{LICENCE_NO}}, {{HOURS}}, {{STREET_ADDRESS}} and add a // TODO comment so I can grep for them.
- Fix the testimonial typos from the brief (e.g. "ponctual" → "punctual", "send" → "sent", "change" → "changed") but keep the meaning and voice.
- Testimonial avatars: use generated initials/monograms, NOT stock photos of faces. The testimonial text is real; the faces on the old site are not.
- Phone numbers must be click-to-call (tel: links). Primary: 03 9790 5550. Mobile: 0412 331 405. Email: mailto: admin@wareplumbing.com.au.
- Accessibility: semantic HTML, WCAG 2.1 AA contrast, full keyboard navigation, visible focus states, alt text on all images, aria labels on icon-only controls.
- Mobile-first responsive. Test breakpoints at 375 / 768 / 1024 / 1440.
- No secrets in the repo. Any keys/webhooks go in .env.local with a committed .env.example.

## Working style
- Work in the phases I give you. After each phase: summarise what you built, list any assumptions/placeholders, and STOP for my review before continuing.
- Keep components small and composable. Co-locate styles.
- Prefer clarity over cleverness. Comment the non-obvious.
- Run the build/lint after each phase and fix errors before stopping.

Acknowledge you've read the brief and are ready, then wait for my Phase 0 instruction.
```

---

## Phase 0 — Scaffold

```text
Phase 0 — Scaffold the project.

- Initialise a Next.js (App Router) + TypeScript app in the current directory.
- Add and configure Tailwind CSS.
- Set up Inter via next/font.
- Create this structure (adjust idiomatically if needed):
  /app            (routes)
  /components      (UI components)
  /content         (typed content data files, sourced from the brief)
  /lib             (helpers, e.g. site config)
  /public/assets   (self-hosted images — see brief §8)
- Create /lib/site.ts exporting a typed SITE config object: name, phone, mobile, email, suburbs[], socials, and placeholder tokens for {{ABN}}, {{LICENCE_NO}}, {{HOURS}}, {{STREET_ADDRESS}}.
- Add .env.example (empty placeholders for future booking/webhook keys).
- Add a sensible .gitignore, README with run instructions, and an .nvmrc.
- Confirm the dev server runs and the starter page renders.

Summarise the structure, then stop.
```

---

## Phase 1 — Design foundation

```text
Phase 1 — Design foundation & tokens.

- Centralise the design tokens in the Tailwind theme AND as CSS custom properties on :root (colours, spacing scale, radii, shadows, type scale). Everything downstream must reference these tokens so the whole look can be re-skinned by editing one place. This is critical — a full design system will replace these values later.
- Define the colour tokens: near-black base, white/off-white surfaces, and the single blue accent #2D7FF9 (plus hover/active shades derived from it).
- Set a clear typographic scale with Inter (display / h1–h4 / body / small). Comfortable line-heights, generous vertical rhythm.
- Build a handful of design primitives as components: Container/Section wrapper (max-width + responsive padding), Button (primary / secondary / ghost variants, with tel: link support), and a SectionHeading.
- Create a /app/styleguide route that renders every token, type style, and primitive on one page so I can eyeball the system. (I'll delete this before launch.)

Show me the styleguide, summarise the tokens, then stop.
```

---

## Phase 2 — Core components

```text
Phase 2 — Build the shared components (still using placeholder/stock imagery from the brief where needed; real photos come later).

Build, styled per the design tokens and fully responsive + accessible:
- Header: sticky, logo left, nav (Home, About, Services, Contact), click-to-call phone, and a prominent "Book / Request a Callback" button. Mobile: accessible burger menu.
- Footer: logo, short blurb, suburbs served, nav, socials (Facebook, Instagram), phone x2, email, copyright.
- ServiceCard: icon + title + short blurb + link.
- TrustBadges: the three homepage badges (#1 In Service, Real Estate Property Specialists, Home Plumbing & Maintenance).
- TestimonialCarousel: accessible carousel using the real testimonial text from the brief; avatars as initials/monograms (NOT stock faces); star ratings; keyboard + swipe navigable; respects prefers-reduced-motion.
- CTASection: phone-forward "Call now / We're ready to help" band.
- ContactForm: Name (optional), Email (required), Message (optional), submit. Client + server validation. For now, wire submission to a stubbed server action that logs and returns success — leave a clear // TODO for real delivery (email/Fergus). Include a honeypot for spam. Do NOT add reCAPTCHA yet.
- MapEmbed: lazy-loaded, area-level map of Melbourne's South East (no fake street address).

Summarise the component API for each, then stop.
```

---

## Phase 3 — Pages

```text
Phase 3 — Build the four pages using the verbatim copy from the brief (cleaned of ALL-CAPS and typos per the rules).

- Home: hero ("Servicing the community for 30+ years", value prop, primary CTA) → trust badges → about teaser → services grid (all service cards) → testimonials → CTA band + map.
- About: intro ("the friendly neighbourhood plumber…"), mission, Why Choose Us with the 8-point checklist, 30-years story, CTA.
- Services: intro, then each of the service blocks (Water Leaks, Drain Cleaning & CCTV, Taps & Toilet Repairs, Gas Fitting & Repairs, Hot Water Systems, Burst Pipe Location & Repairs, Roofing & Repairs) with its full copy, alternating image/text layout, each with a Contact/Book CTA. Give each service a stable id/anchor.
- Contact: "Get in Touch" copy, contact blocks (area / email / phone), the ContactForm, and the map.

Pull all page copy from /content data files (create them from the brief), not hardcoded in JSX, so it's easy to edit.

Summarise, flag any copy gaps, then stop.
```

---

## Phase 4 — SEO, accessibility & performance polish

```text
Phase 4 — SEO, accessibility, and performance pass.

- Per-page metadata (title, description) + Open Graph/Twitter tags via the App Router metadata API.
- JSON-LD structured data: LocalBusiness / Plumber schema (name, areaServed = the suburbs, telephone, email, sameAs socials). Use placeholder tokens for anything I haven't provided (address, hours) rather than inventing.
- Generate sitemap.xml and robots.txt.
- Ensure every image uses next/image with correct sizes and alt text; convert the "keep" assets from the brief into /public/assets and reference them; use tasteful placeholders for the "replace" assets with a // TODO.
- Run an accessibility self-check: heading order, landmarks, colour contrast, focus order, form labels. Fix issues.
- Verify responsive behaviour at 375/768/1024/1440 and note anything that needs real content/images to finalise.
- Run lint + build; fix all errors and warnings.

Give me a short checklist of what's done vs. what's blocked on my inputs (ABN, hours, address, rates, real photos, final logo), then stop.
```

---

## Phase 5 — Booking funnel placeholder (scaffold only)

```text
Phase 5 — Scaffold the booking funnel as a self-contained placeholder. Do NOT wire real integrations yet — I'll provide the booking spec separately.

- Create a /book route with a multi-step funnel SHELL modelled as 4 steps: (1) contact/mobile entry, (2) verification step (stub), (3) service + details, (4) confirm / preferred time window. Use local component state; make it accessible and mobile-first.
- Collect: name, mobile, email, suburb, service type (from the services list), free-text details, and a preferred time window (date + AM/PM/anytime) — NOT a live calendar slot picker (live availability isn't available in v1).
- On submit, POST to a stubbed /api/book route that validates and returns success, with clear // TODO markers for the real integration boundary: "→ webhook → Zapier → Fergus (Find/Create Customer, Create Job, Finalize Draft Job); Stripe for payment; Xero via Fergus." Do NOT implement these — just leave the seam and typed request/response shapes.
- Add the booking entry points (header button, service CTAs) pointing at /book.
- Keep all funnel styling on the design tokens so it re-skins with the rest of the site.

Summarise the funnel shape and the exact integration seams you left, then stop.
```

---

## Later: swapping in the real design system

When the design system PDF is ready, paste something like:

```text
I'm importing the finalised design system. Update ONLY the token layer (Tailwind theme + :root CSS variables + font setup) to match these values: [paste colours, type scale, spacing, radii, shadows, logo]. Do not restructure components — they should inherit the new look through the tokens. Then rebuild the /app/styleguide page so I can verify, and flag any component that doesn't pick up the new tokens cleanly.
```

## Later: wiring the real booking integration

```text
Here is the booking integration spec: [paste Fergus/Zapier/Stripe/Supabase details, field mappings, and the v1 availability decision]. Implement it at the seams you left in Phase 5. Keep secrets in .env.local, add them to .env.example, validate all inputs server-side, and handle failures gracefully with user-facing error states. Write the request/response types and a short README section on the flow.
```

---

### Notes to yourself before you start
- Put `ware-plumbing-content-brief.md` in the repo root first, or Phase prompts referencing it will fail.
- Commit after each phase (`git add -A && git commit -m "phase N: …"`).
- The grep list for placeholders to fill before launch: `{{ABN}}`, `{{LICENCE_NO}}`, `{{HOURS}}`, `{{STREET_ADDRESS}}`, and every `// TODO`.

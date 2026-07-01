import { SITE } from "@/lib/site";

/**
 * Phase 0 placeholder home page.
 *
 * This exists only to confirm the scaffold renders and that the design tokens
 * and SITE config are wired up. The real homepage is built in a later phase.
 */
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Scaffold ready
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {SITE.name}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{SITE.tagline}.</p>

        <dl className="mt-10 space-y-3 border-t border-border pt-8 text-ink">
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-muted">Phone</dt>
            <dd>
              <a className="hover:text-accent" href={SITE.phone.href}>
                {SITE.phone.display}
              </a>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-muted">Mobile</dt>
            <dd>
              <a className="hover:text-accent" href={SITE.mobile.href}>
                {SITE.mobile.display}
              </a>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-muted">Email</dt>
            <dd>
              <a className="hover:text-accent" href={SITE.email.href}>
                {SITE.email.display}
              </a>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-muted">Areas</dt>
            <dd>{SITE.suburbs.join(", ")}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}

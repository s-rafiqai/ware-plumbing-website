import { SITE } from "@/lib/site";

/**
 * Phase 0/1 placeholder home page.
 *
 * Confirms the scaffold renders and that the design tokens (from the design
 * system PDF) and SITE config are wired up. The real homepage is built later.
 */
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <p className="text-small font-medium uppercase tracking-wide text-blue">
          Scaffold ready
        </p>
        <h1 className="mt-3 text-h1 text-ink sm:text-display">{SITE.name}</h1>
        <p className="mt-4 text-h3 font-normal text-grey">{SITE.tagline}.</p>

        <dl className="mt-10 space-y-3 border-t border-line pt-8 text-ink">
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-soft">Phone</dt>
            <dd>
              <a className="hover:text-blue" href={SITE.phone.href}>
                {SITE.phone.display}
              </a>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-soft">Mobile</dt>
            <dd>
              <a className="hover:text-blue" href={SITE.mobile.href}>
                {SITE.mobile.display}
              </a>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-soft">Email</dt>
            <dd>
              <a className="hover:text-blue" href={SITE.email.href}>
                {SITE.email.display}
              </a>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-ink-soft">Areas</dt>
            <dd>{SITE.suburbs.join(", ")}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}

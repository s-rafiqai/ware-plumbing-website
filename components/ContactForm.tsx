"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-sm border bg-white px-3.5 py-3 text-body text-ink placeholder:text-grey " +
  "focus:outline-none focus:border-blue focus:ring-[3px] focus:ring-blue-tint";
const labelClass =
  "block text-small font-semibold uppercase tracking-wide text-ink-soft";

/**
 * Contact form ("Get a free quote"): Name (optional), Email (required), Message.
 *
 * Interim delivery: on submit it composes a pre-filled email to the business,
 * so the form works today. TODO: wire a real submission endpoint + reCAPTCHA
 * (env keys pending — see .env.example) and, later, the booking widget.
 */
export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const emailId = `${uid}-email`;
  const errorId = `${uid}-email-error`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.email.trim() || !EMAIL_RE.test(values.email)) {
      setError("Please enter a valid email address so we can reply.");
      return;
    }
    setError(null);

    const subject = `Website enquiry${values.name ? ` from ${values.name}` : ""}`;
    const body = `Name: ${values.name || "—"}\nEmail: ${values.email}\n\n${values.message || "(no message)"}`;
    window.location.href = `${SITE.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-line bg-white p-8 text-center">
        <CheckCircle2 aria-hidden className="mx-auto size-10 text-success" />
        <h3 className="mt-4 text-h3 text-ink">Almost there</h3>
        <p className="mt-2 text-body text-ink-soft text-pretty">
          Your email app should open with your message ready to send. Prefer to
          talk? Call us on{" "}
          <a href={SITE.phone.href} className="font-medium text-blue hover:text-blue-dark">
            {SITE.phone.display}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setValues({ name: "", email: "", message: "" });
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${uid}-name`} className={labelClass}>
          Full name
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Jane Smith"
          className={`${fieldClass} mt-1.5 border-line`}
        />
      </div>

      <div>
        <label htmlFor={emailId} className={labelClass}>
          Email <span className="text-error">*</span>
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="you@example.com"
          className={`${fieldClass} mt-1.5 ${error ? "border-error" : "border-line"}`}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-small text-error">
            {error}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className={labelClass}>
          How can we help?
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder="Tell us about the job - the more detail, the better."
          className={`${fieldClass} mt-1.5 border-line`}
        />
      </div>

      <Button type="submit" className="w-full">
        Send enquiry
      </Button>
      <p className="text-small text-grey">
        We&rsquo;ll never share your details. Fields marked{" "}
        <span className="text-error">*</span> are required.
      </p>
    </form>
  );
}

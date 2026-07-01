import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

/** Shared input styling (default / focus / error / success). */
export const fieldBase =
  "w-full rounded-sm border bg-white px-3.5 py-3 text-body text-ink placeholder:text-grey " +
  "transition-[border-color,box-shadow] focus:outline-none focus:border-blue focus:ring-[3px] " +
  "focus:ring-blue-tint disabled:cursor-not-allowed disabled:opacity-60";

export type FieldState = "default" | "error" | "success";

export function fieldBorder(state: FieldState = "default"): string {
  if (state === "error") return "border-error";
  if (state === "success") return "border-success";
  return "border-line";
}

/** Compose the full input className for a given state. */
export function fieldInput(state: FieldState = "default", className?: string) {
  return cn(fieldBase, fieldBorder(state), className);
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Labelled field wrapper. Emits stable ids for the error/hint text
 * (`{htmlFor}-error` / `{htmlFor}-hint`) — wire the control's `aria-describedby`
 * and `aria-invalid` to match.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-small font-semibold text-ink-soft">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-small text-error"
        >
          <AlertCircle aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-small text-grey">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

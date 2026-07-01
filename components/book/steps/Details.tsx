"use client";

import { useState } from "react";
import { AlertTriangle, ImagePlus, X } from "lucide-react";
import { useBook } from "@/components/book/BookProvider";
import { Field, fieldInput } from "@/components/book/Field";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  SERVICE_TYPES,
  TIME_WINDOWS,
  isServicedSuburb,
  SERVICE_SUBURBS,
} from "@/lib/book/config";
import { detailsSchema, type Details } from "@/lib/book/schema";
import type { PhotoRef } from "@/lib/book/state";

type Errors = Partial<Record<keyof Details, string>>;

export function DetailsStep() {
  const { state, dispatch } = useBook();
  const [form, setForm] = useState<Partial<Details>>(state.details);
  const [photos, setPhotos] = useState<PhotoRef[]>(state.photos);
  const [errors, setErrors] = useState<Errors>({});

  function set<K extends keyof Details>(key: K, value: Details[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const suburbOutside =
    !!form.suburb && form.suburb.length > 1 && !isServicedSuburb(form.suburb);

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setPhotos((p) => [...p, ...next]);
  }

  function removePhoto(i: number) {
    setPhotos((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, idx) => idx !== i);
    });
  }

  function onContinue() {
    const parsed = detailsSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Details;
        if (!next[key]) next[key] = issue.message;
      }
      if (next.serviceType) next.serviceType = "Choose a service";
      if (next.timeWindow) next.timeWindow = "Choose a time window";
      setErrors(next);
      return;
    }
    dispatch({ type: "SET_DETAILS", details: parsed.data });
    dispatch({ type: "SET_PHOTOS", photos });
    dispatch({ type: "GOTO", step: 4 });
  }

  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-h2 text-ink">Job details</h1>
      <p className="mt-2 text-body text-ink-soft">
        Tell us what&rsquo;s going on and where.
      </p>

      <div className="mt-6 space-y-5">
        <Field label="Service needed" htmlFor="serviceType" required error={errors.serviceType}>
          <select
            id="serviceType"
            value={form.serviceType ?? ""}
            onChange={(e) => set("serviceType", e.target.value as Details["serviceType"])}
            aria-invalid={!!errors.serviceType}
            aria-describedby={errors.serviceType ? "serviceType-error" : undefined}
            className={fieldInput(errors.serviceType ? "error" : "default")}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Description" htmlFor="description" required error={errors.description}>
          <textarea
            id="description"
            rows={3}
            value={form.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            placeholder="e.g. Hot water system is leaking from the base."
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
            className={fieldInput(errors.description ? "error" : "default")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="fullName" required error={errors.fullName}>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName ?? ""}
              onChange={(e) => set("fullName", e.target.value)}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={fieldInput(errors.fullName ? "error" : "default")}
            />
          </Field>
          <Field label="Email" htmlFor="email" hint="Optional" error={errors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email ?? ""}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : "email-hint"}
              className={fieldInput(errors.email ? "error" : "default")}
            />
          </Field>
        </div>

        <Field label="Service address" htmlFor="address" required error={errors.address}>
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            value={form.address ?? ""}
            onChange={(e) => set("address", e.target.value)}
            placeholder="Street address"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            className={fieldInput(errors.address ? "error" : "default")}
          />
        </Field>

        <Field
          label="Suburb"
          htmlFor="suburb"
          required
          error={errors.suburb}
          hint={!errors.suburb && !suburbOutside ? "We service Melbourne's South East" : undefined}
        >
          <input
            id="suburb"
            type="text"
            list="suburb-list"
            value={form.suburb ?? ""}
            onChange={(e) => set("suburb", e.target.value)}
            aria-invalid={!!errors.suburb}
            aria-describedby={errors.suburb ? "suburb-error" : "suburb-hint"}
            className={fieldInput(errors.suburb ? "error" : suburbOutside ? "default" : "default")}
          />
          <datalist id="suburb-list">
            {SERVICE_SUBURBS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </Field>
        {suburbOutside && !errors.suburb && (
          <p className="-mt-3 flex items-start gap-1.5 text-small text-warning">
            <AlertTriangle aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            <span className="text-ink-soft">
              That looks outside our usual area — you can still book and we&rsquo;ll
              confirm we can attend.
            </span>
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred date" htmlFor="preferredDate" required error={errors.preferredDate}>
            <input
              id="preferredDate"
              type="date"
              value={form.preferredDate ?? ""}
              onChange={(e) => set("preferredDate", e.target.value)}
              aria-invalid={!!errors.preferredDate}
              aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
              className={fieldInput(errors.preferredDate ? "error" : "default")}
            />
          </Field>
          <div>
            <span className="block text-small font-semibold text-ink-soft">
              Time window <span className="text-error">*</span>
            </span>
            <div className="mt-1.5 grid grid-cols-3 gap-2" role="group" aria-label="Time window">
              {TIME_WINDOWS.map((w) => {
                const active = form.timeWindow === w;
                return (
                  <button
                    key={w}
                    type="button"
                    aria-pressed={active}
                    onClick={() => set("timeWindow", w)}
                    className={cn(
                      "rounded-sm border px-2 py-3 text-small font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue",
                      active
                        ? "border-blue bg-blue text-white"
                        : "border-line bg-white text-ink hover:border-grey",
                    )}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
            {errors.timeWindow && (
              <p role="alert" className="mt-1.5 text-small text-error">
                {errors.timeWindow}
              </p>
            )}
          </div>
        </div>

        {/* Photos — local preview only in demo */}
        <div>
          <span className="block text-small font-semibold text-ink-soft">
            Photos <span className="font-normal text-grey">(optional)</span>
          </span>
          <div className="mt-1.5 flex flex-wrap gap-3">
            {photos.map((p, i) => (
              <div key={p.url} className="relative size-20 overflow-hidden rounded-sm border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not an optimisable asset */}
                <img src={p.url} alt={p.name} className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label={`Remove ${p.name}`}
                  className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-ink/70 text-white"
                >
                  <X aria-hidden className="size-3" />
                </button>
              </div>
            ))}
            <label className="grid size-20 cursor-pointer place-items-center rounded-sm border border-dashed border-line text-grey transition-colors hover:border-blue hover:text-blue">
              <ImagePlus aria-hidden className="size-5" />
              <span className="sr-only">Add photos</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => addPhotos(e.target.files)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={() => dispatch({ type: "GOTO", step: 2 })}>
          Back
        </Button>
        <Button onClick={onContinue} size="md" className="flex-1">
          Continue to confirm
        </Button>
      </div>
    </div>
  );
}

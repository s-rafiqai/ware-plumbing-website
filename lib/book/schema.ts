import { z } from "zod";
import { SERVICE_TYPES, TIME_WINDOWS } from "@/lib/book/config";

/** Strip spaces from a mobile for validation/storage. */
export const normaliseMobile = (v: string) => v.replace(/\s+/g, "");

/** AU mobile: 04xx xxx xxx (10 digits starting 04). */
export const mobileSchema = z
  .string()
  .transform(normaliseMobile)
  .refine((v) => /^04\d{8}$/.test(v), "Enter a valid Australian mobile (04xx xxx xxx)");

/** Six-digit SMS code. */
export const codeSchema = z
  .string()
  .refine((v) => /^\d{6}$/.test(v), "Enter the 6-digit code");

/** Step 3 — job details. Email is optional. */
export const detailsSchema = z.object({
  serviceType: z.enum(SERVICE_TYPES),
  description: z.string().trim().min(5, "Tell us a little about the job"),
  fullName: z.string().trim().min(2, "Enter your name"),
  email: z.union([z.email("Enter a valid email"), z.literal("")]).optional(),
  address: z.string().trim().min(4, "Enter the service address"),
  suburb: z.string().trim().min(2, "Enter the suburb"),
  preferredDate: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), "Choose a date")
    .refine((v) => {
      const d = new Date(v);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    }, "Date can't be in the past"),
  timeWindow: z.enum(TIME_WINDOWS),
});
export type Details = z.infer<typeof detailsSchema>;

/**
 * The full booking payload — what the server validates and the job provider
 * receives (this is the exact JSON shown on /debug and, when live, POSTed to
 * the Fergus Zap).
 */
export const bookingPayloadSchema = z.object({
  mobile: mobileSchema,
  mobileVerified: z.literal(true),
  details: detailsSchema,
  photos: z.array(z.string()).default([]),
  source: z.literal("web-booking-funnel").default("web-booking-funnel"),
});
export type BookingPayload = z.infer<typeof bookingPayloadSchema>;

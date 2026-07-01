/**
 * Testimonials — real customer text from content brief §6.
 *
 * Cleaned per the brief: fixed typos ("ponctual" → "punctual", "send" → "sent",
 * "change" → "changed", "communicate" → "communicated"), normalised "WARE
 * Plumbing"/"WarePlumbing" → "Ware Plumbing", tidied casing/punctuation. Meaning
 * and voice preserved. Avatars are generated monograms — the text is real, the
 * faces on the old site were stock (brief §8).
 */

export interface Testimonial {
  name: string;
  /** Company/organisation, where the reviewer gave one. */
  company?: string;
  /** Star rating out of 5. All brief testimonials are five stars. */
  rating: number;
  quote: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: "George G.",
    company: "Brace Tech",
    rating: 5,
    quote: "Stephane was awesome. Very helpful and did a great job.",
  },
  {
    name: "David K.",
    company: "Roumani Pty Ltd",
    rating: 5,
    quote:
      "Assessed the issue, provided an outline of the work and cost, and communicated the whole process. Perfect job by Daniel, who dealt with the issues promptly and professionally.",
  },
  {
    name: "Mickeal P.",
    rating: 5,
    quote:
      "Our real estate agent recommended Ware Plumbing when our drains blocked up only days before we were going to put the house up for sale. They responded immediately and organised a plumber to come the next day. He was extremely punctual and polite.",
  },
  {
    name: "Miriam L.",
    rating: 5,
    quote:
      "Ware Plumbing sent me a plumber to fix my hot water system that was leaking. He came and changed it to a new one the very same day. Very professional and reliable.",
  },
  {
    name: "Robert T.",
    rating: 5,
    quote:
      "My roof had a tendency to leak during storms. I called these guys to have a look. They replaced my drainage system and I haven't had any leaks since.",
  },
  {
    name: "Rhonda Smith",
    rating: 5,
    quote:
      "Would definitely recommend Ware Plumbing. I've been using Stephane for a few years now and could not be happier with his service. He's happy to help, is very friendly and always sorts out any plumbing issues I might have.",
  },
  {
    name: "Helen Murphy",
    rating: 5,
    quote:
      "Ware Plumbing have been the main plumbers for our school for a number of years. We can't fault them! They always come on the day we call, especially during emergencies. They go above and beyond and are extremely reasonable in their pricing. Highly recommend the service.",
  },
  {
    name: "Laurren Kaye",
    rating: 5,
    quote: "Prompt service and excellent workmanship. Highly recommended.",
  },
  {
    name: "Joanne Guinane",
    rating: 5,
    quote: "Honesty, reliability and efficiency is what you get at this company.",
  },
];

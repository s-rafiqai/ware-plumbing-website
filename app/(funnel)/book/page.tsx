import type { Metadata } from "next";
import { BookFunnel } from "@/components/book/BookFunnel";

export const metadata: Metadata = {
  title: "Book a plumber",
  description: "Book Ware Plumbing & Roofing online in a few quick steps.",
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return <BookFunnel />;
}

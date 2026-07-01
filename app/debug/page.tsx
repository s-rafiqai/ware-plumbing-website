import type { Metadata } from "next";
import { DebugViewer } from "@/components/book/DebugViewer";

export const metadata: Metadata = {
  title: "Debug — last booking",
  robots: { index: false, follow: false },
};

export default function DebugPage() {
  return <DebugViewer />;
}

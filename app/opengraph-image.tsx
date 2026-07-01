import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social share image (also used for Twitter). Brand-built, no assets.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16181D",
          color: "#FFFFFF",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#FFFFFF",
              color: "#16181D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 940 }}>
            Your trusted choice for all plumbing works
          </div>
          <div style={{ fontSize: 30, color: "#C7CBD3" }}>
            {`Melbourne's South East · 30+ years · ${SITE.phone.display}`}
          </div>
        </div>

        <div
          style={{ display: "flex", height: 8, width: 140, background: "#2D7FF9", borderRadius: 9999 }}
        />
      </div>
    ),
    { ...size },
  );
}

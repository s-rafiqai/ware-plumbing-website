/**
 * Demo-mode resolution, shared by client and server.
 *
 * DEMO_MODE is ON by default so a zero-config Vercel deploy (no env vars) runs
 * the fully-mocked demo. Set NEXT_PUBLIC_DEMO_MODE="false" to switch every
 * adapter to its real implementation. Because it's a NEXT_PUBLIC_ var, the value
 * is inlined at build time and is safe to read in client components.
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

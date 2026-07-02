import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables Next's integration with React's View Transitions API — Next then
    // triggers a native view transition on route navigation (verified against
    // next@16.2.9 docs). template.tsx's motion fade remains the fallback for
    // browsers without View Transitions support.
    viewTransition: true,
  },
};

export default nextConfig;

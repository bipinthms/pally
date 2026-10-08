import type { NextConfig } from "next";

// The site is served from the root of its custom domain
// (https://www.alencherrychurch.org/), so routes and assets need no prefix.
const basePath = "";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files. `next build` writes the complete
  // site (including out/index.html) to this directory for the Pages workflow.
  output: "export",
  basePath,
  // Expose the prefix to code that builds raw asset URLs (see assetPath).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    // Lets client code render the build year before hydration (see useCurrentYear).
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  // Export each route as a directory index so direct GitHub Pages URLs work.
  trailingSlash: true,
  reactStrictMode: true,
  // Let other devices on the LAN load dev-server assets (next dev only).
  allowedDevOrigins: ["192.168.1.*"],
  images: {
    // Static exports have no Next.js image optimisation server.
    unoptimized: true,
  },
  // The site is entirely hand-authored; keep production builds green even if a
  // stylistic lint rule (e.g. unescaped entities) trips. Types are still checked.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

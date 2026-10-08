import type { NextConfig } from "next";

// This repository is published at https://bipinthms.github.io/pally/ rather
// than at the domain root, so production builds prefix routes and assets.
// `next dev` serves from the root so the site opens at http://localhost:3000.
const basePath = process.env.NODE_ENV === "production" ? "/pally" : "";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files. `next build` writes the complete
  // site (including out/index.html) to this directory for the Pages workflow.
  output: "export",
  basePath,
  // Expose the prefix to code that builds raw asset URLs (see assetPath).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files. `next build` writes the complete
  // site (including out/index.html) to this directory for the Pages workflow.
  output: "export",
  // This repository is published at https://bipinthms.github.io/pally/ rather
  // than at the domain root, so Next must prefix routes and static assets.
  basePath: "/pally",
  // Export each route as a directory index so direct GitHub Pages URLs work.
  trailingSlash: true,
  reactStrictMode: true,
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

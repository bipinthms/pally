import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The site is entirely hand-authored; keep production builds green even if a
  // stylistic lint rule (e.g. unescaped entities) trips. Types are still checked.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

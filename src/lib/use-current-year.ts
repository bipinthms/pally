"use client";

import * as React from "react";

// Falls back to "now" if the env var is missing (e.g. a dev server started before it was added).
const BUILD_YEAR = Number(process.env.NEXT_PUBLIC_BUILD_YEAR) || new Date().getFullYear();

/**
 * The current year, without a hydration mismatch: renders the build year (as the
 * static HTML did), then the visitor's year once mounted.
 */
export function useCurrentYear() {
  const [year, setYear] = React.useState(BUILD_YEAR);
  React.useEffect(() => setYear(new Date().getFullYear()), []);
  return year;
}

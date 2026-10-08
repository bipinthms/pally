"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/** Static export has no server redirects, so send visitors on from the client. */
export function RedirectToContact() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/contact");
  }, [router]);
  return null;
}

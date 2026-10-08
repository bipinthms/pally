"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Static export has no server redirects: send visitors on from the client, with a
 * meta refresh and a plain link for crawlers and visitors without JavaScript.
 */
export function RedirectToContact() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/contact/");
  }, [router]);
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/contact/" />
      <p className="container-x py-40 text-center">
        <Link href="/contact/" className="text-primary underline underline-offset-4">
          Contact the parish office
        </Link>
      </p>
    </>
  );
}

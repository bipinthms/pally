import type { Metadata } from "next";
import { RedirectToContact } from "./redirect";

// Temporarily redirected to Contact. The original page (UPI QR, bank details)
// lives in ./content.tsx; restore it from git history when giving reopens.
export const metadata: Metadata = {
  title: "Donations & Giving",
  robots: { index: false },
};

export default function DonationsPage() {
  return <RedirectToContact />;
}

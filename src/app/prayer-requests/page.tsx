import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PrayerRequestsContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Prayer Requests",
  path: "/prayer-requests/",
  description:
    "Submit a prayer request to St. Mary's Orthodox Syrian Church, Alencherry. Our priests and prayer community will lift up your intention at the Holy Qurbana and in daily prayer.",
});

export default function PrayerRequestsPage() {
  return <PrayerRequestsContent />;
}

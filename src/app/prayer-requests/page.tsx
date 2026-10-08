import type { Metadata } from "next";
import { PrayerRequestsContent } from "./content";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Submit a prayer request to St. Mary's Orthodox Syrian Church, Alencherry. Our priests and prayer community will lift up your intention at the Holy Qurbana and in daily prayer.",
};

export default function PrayerRequestsPage() {
  return <PrayerRequestsContent />;
}

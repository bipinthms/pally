import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HolyMassContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Holy Qurbana Timings",
  path: "/holy-mass/",
  description:
    "Sunday and weekday Holy Qurbana timings, confession, prayer and special feast schedules at St. Mary's Orthodox Syrian Church, Alencherry.",
});

export default function HolyMassPage() {
  return <HolyMassContent />;
}

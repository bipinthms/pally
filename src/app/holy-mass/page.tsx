import type { Metadata } from "next";
import { HolyMassContent } from "./content";

export const metadata: Metadata = {
  title: "Holy Qurbana Timings",
  description:
    "Sunday and weekday Holy Qurbana timings, confession, prayer and special feast schedules at St. Mary's Orthodox Syrian Church, Alencherry.",
};

export default function HolyMassPage() {
  return <HolyMassContent />;
}

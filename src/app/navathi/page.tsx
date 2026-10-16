import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { NavathiContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Navathi Celebrations",
  path: "/navathi/",
  description:
    "Navathi, the 90th anniversary of St. Mary's Church, Alencherry (1937 – 2027): the programme calendar for the year of celebrations.",
});

export default function NavathiPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return <NavathiContent today={today.toISOString()} />;
}

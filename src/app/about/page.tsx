import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AboutContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "About the Parish",
  path: "/about/",
  description:
    "The history, mission, vision and patron saint of St. Mary's Church, Alencherry — a Malankara Orthodox Syrian parish rooted in the tradition of the St. Thomas Christians of Kerala.",
});

export default function AboutPage() {
  return <AboutContent />;
}

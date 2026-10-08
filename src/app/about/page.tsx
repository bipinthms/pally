import type { Metadata } from "next";
import { AboutContent } from "./content";

export const metadata: Metadata = {
  title: "About the Parish",
  description:
    "The history, mission, vision and patron saint of St. Mary's Church, Alencherry — a Malankara Orthodox Syrian parish rooted in the tradition of the St. Thomas Christians of Kerala.",
};

export default function AboutPage() {
  return <AboutContent />;
}

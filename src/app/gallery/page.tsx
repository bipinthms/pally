import type { Metadata } from "next";
import { GalleryContent } from "./content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A gallery of worship, feasts and fellowship at St. Mary's Church, Alencherry — browse photographs by category and watch highlights from parish celebrations.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}

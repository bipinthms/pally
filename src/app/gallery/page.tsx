import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { GalleryContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  path: "/gallery/",
  description:
    "A gallery of worship, feasts and fellowship at St. Mary's Church, Alencherry — browse photographs by category and by parish organization.",
});

export default function GalleryPage() {
  return <GalleryContent />;
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { listPhotos } from "@/lib/photos";
import { ClergyContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Our Clergy",
  path: "/clergy/",
  description:
    "Meet the priests who shepherd St. Mary's Church, Alencherry — our Catholicos, diocesan Metropolitan, parish priest, sacrist, and the former vicars who have served our community.",
});

export default function ClergyPage() {
  return <ClergyContent photos={listPhotos()} />;
}

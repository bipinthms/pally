import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";
import { ClergyContent } from "./content";

export const metadata: Metadata = {
  title: "Our Clergy",
  description:
    "Meet the priests who shepherd St. Mary's Church, Alencherry — our Catholicos, diocesan Metropolitan, parish priest, managing committee, and the former vicars who have served our community.",
};

export default function ClergyPage() {
  // Read at build time: every photo under public/images (including subfolders),
  // as forward-slash paths relative to it, e.g. "committee/members/jose-k-c.jpeg".
  const photos = readdirSync(path.join(process.cwd(), "public/images"), { recursive: true })
    .map((file) => String(file).split(path.sep).join("/"));
  return <ClergyContent photos={photos} />;
}

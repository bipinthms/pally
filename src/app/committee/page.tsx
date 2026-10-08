import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { listPhotos } from "@/lib/photos";
import { CommitteeContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Parish Committee",
  path: "/committee/",
  description:
    "Meet the managing committee, committee members and auditors who serve alongside the Vicar at St. Mary's Church, Alencherry.",
});

export default function CommitteePage() {
  return <CommitteeContent photos={listPhotos()} />;
}

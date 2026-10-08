import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Every photo under public/images (including subfolders), as forward-slash paths
 * relative to it, e.g. "committee/members/jose-k-c.jpeg". Server-only: call it from
 * a page component so it runs at build time.
 */
export function listPhotos(): string[] {
  return readdirSync(path.join(process.cwd(), "public/images"), { recursive: true })
    .map((file) => String(file).split(path.sep).join("/"));
}

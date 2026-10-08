import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { assetPath } from "@/lib/images";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.shortName,
    description: site.description,
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#fbf8f2",
    theme_color: "#6e1423",
    icons: [
      { src: assetPath("/favicon.svg"), sizes: "any", type: "image/svg+xml" },
    ],
  };
}

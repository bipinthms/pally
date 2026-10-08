import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OrganizationsContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Parish Organizations",
  path: "/organizations/",
  description:
    "The ministries and movements of St. Mary's Church, Alencherry — Sunday School, OCYM, MGOCSM, Martha Mariam Vanitha Samajam, the Parish Choir, Prayer Groups, Edavaka Mission and more.",
});

export default function OrganizationsPage() {
  return <OrganizationsContent />;
}

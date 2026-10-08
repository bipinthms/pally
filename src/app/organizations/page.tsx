import type { Metadata } from "next";
import { OrganizationsContent } from "./content";

export const metadata: Metadata = {
  title: "Parish Organizations",
  description:
    "The ministries and movements of St. Mary's Church, Alencherry — Sunday School, OCYM, MGOCSM, Martha Mariam Vanitha Samajam, the Parish Choir, Prayer Fellowship, Edavaka Mission and more.",
};

export default function OrganizationsPage() {
  return <OrganizationsContent />;
}

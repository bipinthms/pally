import type { Metadata } from "next";
import QRCode from "qrcode";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { OfferingsContent } from "./content";

// Reached from the Google Form confirmation, so it stays out of the menu and search results.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Complete Your Offering",
    path: "/offerings/",
    description: "Complete your offering to St. Mary's Orthodox Syrian Church, Alencherry using any UPI app.",
  }),
  robots: { index: false },
};

export default async function OfferingsPage() {
  const qrSvg = await QRCode.toString(site.offering.upiUrl, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#17100e", light: "#00000000" },
  });
  return <OfferingsContent qrSvg={qrSvg} />;
}

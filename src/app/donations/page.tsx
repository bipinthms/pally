import type { Metadata } from "next";
import QRCode from "qrcode";
import { site } from "@/lib/site";
import { getData } from "@/lib/data";
import { DonationsContent } from "./content";

export const metadata: Metadata = {
  title: "Donations & Giving",
  description:
    "Support the worship, upkeep and charitable works of St. Mary's Church, Alencherry through UPI, bank transfer or online giving. Every gift is received with gratitude.",
};

async function upiQr(upiId: string) {
  const uri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(site.legalName)}&cu=INR`;
  return QRCode.toString(uri, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#17100e", light: "#00000000" },
  });
}

export default async function DonationsPage() {
  // The UPI ID is the same in every language, so the QR is generated once at build time.
  const qrSvg = await upiQr(getData("en").giving.upiId);
  return <DonationsContent qrSvg={qrSvg} />;
}

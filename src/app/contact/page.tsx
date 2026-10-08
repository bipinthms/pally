import type { Metadata } from "next";
import { ContactContent } from "./content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with St. Mary's Church, Alencherry — parish office address, phone, email, office timings and directions. We would love to hear from you.",
};

export default function ContactPage() {
  return <ContactContent />;
}

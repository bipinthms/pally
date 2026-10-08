import { site } from "@/lib/site";

/**
 * The site is a static export with no backend, so forms hand the visitor's
 * message to WhatsApp (or their email app) addressed to the parish, ready to send.
 */
export type ComposedMessage = { subject: string; lines: [label: string, value: string][] };

function body({ lines }: ComposedMessage) {
  return lines
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join("\n");
}

export function whatsappHref(msg: ComposedMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`${msg.subject}\n\n${body(msg)}`)}`;
}

export function mailtoHref(msg: ComposedMessage) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(body(msg))}`;
}

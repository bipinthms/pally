/**
 * Site-wide configuration. Edit these values to update contact details,
 * social links and navigation across the entire website.
 */

export const site = {
  name: "St. Mary's Orthodox Syrian Church",
  shortName: "St. Mary's Church, Alencherry",
  legalName: "St. Mary's Orthodox Syrian Church, Alencherry",
  tagline: "A Malankara Orthodox Syrian Parish",
  patron: "St. Mary, the Theotokos",
  diocese: "Thiruvananthapuram Diocese",
  rite: "Malankara Orthodox Syrian Church",
  established: 1937,
  description:
    "St. Mary's Orthodox Syrian Church, Alencherry is an active Malankara Orthodox Syrian parish in Anchal, Kollam — a peaceful home of prayer, worship, counselling and spiritual guidance, welcoming all who seek God's grace.",
  url: "https://www.alencherrychurch.org",
  locale: "en_IN",

  contact: {
    addressLines: [
      "Alenchery Onthupacha Road",
      "Alencherry, Anchal",
      "Kollam District",
      "Kerala 691306, India",
    ],
    addressShort: "Alencherry, Anchal, Kollam, Kerala 691306",
    phone: "+91 88914 12360",
    phoneHref: "+918891412360",
    landline: "0475-2274426",
    landlineHref: "+914752274426",
    whatsapp: "918891412360", // digits only, country code first
    email: "alencherrychurch@gmail.com",
    mapEmbed:
      "https://www.google.com/maps?q=St+Mary%27s+Orthodox+Church+Alayamon+Anchal+Kollam+Kerala+691306&output=embed",
    mapLink:
      "https://maps.google.com/?q=St+Mary%27s+Orthodox+Church+Alayamon+Anchal+Kollam+Kerala+691306",
  },

  prayerForm: {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfk9ONrwEoQouvASXHysRBZgDeLESi6PDDaBD5Ht4qy3ANtsA/viewform",
    qr: "/images/qr/prayer-request-form.svg",
    qrPng: "/images/qr/prayer-request-form.png",
  },

  social: {
    facebook: "https://www.facebook.com/alencherrypally/",
    instagram: "https://www.instagram.com/alencherry_pally/",
    // Add the parish channel URL to show the YouTube icon; empty links are hidden.
    youtube: "",
  },
} as const;

export type NavKey =
  | "home" | "about" | "holyMass" | "clergy" | "committee" | "organizations"
  | "gallery" | "events" | "prayer" | "donations" | "contact";

export type NavItem = {
  key: NavKey;
  label: string; // English fallback; translated labels come from the dictionary
  href: string;
};

export const navItems: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "holyMass", label: "Holy Qurbana", href: "/holy-mass" },
  { key: "clergy", label: "Clergy", href: "/clergy" },
  { key: "committee", label: "Committee", href: "/committee" },
  { key: "organizations", label: "Organizations", href: "/organizations" },
  { key: "gallery", label: "Gallery", href: "/gallery" },
  { key: "events", label: "Events", href: "/events" },
  { key: "prayer", label: "Prayer Requests", href: "/prayer-requests" },
  // Temporarily routed to Contact until online giving is ready.
  { key: "donations", label: "Donations", href: "/contact" },
  { key: "contact", label: "Contact", href: "/contact" },
];

/**
 * The nav item for the current page. When several items share a page (Donations
 * and Contact), the last one wins, so only one item is ever marked current.
 */
export function activeNavItem(pathname: string): NavItem | undefined {
  return navItems.findLast((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)));
}

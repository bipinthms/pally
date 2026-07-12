/**
 * Site-wide configuration. Edit these values to update contact details,
 * social links and navigation across the entire website.
 */

export const site = {
  name: "Alencherry Pally",
  shortName: "Alencherry Pally",
  legalName: "St. Mary's Syro-Malabar Catholic Church, Alencherry",
  tagline: "A Syro-Malabar Catholic Parish",
  patron: "St. Mary, Mother of God",
  diocese: "Archdiocese of Ernakulam–Angamaly",
  rite: "Syro-Malabar Catholic Church",
  established: 1898,
  description:
    "Alencherry Pally is a Syro-Malabar Catholic parish in Kerala — a peaceful home of prayer, heritage and community, welcoming all who seek God's grace.",
  url: "https://alencherrypally.org",
  locale: "en_IN",

  contact: {
    addressLines: ["Alencherry", "Ernakulam District", "Kerala 683 XXX", "India"],
    addressShort: "Alencherry, Ernakulam, Kerala, India",
    phone: "+91 484 000 0000",
    phoneHref: "+914840000000",
    whatsapp: "919000000000", // digits only, country code first
    email: "office@alencherrypally.org",
    // Replace with the parish's precise coordinates.
    mapEmbed:
      "https://www.google.com/maps?q=Ernakulam,Kerala,India&output=embed",
    mapLink: "https://maps.google.com/?q=Ernakulam,Kerala,India",
  },

  office: {
    weekdays: "9:00 AM – 1:00 PM, 3:00 PM – 5:00 PM",
    saturday: "9:00 AM – 1:00 PM",
    sunday: "After all Holy Masses",
  },

  social: {
    facebook: "https://www.facebook.com/alencherrypally/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;

export type NavKey =
  | "home" | "about" | "holyMass" | "clergy" | "organizations"
  | "gallery" | "events" | "prayer" | "donations" | "contact";

export type NavItem = {
  key: NavKey;
  label: string; // English fallback; translated labels come from the dictionary
  href: string;
};

export const navItems: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "holyMass", label: "Holy Mass", href: "/holy-mass" },
  { key: "clergy", label: "Clergy", href: "/clergy" },
  { key: "organizations", label: "Organizations", href: "/organizations" },
  { key: "gallery", label: "Gallery", href: "/gallery" },
  { key: "events", label: "Events", href: "/events" },
  { key: "prayer", label: "Prayer Requests", href: "/prayer-requests" },
  { key: "donations", label: "Donations", href: "/donations" },
  { key: "contact", label: "Contact", href: "/contact" },
];

/** Primary links surfaced in the top navigation bar (rest live in a menu). */
export const primaryNav: NavItem[] = navItems.filter((n) =>
  ["/", "/about", "/holy-mass", "/clergy", "/organizations", "/gallery", "/events", "/contact"].includes(
    n.href,
  ),
);

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
  url: "https://stmarysalayamon.org",
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
    whatsapp: "918891412360", // digits only, country code first
    email: "alencherrychurch@gmail.com",
    mapEmbed:
      "https://www.google.com/maps?q=St+Mary%27s+Orthodox+Church+Alayamon+Anchal+Kollam+Kerala+691306&output=embed",
    mapLink:
      "https://maps.google.com/?q=St+Mary%27s+Orthodox+Church+Alayamon+Anchal+Kollam+Kerala+691306",
  },

  office: {
    weekdays: "Open daily from 6:00 AM",
    saturday: "Open daily from 6:00 AM",
    sunday: "Holy Qurbana in the morning",
  },

  social: {
    facebook: "https://www.facebook.com/alencherrypally/?ref=1",
    instagram: "https://www.instagram.com/alencherry_pally/",
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
  { key: "holyMass", label: "Holy Qurbana", href: "/holy-mass" },
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

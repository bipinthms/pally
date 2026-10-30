import type { AlbumKey, ImageKey } from "@/lib/images";
import { pick, type Bi, type Locale } from "@/lib/i18n/config";

/* ------------------------------------------------------------------ */
/*  Localized output types (what components receive)                  */
/* ------------------------------------------------------------------ */
export type Verse = { text: string; ref: string };
export type MassSlot = { day: string; times: string[]; note?: string };
export type Devotion = { title: string; detail: string; extra: string; icon: string };
export type SpecialSchedule = { occasion: string; dates: string; detail: string };
export type Announcement = {
  title: string; date: string; body: string; tag: string;
  /** Slug of the event this notice is about; the card links to its page. */
  event?: string;
};
export type EventCategory = "Feast" | "Retreat" | "Sacrament" | "Community" | "Youth" | "News";
/** One day of an event's programme. `date` is YYYY-MM-DD. */
export type EventDay = {
  date: string;
  items: { time: string; title: string; lines?: string[] }[];
};
export type ChurchEvent = {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  category: EventCategory;
  image: ImageKey;
  excerpt: string;
  featured?: boolean;
  /** Photo album shown on the event page and in the Gallery's Parish News tab. */
  album?: AlbumKey;
  /** Paragraphs for the event page; the excerpt is shown when absent. */
  details?: string[];
  /** Day-by-day programme shown on the event page. */
  schedule?: EventDay[];
};
/** A programme of the Navathi year. `date` is YYYY-MM-DD, or YYYY-MM while the day is not fixed. */
export type NavathiProgram = {
  date: string;
  endDate?: string;
  time?: string;
  title: string;
  description: string;
  location: string;
  /** Slug of the event page with details and photos, once the programme has one. */
  event?: string;
};
export type Clergy = {
  name: string;
  role: string;
  image: ImageKey;
  since?: string;
  bio: string;
  quote?: string;
};
export type Organization = {
  slug: string;
  name: string;
  malayalam?: string;
  short: string;
  description: string;
  meeting: string;
  icon: string;
  image: ImageKey;
  photos: ImageKey[];
  audience: string;
  /** Per-unit meeting times, for organisations that meet as several groups. */
  schedule?: { name: string; day: string; time: string }[];
};
export type MissionProject = { name: string; malayalam: string; tagline: string; description: string; icon: string };
export type GalleryCategory = "Church" | "Feasts" | "Liturgy" | "Community" | "Heritage";
export type GalleryItem = {
  image: ImageKey;
  title: string;
  category: GalleryCategory;
  span?: "tall" | "wide";
};
export type ParishVideo = { title: string; poster: ImageKey; youtubeId: string; duration: string };
export type Testimonial = { quote: string; name: string; role: string };
export type TimelineEvent = { year: string; date?: string; title: string; body: string };

export const galleryCategories = [
  "All", "Church", "Feasts", "Liturgy", "Community", "Heritage",
] as const;

/* ------------------------------------------------------------------ */
/*  Raw bilingual content                                             */
/* ------------------------------------------------------------------ */
const B = (en: string, ml: string): Bi => ({ en, ml });

const versesRaw: { text: Bi; ref: Bi }[] = [
  {
    text: B(
      "How lovely is your dwelling place, O Lord of hosts! My soul longs for the courts of the Lord.",
      "സൈന്യങ്ങളുടെ കർത്താവേ, അങ്ങയുടെ വാസസ്ഥലം എത്ര മനോഹരം! കർത്താവിന്റെ അങ്കണങ്ങൾക്കായി എന്റെ ആത്മാവ് വാഞ്ഛിക്കുന്നു.",
    ),
    ref: B("Psalm 84:1–2", "സങ്കീർത്തനം 84:1–2"),
  },
  {
    text: B(
      "Come to me, all you who are weary and burdened, and I will give you rest.",
      "അധ്വാനിക്കുന്നവരും ഭാരം ചുമക്കുന്നവരുമായ എല്ലാവരും എന്റെ അടുക്കൽ വരുവിൻ; ഞാൻ നിങ്ങൾക്ക് ആശ്വാസം നൽകും.",
    ),
    ref: B("Matthew 11:28", "മത്തായി 11:28"),
  },
  {
    text: B(
      "The Lord is my shepherd; I shall not want.",
      "കർത്താവ് എന്റെ ഇടയനാകുന്നു; എനിക്ക് ഒന്നിനും കുറവുണ്ടാകില്ല.",
    ),
    ref: B("Psalm 23:1", "സങ്കീർത്തനം 23:1"),
  },
  {
    text: B(
      "I am the light of the world. Whoever follows me will never walk in darkness.",
      "ഞാൻ ലോകത്തിന്റെ പ്രകാശമാകുന്നു. എന്നെ അനുഗമിക്കുന്നവൻ ഒരിക്കലും അന്ധകാരത്തിൽ നടക്കുകയില്ല.",
    ),
    ref: B("John 8:12", "യോഹന്നാൻ 8:12"),
  },
];

const sundayMassRaw = [
  { day: B("Sunday", "ഞായർ"), times: ["7:00 AM"], note: B("Malayalam", "മലയാളം") },
];

const weekdayMassRaw = [
  { day: B("Wednesday", "ബുധൻ"), times: ["6:30 AM"], note: B("Intercession of St. Mary", "വിശുദ്ധ മറിയത്തിന്റെ മാധ്യസ്ഥ്യം") },
];

const devotionsRaw = [
  {
    title: B("Holy Confession", "വിശുദ്ധ കുമ്പസാരം"),
    detail: B("Every Saturday · 5:00 – 6:00 PM", "എല്ലാ ശനിയാഴ്ചയും · 5:00 – 6:00 PM"),
    extra: B("Or by appointment with the vicar", "അല്ലെങ്കിൽ വികാരിയുമായി മുൻകൂട്ടി സമയം നിശ്ചയിച്ച്"),
    icon: "HeartHandshake",
  },
  {
    title: B("Evening Prayer", "സന്ധ്യാ പ്രാർത്ഥന"),
    detail: B("Daily — Sandhya Namaskaram", "ദിവസേന — സന്ധ്യാ നമസ്കാരം"),
    extra: B("Every day · 6:00 PM", "എല്ലാ ദിവസവും · 6:00 PM"),
    icon: "Church",
  },
  {
    title: B("Intercessory Prayers (Ardram)", "മാധ്യസ്ഥ്യ പ്രാർത്ഥന (ആർദ്രം)"),
    detail: B("To St. Mary", "വിശുദ്ധ മറിയത്തോട്"),
    extra: B("Every Wednesday · 6:00 PM", "എല്ലാ ബുധനാഴ്ചയും · 6:00 PM"),
    icon: "Sparkles",
  },
  {
    title: B("Anointing & Home Visits", "രോഗീലേപനവും ഭവന സന്ദർശനവും"),
    detail: B("For the sick and elderly", "രോഗികൾക്കും വൃദ്ധർക്കും"),
    extra: B("Please call the parish office to arrange a visit", "സന്ദർശനം ക്രമീകരിക്കാൻ ഇടവക ഓഫീസിൽ വിളിക്കുക"),
    icon: "Cross",
  },
];

const specialSchedulesRaw = [
  {
    occasion: B("Nativity of Mary — Parish Feast", "പരിശുദ്ധ അമ്മയുടെ ജനനത്തിരുനാൾ — ഇടവക പെരുന്നാൾ"),
    dates: B("31 Aug – 8 Sep", "ഓഗ 31 – സെപ് 8"),
    detail: B("The eight-day Ettu Nombu, flag hoisting & solemn procession.", "എട്ടു ദിവസത്തെ നോമ്പ്, കൊടിയേറ്റ്, പ്രദക്ഷിണം."),
  },
  {
    occasion: B("Christmas", "ക്രിസ്മസ്"),
    dates: B("24 – 25 Dec", "ഡിസ 24 – 25"),
    detail: B("Carol service 10:00 PM · Midnight Qurbana 11:30 PM · Christmas Day 7:00 & 9:00 AM.", "കരോൾ 10:00 PM · പാതിര കുർബ്ബാന 11:30 PM · ക്രിസ്മസ് ദിനം 7:00 & 9:00 AM."),
  },
  {
    occasion: B("Holy Week & Easter", "വിശുദ്ധവാരവും ഉയിർപ്പും"),
    dates: B("Palm Sunday – Easter", "ഓശാന ഞായർ – ഉയിർപ്പ്"),
    detail: B("Pesaha Thursday, Good Friday Way of the Cross & Easter Vigil.", "പെസഹാ വ്യാഴം, ദുഃഖവെള്ളി കുരിശിന്റെ വഴി, ഉയിർപ്പു തിരുനാൾ."),
  },
  {
    occasion: B("Shunoyo — Dormition of St. Mary", "ശുനോയോ — വിശുദ്ധ മറിയത്തിന്റെ വാങ്ങിപ്പ്"),
    dates: B("15 Aug", "ഓഗ 15"),
    detail: B("Preceded by the fifteen-day Shunoyo Nombu (1–15 Aug); solemn Holy Qurbana at 8:00 AM.", "പതിനഞ്ചു നോമ്പിനു ശേഷം; 8:00 AM-ന് ആഘോഷ വിശുദ്ധ കുർബ്ബാന."),
  },
];

const announcementsRaw = [
  {
    title: B("124th Memorial Feast of St. Gregorios of Parumala", "പരിശുദ്ധ പരുമല തിരുമേനിയുടെ 124-ാം ഓർമ്മപ്പെരുന്നാൾ"),
    date: B("1–8 Nov 2026", "1–8 നവം 2026"),
    body: B(
      "The memorial feast of St. Gregorios of Parumala, whose holy relics are enshrined in our church, is celebrated from 6 to 8 November. " +
        "Sun 1 Nov — flag hoisting after the 7:45 AM Holy Qurbana. " +
        "Fri 6 Nov — 6:00 PM evening prayer, 6:30 PM hymns, 7:00 PM gospel convention by Rev. Fr. Shiju Baby, Adoor. " +
        "Sat 7 Nov — 7:15 AM Holy Qurbana; 6:00 PM evening prayer at Puthayam Kurishady, followed by the Raza procession to the church. " +
        "Sun 8 Nov — 7:45 AM Holy Qurbana on three altars, incense before the holy relics, and honouring of parishioners who have turned 90. " +
        "All the faithful are warmly invited.",
      "നമ്മുടെ ദേവാലയത്തിൽ തിരുശേഷിപ്പ് സ്ഥാപിച്ചിരിക്കുന്ന പരിശുദ്ധ പരുമല തിരുമേനിയുടെ ഓർമ്മപ്പെരുന്നാൾ നവംബർ 6 മുതൽ 8 വരെ ആചരിക്കുന്നു. " +
        "നവം 1 ഞായർ — 7:45 AM വി. കുർബ്ബാനയെ തുടർന്ന് പെരുന്നാൾ കൊടിയേറ്റ്. " +
        "നവം 6 വെള്ളി — 6:00 PM സന്ധ്യാനമസ്കാരം, 6:30 PM ഗാനശുശ്രൂഷ, 7:00 PM വചനശുശ്രൂഷ (റവ. ഫാ. ഷിജു ബേബി, അടൂർ). " +
        "നവം 7 ശനി — 7:15 AM വി. കുർബ്ബാന; 6:00 PM പുത്തയം കുരിശ്ശടിയിൽ സന്ധ്യാനമസ്കാരം, തുടർന്ന് ദേവാലയത്തിലേക്ക് റാസ. " +
        "നവം 8 ഞായർ — 7:45 AM വി. മൂന്നിന്മേൽ കുർബ്ബാന, തിരുശേഷിപ്പിങ്കൽ ധൂപാർപ്പണം, 90 വയസ്സ് പൂർത്തിയായ ഇടവകാംഗങ്ങളെ ആദരിക്കൽ. " +
        "എല്ലാ വിശ്വാസികളെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.",
    ),
    tag: B("Feast", "പെരുന്നാൾ"),
    event: "st-gregorios-feast-2026",
  },
  {
    title: B("Parish Feast Nombu begins", "ഇടവക പെരുന്നാൾ നോമ്പ് ആരംഭിക്കുന്നു"),
    date: B("31 Aug 2026", "31 ഓഗ 2026"),
    body: B(
      "The eight-day Ettu Nombu in honour of St. Mary begins with flag hoisting after the 6:00 PM evening prayer (Sandhya Namaskaram). All parishioners are warmly invited.",
      "പരിശുദ്ധ അമ്മയുടെ ബഹുമാനാർത്ഥമുള്ള എട്ടു ദിവസത്തെ നോമ്പ് 6:00 PM സന്ധ്യാനമസ്കാരത്തിനു ശേഷം കൊടിയേറ്റോടെ ആരംഭിക്കുന്നു. എല്ലാ ഇടവകാംഗങ്ങളെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.",
    ),
    tag: B("Feast", "പെരുന്നാൾ"),
  },
  {
    title: B("Sunday School reopens for the new year", "പുതുവർഷത്തേക്ക് വേദപാഠം പുനരാരംഭിക്കുന്നു"),
    date: B("14 Jul 2026", "14 ജൂലൈ 2026"),
    body: B(
      "Sunday School classes resume after the vacation. Kindly ensure children are enrolled at the parish office before the first session.",
      "അവധിക്കു ശേഷം ഞായറാഴ്ച മതബോധന ക്ലാസുകൾ പുനരാരംഭിക്കുന്നു. ആദ്യ ക്ലാസിനു മുമ്പ് കുട്ടികളെ ഇടവക ഓഫീസിൽ ചേർക്കുക.",
    ),
    tag: B("Sunday School", "വേദപാഠം"),
  },
  {
    title: B("Family units — August prayer meeting", "കുടുംബ യൂണിറ്റുകൾ — ഓഗസ്റ്റ് പ്രാർത്ഥനായോഗം"),
    date: B("20 Jul 2026", "20 ജൂലൈ 2026"),
    body: B(
      "House prayer gatherings for all koottaymas (units) are scheduled through August. Unit leaders will share the roster this week.",
      "എല്ലാ കൂട്ടായ്മകൾക്കുമുള്ള ഭവന പ്രാർത്ഥനായോഗങ്ങൾ ഓഗസ്റ്റിലുടനീളം നടക്കും. യൂണിറ്റ് നേതാക്കൾ ഈ ആഴ്ച സമയക്രമം അറിയിക്കും.",
    ),
    tag: B("Community", "കൂട്ടായ്മ"),
  },
];

const upcomingFeastRaw = {
  title: B("Nativity of Mary — Parish Feast", "പരിശുദ്ധ അമ്മയുടെ ജനനത്തിരുനാൾ — ഇടവക പെരുന്നാൾ"),
  malayalam: B("Ettu Perunnal", "എട്ട് പെരുന്നാൾ"),
  date: "2027-09-08T08:00:00+05:30",
  blurb: B(
    "Our parish gathers for eight days of grace — the Ettu Nombu, procession and the solemn feast of the Nativity of the Blessed Virgin Mary.",
    "എട്ടു ദിവസത്തെ കൃപയ്ക്കായി ഞങ്ങളുടെ ഇടവക ഒരുമിക്കുന്നു — നോമ്പ്, പ്രദക്ഷിണം, പരിശുദ്ധ കന്യാമറിയത്തിന്റെ ജനനത്തിന്റെ ആഘോഷ തിരുനാൾ.",
  ),
  image: "churchAlt" as ImageKey,
};

const eventsRaw: {
  slug: string; title: Bi; date: string; endDate?: string; time: Bi; location: Bi;
  category: EventCategory; image: ImageKey; excerpt: Bi; featured?: boolean; album?: AlbumKey;
  details?: Bi[];
  schedule?: { date: string; items: { time: string; title: Bi; lines?: Bi[] }[] }[];
}[] = [
  {
    slug: "martha-mariam-pilgrimage-centre",
    title: B("International Martha Mariam Pilgrimage Centre", "അന്താരാഷ്ട്ര മർത്തമറിയം തീർത്ഥാടന കേന്ദ്രം"),
    date: "2010-09-03", time: B("Declaration", "പ്രഖ്യാപനം"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "News", image: "marthaMariamPilgrimageCentre", album: "marthaMariamPilgrimageCentre",
    excerpt: B(
      "The church was declared an International Martha Mariam Pilgrimage Centre by H.H. Baselios Marthoma Didymos I Catholicos.",
      "പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ ദിദിമോസ് പ്രഥമൻ കാതോലിക്കാ ബാവ നമ്മുടെ ദേവാലയത്തെ അന്താരാഷ്ട്ര മർത്തമറിയം തീർത്ഥാടന കേന്ദ്രമായി പ്രഖ്യാപിച്ചു.",
    ),
  },
  {
    slug: "abuna-yoosuf-visit-2016",
    title: B("Visit of Abuna Yoosuf", "അബൂന യൂസഫ് തിരുമേനിയുടെ സന്ദർശനം"),
    date: "2016-08-15", time: B("Reception", "സ്വീകരണം"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "News", image: "abunaYoosuf", album: "abunaYoosuf",
    excerpt: B(
      "Abuna Yoosuf visited our church and was received by the parish with chenda melam and a ceremonial procession to the pilgrimage centre.",
      "അബൂന യൂസഫ് തിരുമേനി നമ്മുടെ ദേവാലയം സന്ദർശിച്ചു. ചെണ്ടമേളത്തോടും ആഘോഷമായ ഘോഷയാത്രയോടും കൂടി ഇടവക തിരുമേനിയെ തീർത്ഥാടന കേന്ദ്രത്തിലേക്ക് സ്വീകരിച്ചു.",
    ),
  },
  {
    slug: "parumala-relics-2026",
    title: B("Relics of St. Gregorios of Parumala enshrined", "പരുമല മാർ ഗ്രീഗോറിയോസിന്റെ തിരുശേഷിപ്പ് സ്ഥാപിച്ചു"),
    date: "2026-09-04", time: B("During the Parish Feast", "ഇടവക പെരുന്നാളിനോടനുബന്ധിച്ച്"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "News", image: "relicsStGregorios", album: "relicsStGregorios",
    excerpt: B(
      "H.H. Baselios Marthoma Mathews III, Catholicos of the East and Malankara Metropolitan, enshrined the relics of St. Gregorios of Parumala in our church.",
      "പൗരസ്ത്യ കാതോലിക്കായും മലങ്കര മെത്രാപ്പോലീത്തയുമായ പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ മാത്യൂസ് തൃതീയൻ കാതോലിക്കാ ബാവ പരുമല മാർ ഗ്രീഗോറിയോസ് തിരുമേനിയുടെ തിരുശേഷിപ്പ് നമ്മുടെ പള്ളിയിൽ സ്ഥാപിച്ചു.",
    ),
  },
  {
    slug: "navathi-inauguration",
    title: B("Navathi (90th Anniversary) Inaugurated", "നവതി ആഘോഷങ്ങളുടെ ഉദ്ഘാടനം"),
    date: "2026-09-05", time: B("During the Parish Feast", "ഇടവക പെരുന്നാളിനോടനുബന്ധിച്ച്"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "News", image: "navathiInauguration", album: "navathiInauguration",
    excerpt: B(
      "The Navathi celebrations marking 90 years since the consecration of our church in 1937 were formally inaugurated.",
      "1937-ൽ നമ്മുടെ ദേവാലയം കൂദാശ ചെയ്തതിന്റെ 90 വർഷങ്ങൾ അനുസ്മരിക്കുന്ന നവതി ആഘോഷങ്ങൾ ഔദ്യോഗികമായി ഉദ്ഘാടനം ചെയ്തു.",
    ),
  },
  {
    slug: "st-george-feast-2027",
    title: B("Feast of St. George", "വിശുദ്ധ ഗീവർഗീസ് സഹദായുടെ പെരുന്നാൾ"),
    date: "2027-05-09", time: B("See parish notices", "ഇടവക അറിയിപ്പുകൾ കാണുക"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Feast", image: "stGeorge",
    excerpt: B(
      "The parish commemorates the great martyr St. George with festal Holy Qurbana and intercessory prayers.",
      "മഹാരക്തസാക്ഷിയായ വിശുദ്ധ ഗീവർഗീസ് സഹദായെ ഇടവക തിരുനാൾ കുർബ്ബാനയോടും മദ്ധ്യസ്ഥ പ്രാർത്ഥനയോടും കൂടി അനുസ്മരിക്കുന്നു.",
    ),
  },
  {
    slug: "st-gregorios-feast-2026",
    title: B("124th Memorial Feast of St. Gregorios of Parumala", "പരിശുദ്ധ പരുമല തിരുമേനിയുടെ 124-ാം ഓർമ്മപ്പെരുന്നാൾ"),
    date: "2026-11-06", endDate: "2026-11-08",
    time: B("From 6:00 PM, Fri 6 Nov", "നവം 6 വെള്ളി 6:00 PM മുതൽ"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Feast", image: "parumalaPerunnal",
    excerpt: B(
      "The memorial feast of St. Gregorios of Parumala, whose holy relics are enshrined in our church — gospel convention, Raza procession from Puthayam Kurishady and Holy Qurbana on three altars. Flag hoisting on Sunday 1 November.",
      "നമ്മുടെ ദേവാലയത്തിൽ തിരുശേഷിപ്പ് സ്ഥാപിച്ചിരിക്കുന്ന പരിശുദ്ധ പരുമല തിരുമേനിയുടെ ഓർമ്മപ്പെരുന്നാൾ — വചനശുശ്രൂഷ, പുത്തയം കുരിശ്ശടിയിൽ നിന്നുള്ള റാസ, വി. മൂന്നിന്മേൽ കുർബ്ബാന. നവംബർ 1 ഞായറാഴ്ച കൊടിയേറ്റ്.",
    ),
    featured: true,
    details: [
      B(
        "Beloved in the Lord, the memorial feast of St. Gregorios of Parumala will be celebrated with devotion from 6 to 8 November 2026 at St. Mary's Orthodox Church, Alencherry — the International Martha Mariam Pilgrimage Centre, blessed with the holy relics of St. Gregorios of Parumala.",
        "കർത്താവിൽ പ്രിയരേ, അന്തർദേശീയ മർത്തമറിയം തീർത്ഥാടന കേന്ദ്രവും പരിശുദ്ധ പരുമല തിരുമേനിയുടെ തിരുശേഷിപ്പിനാൽ അനുഗ്രഹീതവുമായ ആലഞ്ചേരി സെന്റ് മേരീസ് ഓർത്തഡോക്സ് പള്ളിയിലെ പരിശുദ്ധ പരുമല തിരുമേനിയുടെ ഓർമ്മ പെരുന്നാൾ 2026 നവംബർ 6 മുതൽ 8 വരെയുള്ള തീയതികളിൽ ഭക്തിപുരസരം ആചരിക്കുന്നു.",
      ),
      B(
        "We welcome all the faithful, in the name of the Lord, to take part in the feast services and receive His blessings.",
        "പെരുന്നാൾ ശുശ്രൂഷകളിൽ വന്ന് സംബന്ധിച്ച് അനുഗ്രഹം പ്രാപിക്കുവാൻ എല്ലാ വിശ്വാസികളെയും കർത്തൃനാമത്തിൽ സ്വാഗതം ചെയ്യുന്നു.",
      ),
      B(
        "On behalf of the parish — Fr. Varghese T. Varghese (Vicar), Philip Aruvickal (Trustee), K. V. Joseph (Secretary).",
        "എന്ന് ഇടവകയ്ക്കുവേണ്ടി — ഫാ. വർഗീസ് ടി. വർഗീസ് (വികാരി), ഫിലിപ്പ് അരുവിക്കൽ (ട്രസ്റ്റി), കെ. വി. ജോസഫ് (സെക്രട്ടറി).",
      ),
      B(
        "The holy relics of St. Gregorios of Parumala were enshrined in this parish on 4 September 2026 by H.H. Baselios Marthoma Mathews III, Catholicos of the East.",
        "2026 സെപ്റ്റംബർ നാലാം തീയതി പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ മാത്യൂസ് തൃതീയൻ കാതോലിക്കാ ബാവ പരിശുദ്ധ പരുമല തിരുമേനിയുടെ തിരുശേഷിപ്പ് ഈ ഇടവകയിൽ സംസ്ഥാപിച്ചു.",
      ),
    ],
    schedule: [
      {
        date: "2026-11-01",
        items: [
          { time: "7:00 AM", title: B("Morning Prayer", "പ്രഭാത നമസ്കാരം") },
          {
            time: "7:45 AM",
            title: B("Holy Qurbana", "വി. കുർബ്ബാന"),
            lines: [
              B("Feast flag hoisting", "പെരുന്നാൾ കൊടിയേറ്റ്"),
              B("Rev. Fr. Varghese T. Varghese", "റവ. ഫാ. വർഗീസ് ടി. വർഗീസ്"),
              B(
                "Nercha Vilambu (offered by Jacob K. Varghese, Kaithadiyil Puthen Veedu)",
                "നേർച്ചവിളമ്പ് (സമർപ്പണം: ജേക്കബ് കെ. വർഗ്ഗീസ്, കൈതാടിയിൽ പുത്തൻവീട്)",
              ),
            ],
          },
        ],
      },
      {
        date: "2026-11-06",
        items: [
          { time: "6:00 PM", title: B("Evening Prayer", "സന്ധ്യാനമസ്കാരം") },
          { time: "6:30 PM", title: B("Hymns", "ഗാനശുശ്രൂഷ") },
          {
            time: "7:00 PM",
            title: B("Gospel Convention", "വചന ശുശ്രൂഷ"),
            lines: [
              B("Rev. Fr. Shiju Baby, Adoor", "റവ. ഫാ. ഷിജു ബേബി, അടൂർ"),
              B("(Offered by Soniya Jaison, Jais Villa)", "(സമർപ്പണം: സോണിയ ജെയ്സൺ, ജെയിസ് വില്ല)"),
              B("Dedication prayer", "സമർപ്പണ പ്രാർത്ഥന"),
              B(
                "Nercha Vilambu (offered by Johny Yohannan, Charuvila Puthen Veedu)",
                "നേർച്ചവിളമ്പ് (സമർപ്പണം: ജോണി യോഹന്നാൻ, ചരുവിള പുത്തൻ വീട്)",
              ),
            ],
          },
        ],
      },
      {
        date: "2026-11-07",
        items: [
          { time: "6:30 AM", title: B("Morning Prayer", "പ്രഭാത നമസ്കാരം") },
          {
            time: "7:15 AM",
            title: B("Holy Qurbana", "വി. കുർബ്ബാന"),
            lines: [
              B("Rev. Fr. Sam Thomas", "റവ. ഫാ. സാം തോമസ്"),
              B(
                "Nercha Vilambu (Holy Qurbana and nercha offered by the Aruvickal family)",
                "നേർച്ചവിളമ്പ് (വിശുദ്ധ കുർബ്ബാനയും നേർച്ചയും സമർപ്പണം: അരുവിക്കൽ ഫാമിലി)",
              ),
            ],
          },
          {
            time: "6:00 PM",
            title: B("Evening Prayer at Puthayam Kurishady", "സന്ധ്യാനമസ്കാരം പുത്തയം കുരിശ്ശടിയിൽ"),
            lines: [
              B(
                "Devout Raza procession, starting from Puthayam Kurishady and reaching the church",
                "ഭക്തിനിർഭരമായ റാസ — പുത്തയം കുരിശ്ശടിയിൽ നിന്നും ആരംഭിച്ച് ദേവാലയത്തിൽ എത്തിച്ചേരുന്നു",
              ),
              B("Benediction", "ആശീർവാദം"),
              B("Nercha Vilambu (offered by M. D. Mathai, Krupa House)", "നേർച്ചവിളമ്പ് (സമർപ്പണം: എം. ഡി. മത്തായി, കൃപ ഹൗസ്)"),
            ],
          },
        ],
      },
      {
        date: "2026-11-08",
        items: [
          { time: "7:00 AM", title: B("Morning Prayer", "പ്രഭാത നമസ്കാരം") },
          {
            time: "7:45 AM",
            title: B("Holy Qurbana on three altars", "വി. മൂന്നിന്മേൽ കുർബ്ബാന"),
            lines: [
              B("Very Rev. Thomas T. Varghese Cor Episcopa", "വെരി റവ. തോമസ് ടി. വർഗീസ് കോർഎപ്പിസ്കോപ്പാ"),
              B("Rev. Fr. A. Lukose", "റവ. ഫാ. എ. ലൂക്കോസ്"),
              B("Rev. Fr. Varghese T. Varghese", "റവ. ഫാ. വർഗീസ് ടി. വർഗീസ്"),
              B("Incense before the holy relics", "തിരുശേഷിപ്പിങ്കൽ ധൂപാർപ്പണം"),
              B(
                "Honouring the elders — parishioners who have turned 90 are honoured as part of the parish's Navathi",
                "വയോജന ആദരവ് (ഇടവകയുടെ നവതിയോടനുബന്ധിച്ച് 90 വയസ് പൂർത്തിയായ അംഗങ്ങളെ ആദരിക്കുന്നു)",
              ),
              B("Benediction", "ആശീർവാദം"),
              B(
                "Nercha Vilambu (offered by Marykutty Kunjappan, Thaluvachira)",
                "നേർച്ചവിളമ്പ് (സമർപ്പണം: മേരിക്കുട്ടി കുഞ്ഞപ്പൻ, തളുവച്ചിറ)",
              ),
            ],
          },
        ],
      },
    ],
  },
];

/* Navathi (90th anniversary) programmes, September 2026 – September 2027.
   The page shows "Coming soon" after the list until the full programme is added.
   Use YYYY-MM for a programme whose day is not fixed yet; the page shows
   "Date to be announced" until a full date is filled in. */
const navathiProgramsRaw: {
  date: string; endDate?: string; time?: Bi; title: Bi; description: Bi; location: Bi; event?: string;
}[] = [
  {
    date: "2026-09-05",
    event: "navathi-inauguration",
    title: B("Inauguration of the Navathi Celebrations", "നവതി ആഘോഷങ്ങളുടെ ഉദ്ഘാടനം"),
    description: B(
      "The Navathi year was formally inaugurated during the parish feast.",
      "ഇടവക പെരുന്നാളിനോടനുബന്ധിച്ച് നവതി വർഷം ഔദ്യോഗികമായി ഉദ്ഘാടനം ചെയ്തു.",
    ),
    location: B("Parish Church", "ഇടവക പള്ളി"),
  },
];

const prelatesRaw = [
  {
    name: B("H.H. Baselios Marthoma Mathews III", "പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ മാത്യൂസ് തൃതീയൻ കാതോലിക്കാ ബാവ"),
    title: B("Catholicos of the East & Malankara Metropolitan", "പൗരസ്ത്യ കാതോലിക്കായും മലങ്കര മെത്രാപ്പോലീത്തായും"),
    image: "catholicos" as ImageKey,
    file: "clergy/catholicos-baselios-marthoma-mathews-iii.jpg",
  },
  {
    name: B("H.G. Dr. Geevarghese Mar Yulios Metropolitan", "അഭി. ഡോ. ഗീവർഗീസ് മാർ യൂലിയോസ് മെത്രാപ്പോലീത്ത"),
    title: B("Diocesan Metropolitan", "ഭദ്രാസന മെത്രാപ്പോലീത്ത"),
    image: "diocesanMetropolitan" as ImageKey,
    file: "clergy/metropolitan-geevarghese-mar-yulios.jpg",
  },
];

const parishPriestRaw = {
  name: B("Rev. Fr. Varghese T Varghese", "റവ. ഫാ. വർഗീസ് ടി വർഗീസ്"),
  role: B("Vicar", "ഇടവക വികാരി"),
  image: "priest1" as ImageKey,
  since: B("", ""),
  bio: B(
    "Fr. Varghese shepherds St. Mary's with a heart for the poor and a deep love for the Holy Qurbana. With gentle wisdom he guides the spiritual and pastoral life of the parish, welcoming all who come seeking God's grace.",
    "ദരിദ്രരോടുള്ള സ്നേഹത്തോടും വിശുദ്ധ കുർബ്ബാനയോടുള്ള ആഴമായ താൽപ്പര്യത്തോടും കൂടെ ഫാ. വർഗീസ് വിശുദ്ധ മറിയം പള്ളിയെ പരിപാലിക്കുന്നു. സൗമ്യമായ വിവേകത്തോടെ അദ്ദേഹം ഇടവകയുടെ ആത്മീയവും അജപാലനപരവുമായ ജീവിതം നയിക്കുന്നു.",
  ),
  quote: B(
    "A parish is a family gathered around the altar — here, everyone has a place at the Lord's table.",
    "ഇടവക എന്നത് ബലിപീഠത്തിനു ചുറ്റും ഒരുമിച്ച കുടുംബമാണ് — ഇവിടെ കർത്താവിന്റെ മേശയിൽ എല്ലാവർക്കും ഇടമുണ്ട്.",
  ),
};

const assistantPriestRaw = {
  name: B("Rev. Fr. Aji", "റവ. ഫാ. അജി"),
  role: B("Assistant Priest", "സഹ വികാരി"),
  image: "priest2" as ImageKey,
  since: B("", ""),
  bio: B(
    "Fr. Aji accompanies our youth and family ministries with energy and joy. He coordinates the OCYM, MGOCSM, Sunday School and the parish choir, drawing young hearts closer to Christ.",
    "ഫാ. അജി ഊർജ്ജത്തോടും സന്തോഷത്തോടും കൂടെ ഞങ്ങളുടെ യുവജന-കുടുംബ ശുശ്രൂഷകളെ അനുഗമിക്കുന്നു. ഒസിവൈഎം, എംജിഒസിഎസ്എം, വേദപാഠം, ഇടവക ഗായകസംഘം എന്നിവ ഏകോപിപ്പിച്ച് അദ്ദേഹം യുവഹൃദയങ്ങളെ ക്രിസ്തുവിനോട് അടുപ്പിക്കുന്നു.",
  ),
  quote: B(
    "Faith grows brightest when the young are given room to serve.",
    "സേവിക്കാൻ യുവജനങ്ങൾക്ക് ഇടം നൽകുമ്പോൾ വിശ്വാസം ഏറ്റവും തിളക്കത്തോടെ വളരുന്നു.",
  ),
};

// Photos go in public/images/committee/office-bearers/
const managingCommitteeRaw = [
  { name: parishPriestRaw.name, role: B("President", "പ്രസിഡന്റ്"), photo: "committee/office-bearers/fr-varghese-t-varghese.jpeg" },
  { name: B("P. J. Philip Aruvickal", "പി. ജെ. ഫിലിപ്പ് അരുവിക്കൽ"), role: B("Trustee", "ട്രസ്റ്റി"), photo: "committee/office-bearers/p-j-philip-aruvickal.jpeg" },
  { name: B("Joseph K. V.", "ജോസഫ് കെ. വി."), role: B("Secretary", "സെക്രട്ടറി"), photo: "committee/office-bearers/joseph-k-v.jpeg" },
];

// Photos go in public/images/committee/members/
const committeeMembersRaw = [
  { name: B("Johnykutty Y.", "ജോണിക്കുട്ടി വൈ."), role: B("Perunnal Convener", "പെരുന്നാൾ കൺവീനർ"), photo: "committee/members/johnykutty-y.jpeg" },
  { name: B("Jiss V. George", "ജിസ് വി. ജോർജ്"), role: B("Ex Officio", "എക്സ് ഒഫീഷ്യോ"), photo: "committee/members/jiss-v-george.jpeg" },
  { name: B("Johnkutty C. K.", "ജോൺകുട്ടി സി. കെ."), photo: "committee/members/johnkutty-c-k.jpeg" },
  { name: B("Johny Yohannan", "ജോണി യോഹന്നാൻ"), photo: "committee/members/johny-yohannan.jpeg" },
  { name: B("Varghese Kurian", "വർഗീസ് കുര്യൻ"), photo: "committee/members/varghese-kurian.jpeg" },
  { name: B("Jose K. C.", "ജോസ് കെ. സി."), photo: "committee/members/jose-k-c.jpeg" },
  { name: B("Kuruvila Kurian", "കുരുവിള കുര്യൻ"), photo: "committee/members/kuruvila-kurian.jpeg" },
  { name: B("Anil J. Varghese", "അനിൽ ജെ. വർഗീസ്"), photo: "committee/members/anil-j-varghese.jpg" },
  { name: B("Subodh George", "സുബോധ് ജോർജ്"), photo: "committee/members/subodh-george.jpeg" },
  { name: B("Shiju Pappachan", "ഷിജു പാപ്പച്ചൻ"), photo: "committee/members/shiju-pappachan.jpeg" },
  { name: B("Johnson B.", "ജോൺസൺ ബി."), photo: "committee/members/johnson-b.jpeg" },
  { name: B("Smitha Wilson", "സ്മിത വിൽസൺ"), photo: "committee/members/smitha-wilson.jpeg" },
];

// Photos go in public/images/committee/auditors/
const auditorsRaw = [
  { name: B("Job Joy", "ജോബ് ജോയ്"), photo: "committee/auditors/job-joy.jpeg" },
  { name: B("Jincy Prince", "ജിൻസി പ്രിൻസ്"), photo: "committee/auditors/jincy-prince.jpeg" },
];

// Photos go in public/images/committee/sacristans/
const sacristansRaw = [
  { name: B("Roy B.", "റോയ് ബി."), photo: "committee/sacristans/roy-b.jpeg" },
];

// Photos go in public/images/clergy/parish-priests/. Leave out `photo` to show a placeholder;
// `memorial` adds an "In loving memory" line above the name.
const parishPriestsRaw: { name: Bi; role?: Bi; photo?: string; memorial?: boolean }[] = [
  { name: B("Rev. Fr. Yacob OIC", "റവ. ഫാ. യാക്കോബ് ഒ.ഐ.സി."), photo: "clergy/parish-priests/yacob-oic.jpeg", memorial: true },
  { name: B("Very Rev. Thomas T. Varghese Cor Episcopa", "വെരി റവ. തോമസ് ടി. വർഗീസ് കോർ എപ്പിസ്കോപ്പ"), photo: "clergy/parish-priests/thomas-t-varghese-cor-episcopa.jpeg" },
  { name: B("Rev. Fr. Thomas Daniel", "റവ. ഫാ. തോമസ് ഡാനിയേൽ"), photo: "clergy/parish-priests/thomas-daniel.jpeg" },
  { name: B("Rev. Fr. Sam Thomas", "റവ. ഫാ. സാം തോമസ്"), photo: "clergy/parish-priests/sam-thomas.jpeg" },
];

// Chronological, as recorded in the parish history. Roles left blank where the record gives none.
const formerVicarsRaw: { name: Bi; role?: Bi; years: string; note?: Bi }[] = [
  { name: B("Rev. Fr. Koshy Kathanar Mayilazhikathu", "റവ. ഫാ. കോശി കത്തനാർ മയിലാഴിക്കത്ത്"), years: "1937 – 1938" },
  { name: B("Rev. Fr. K. Gheevarghese Changarampalli", "റവ. ഫാ. കെ. ഗീവർഗീസ് ചങ്ങരംപള്ളി"), years: "1938 – 1973" },
  { name: B("Rev. Fr. Njanasikhamani Sasthri", "റവ. ഫാ. ജ്ഞാനശിഖാമണി ശാസ്ത്രി"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1963 – 1970" },
  { name: B("Rev. Fr. Alex Kurambil", "റവ. ഫാ. അലക്സ് കുറമ്പിൽ"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1970 – 1971" },
  { name: B("Rev. Fr. C. Kurian", "റവ. ഫാ. സി. കുര്യൻ"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1971 – 1972" },
  { name: B("Rev. Fr. P. V. Samuel", "റവ. ഫാ. പി. വി. ശമുവേൽ"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1972 – 1973" },
  { name: B("Rev. Fr. P. V. Samuel", "റവ. ഫാ. പി. വി. ശമുവേൽ"), role: B("Vicar", "വികാരി"), years: "1973 – 1975" },
  { name: B("Rev. Fr. W. A. Cheriyan", "റവ. ഫാ. ഡബ്ല്യു. എ. ചെറിയാൻ"), role: B("Vicar", "വികാരി"), years: "1975", note: B("H.G. Zachariah Mar Anthonios Metropolitan", "അഭി. സഖറിയാ മാർ അന്തോണിയോസ് മെത്രാപ്പോലീത്ത") },
  { name: B("Rev. Fr. P. M. Koshy", "റവ. ഫാ. പി. എം. കോശി"), role: B("Vicar", "വികാരി"), years: "1975 – 1977" },
  { name: B("Rev. Fr. P. G. Kurian", "റവ. ഫാ. പി. ജി. കുര്യൻ"), role: B("Vicar", "വികാരി"), years: "1977 – 1979" },
  { name: B("Rev. Fr. P. C. John", "റവ. ഫാ. പി. സി. ജോൺ"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1977 – 1979" },
  { name: B("Rev. Fr. Zacharia Abraham", "റവ. ഫാ. സഖറിയ ഏബ്രഹാം"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1979" },
  { name: B("Rev. Fr. K. P. Philip", "റവ. ഫാ. കെ. പി. ഫിലിപ്പ്"), role: B("Vicar", "വികാരി"), years: "1979 – 1981" },
  { name: B("Rev. Fr. Yohannan Panicker", "റവ. ഫാ. യോഹന്നാൻ പണിക്കർ"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1980" },
  { name: B("Rev. Fr. Thomas T. Varghese", "റവ. ഫാ. തോമസ് ടി. വർഗീസ്"), role: B("Vicar", "വികാരി"), years: "1981 – 1988" },
  { name: B("Rev. Fr. K. K. Thomas", "റവ. ഫാ. കെ. കെ. തോമസ്"), role: B("Vicar", "വികാരി"), years: "1988 – 1992" },
  { name: B("Rev. Fr. C. Koshy", "റവ. ഫാ. സി. കോശി"), role: B("Vicar", "വികാരി"), years: "1992 – 1994" },
  { name: B("Rev. Fr. Joseph Samuel Karukayil", "റവ. ഫാ. ജോസഫ് ശമുവേൽ കറുകയിൽ"), role: B("Vicar", "വികാരി"), years: "1994 – 1997" },
  { name: B("Rev. Fr. C. D. Rajan", "റവ. ഫാ. സി. ഡി. രാജൻ"), role: B("Asst. Vicar", "സഹ വികാരി"), years: "1994 – 1997" },
  { name: B("Rev. Fr. Anil John", "റവ. ഫാ. അനിൽ ജോൺ"), role: B("Vicar", "വികാരി"), years: "1997 – 2000" },
  { name: B("Rev. Fr. C. Johnson Mulamuttil", "റവ. ഫാ. സി. ജോൺസൺ മുളമൂട്ടിൽ"), role: B("Vicar", "വികാരി"), years: "2000 – 2003" },
  { name: B("Rev. Fr. Mathew Abraham", "റവ. ഫാ. മാത്യു ഏബ്രഹാം"), role: B("Vicar", "വികാരി"), years: "2003 – 2005" },
  { name: B("Rev. Fr. John Philip", "റവ. ഫാ. ജോൺ ഫിലിപ്പ്"), role: B("Vicar", "വികാരി"), years: "2005 – 2009" },
  { name: B("Rev. Fr. John Daniel", "റവ. ഫാ. ജോൺ ഡാനിയേൽ"), role: B("Vicar", "വികാരി"), years: "2009" },
  { name: B("Rev. Fr. K. G. Jacob Panicker", "റവ. ഫാ. കെ. ജി. ജേക്കബ് പണിക്കർ"), role: B("Vicar", "വികാരി"), years: "2009 – 2012" },
  { name: B("Rev. Fr. Sam Kanjickal", "റവ. ഫാ. സാം കാഞ്ഞിക്കൽ"), role: B("Vicar", "വികാരി"), years: "2012 – 2015" },
  { name: B("Rev. Fr. Mathew Thomas", "റവ. ഫാ. മാത്യു തോമസ്"), role: B("Vicar", "വികാരി"), years: "2015 – 2018" },
  { name: B("Rev. Fr. Varghese Abraham", "റവ. ഫാ. വർഗീസ് ഏബ്രഹാം"), years: "2018 – 2024" },
];

/** Malayalam display names for organisations (acronyms as written in Malayalam print). */
const orgNameMl: Record<string, string> = {
  "sunday-school": "സൺഡേ സ്കൂൾ",
  ocym: "ഒ.സി.വൈ.എം.",
  mgocsm: "എം.ജി.ഒ.സി.എസ്.എം.",
  "martha-mariam": "മർത്തമറിയം വനിതാ സമാജം",
  "prayer-fellowship": "പ്രാർത്ഥനാ യോഗങ്ങൾ",
  choir: "ഇടവക ഗായകസംഘം",
  balasamajam: "ബാലസമാജം",
  "upavasa-prarthana": "ഉപവാസ പ്രാർത്ഥന",
  moms: "എം.ഒ.എം.എസ്.",
  sjof: "എസ്.ജെ.ഒ.എഫ്.",
  sdof: "എസ്.ഡി.ഒ.എഫ്.",
};

const organizationsRaw: {
  slug: string; name: string; malayalam?: Bi; short: Bi; description: Bi;
  meeting: Bi; icon: string; image: ImageKey; photos: ImageKey[]; audience: Bi;
  schedule?: { name: Bi; day: Bi; time: string }[];
}[] = [
  {
    slug: "sunday-school", name: "Sunday School",
    malayalam: B("Vedapadasala", "വേദപാഠശാല"),
    short: B("Faith formation for children", "കുട്ടികളുടെ വിശ്വാസ പരിശീലനം"),
    description: B(
      "Systematic teaching of Scripture, faith and the Orthodox tradition for children, following the Diocesan Sunday School syllabus.",
      "ഭദ്രാസന സൺഡേ സ്കൂൾ സിലബസ് പിന്തുടർന്ന്, കുട്ടികൾക്കായി വിശുദ്ധ ഗ്രന്ഥവും വിശ്വാസവും ഓർത്തഡോക്സ് പാരമ്പര്യവും ചിട്ടയായി പഠിപ്പിക്കുന്നു.",
    ),
    meeting: B("Sundays · after Holy Qurbana", "ഞായറാഴ്ചകൾ · വിശുദ്ധ കുർബ്ബാനയ്ക്കു ശേഷം"),
    icon: "BookOpen", image: "sundaySchoolAssembly",
    photos: ["sundaySchoolAssembly", "sundaySchoolPrayer", "sundaySchoolAddress", "sundaySchoolSpeech"],
    audience: B("Grades 1–12", "ക്ലാസ് 1–12"),
  },
  {
    slug: "ocym", name: "OCYM",
    malayalam: B("Orthodox Christian Youth Movement", "ഓർത്തഡോക്സ് ക്രിസ്ത്യൻ യൂത്ത് മൂവ്‌മെന്റ്"),
    short: B("Parish youth movement", "ഇടവക യുവജന പ്രസ്ഥാനം"),
    description: B(
      "Forming young men and women as disciples and servant-leaders through prayer, retreats, study and works of charity.",
      "പ്രാർത്ഥന, ധ്യാനം, പഠനം, ജീവകാരുണ്യ പ്രവർത്തനങ്ങൾ എന്നിവയിലൂടെ യുവതീയുവാക്കളെ ശിഷ്യരും സേവന നേതാക്കളുമായി രൂപപ്പെടുത്തുന്നു.",
    ),
    meeting: B("Saturdays · after Evening Prayer", "ശനിയാഴ്ചകൾ · സന്ധ്യാ നമസ്കാരത്തിനു ശേഷം"),
    icon: "Flame", image: "ocymPresentation", photos: ["ocymPresentation", "gathering", "peacefulPath"],
    audience: B("Youth (18–35)", "യുവജനം (18–35)"),
  },
  {
    slug: "mgocsm", name: "MGOCSM",
    malayalam: B("Orthodox Student Movement", "ഓർത്തഡോക്സ് വിദ്യാർത്ഥി പ്രസ്ഥാനം"),
    short: B("Student ministry", "വിദ്യാർത്ഥി ശുശ്രൂഷ"),
    description: B(
      "The Mar Gregorios Orthodox Christian Student Movement — nurturing school and college students in faith, study circles and service.",
      "മാർ ഗ്രിഗോറിയോസ് ഓർത്തഡോക്സ് ക്രിസ്ത്യൻ സ്റ്റുഡന്റ് മൂവ്‌മെന്റ് — സ്കൂൾ, കോളേജ് വിദ്യാർത്ഥികളെ വിശ്വാസത്തിലും പഠന കൂട്ടായ്മകളിലും സേവനത്തിലും വളർത്തുന്നു.",
    ),
    meeting: B("Saturdays · after Evening Prayer", "ശനിയാഴ്ചകൾ · സന്ധ്യാ നമസ്കാരത്തിനു ശേഷം"),
    icon: "Users", image: "gathering", photos: ["peacefulPath", "gathering", "churchWarm"],
    audience: B("Students", "വിദ്യാർത്ഥികൾ"),
  },
  {
    slug: "martha-mariam", name: "Martha Mariam Vanitha Samajam",
    malayalam: B("Women's Fellowship", "വനിതാ സമാജം"),
    short: B("Fellowship of women", "വനിതാ കൂട്ടായ്മ"),
    description: B(
      "The women of the parish united in prayer, formation and charity — the quiet strength of every Christian home.",
      "പ്രാർത്ഥനയിലും പരിശീലനത്തിലും ജീവകാരുണ്യത്തിലും ഒന്നിച്ച ഇടവക വനിതകൾ — ഓരോ ക്രിസ്തീയ ഭവനത്തിന്റെയും നിശ്ശബ്ദ ശക്തി.",
    ),
    meeting: B("Wednesday", "ബുധൻ"),
    icon: "Heart", image: "marthaMariamGathering",
    photos: ["marthaMariamGathering", "marthaMariamAddress", "marthaMariamScripture"],
    audience: B("Women", "വനിതകൾ"),
  },
  {
    slug: "prayer-fellowship", name: "Prayer Groups",
    malayalam: B("Prarthana Yogangal", "പ്രാർത്ഥനാ യോഗങ്ങൾ"),
    short: B("Intercession & fellowship", "മാധ്യസ്ഥ്യവും കൂട്ടായ്മയും"),
    description: B(
      "Parishioners gathering for praise, intercession and the Word — carrying one another's needs before the Lord.",
      "സ്തുതിക്കും മാധ്യസ്ഥ്യത്തിനും വചനത്തിനുമായി ഒരുമിക്കുന്ന ഇടവകാംഗങ്ങൾ — പരസ്പരം ആവശ്യങ്ങൾ കർത്താവിനു മുമ്പിൽ സമർപ്പിക്കുന്നു.",
    ),
    meeting: B("Weekly · 8 groups", "ആഴ്ചതോറും · 8 യോഗങ്ങൾ"),
    icon: "Sparkles", image: "candles", photos: ["candles"],
    audience: B("All parishioners", "എല്ലാ ഇടവകാംഗങ്ങൾക്കും"),
    schedule: [
      { name: B("Alencherry Martha Mariam", "Alencherry Martha Mariam"), day: B("Sunday", "ഞായർ"), time: "4:30 PM" },
      { name: B("Anchal St. Jude", "Anchal St. Jude"), day: B("Sunday", "ഞായർ"), time: "4:00 PM" },
      { name: B("Central St. Mary's", "Central St. Mary's"), day: B("Sunday", "ഞായർ"), time: "3:30 PM" },
      { name: B("Elamutam St. John's", "Elamutam St. John's"), day: B("Friday", "വെള്ളി"), time: "6:00 PM" },
      { name: B("Muthalattu St. George", "Muthalattu St. George"), day: B("Sunday", "ഞായർ"), time: "3:30 PM" },
      { name: B("Panayam St. Peter's", "Panayam St. Peter's"), day: B("Sunday", "ഞായർ"), time: "11:30 AM" },
      { name: B("Putheyam St. Gregorios", "Putheyam St. Gregorios"), day: B("Sunday", "ഞായർ"), time: "4:00 PM" },
      { name: B("Yeroor St. Thomas", "Yeroor St. Thomas"), day: B("Sunday", "ഞായർ"), time: "4:00 PM" },
    ],
  },
  {
    slug: "choir", name: "Parish Choir",
    malayalam: B("Gana Sabha", "ഗാനസഭ"),
    short: B("Ministry of sacred music", "വിശുദ്ധ സംഗീത ശുശ്രൂഷ"),
    description: B(
      "Lifting the parish's prayer in song — leading the congregation in the sacred music of the Malankara Orthodox liturgy.",
      "ഇടവകയുടെ പ്രാർത്ഥനയെ ഗാനത്തിലുയർത്തുന്നു — മലങ്കര ഓർത്തഡോക്സ് ആരാധനക്രമത്തിന്റെ വിശുദ്ധ സംഗീതത്തിൽ സമൂഹത്തെ നയിക്കുന്നു.",
    ),
    meeting: B("Friday · 7:00 PM rehearsal", "വെള്ളി · 7:00 PM പരിശീലനം"),
    icon: "Music", image: "choir", photos: ["choir"],
    audience: B("All ages", "എല്ലാ പ്രായക്കാർക്കും"),
  },
  {
    slug: "balasamajam", name: "Balasamajam",
    malayalam: B("Children's Fellowship", "ബാലസമാജം"),
    short: B("Fellowship of children", "കുട്ടികളുടെ കൂട്ടായ്മ"),
    description: B(
      "The children of the parish gathering in prayer, song and Bible stories — learning to love the Lord and one another from their earliest years.",
      "പ്രാർത്ഥനയിലും ഗാനങ്ങളിലും ബൈബിൾ കഥകളിലും ഒന്നിച്ചുകൂടുന്ന ഇടവകയിലെ കുട്ടികൾ — ചെറുപ്രായം മുതലേ കർത്താവിനെയും പരസ്പരവും സ്നേഹിക്കാൻ പഠിക്കുന്നു.",
    ),
    meeting: B("Last Sunday of every month · after Sunday School", "എല്ലാ മാസവും അവസാന ഞായർ · സൺഡേ സ്കൂളിനു ശേഷം"),
    icon: "Sprout", image: "balasamajamInauguration",
    photos: ["balasamajamInauguration", "balasamajamGathering", "balasamajamAddress"],
    audience: B("Children", "കുട്ടികൾ"),
  },
  {
    slug: "upavasa-prarthana", name: "Upavasa Prarthana",
    malayalam: B("Fasting Prayer", "ഉപവാസ പ്രാർത്ഥന"),
    short: B("Prayer with fasting", "ഉപവാസത്തോടെയുള്ള പ്രാർത്ഥന"),
    description: B(
      "Parishioners joining in prayer with fasting — seeking God's mercy and interceding for the needs of the parish and the world.",
      "ഉപവാസത്തോടെ പ്രാർത്ഥനയിൽ ഒന്നിക്കുന്ന ഇടവകാംഗങ്ങൾ — ദൈവകരുണ തേടി ഇടവകയുടെയും ലോകത്തിന്റെയും ആവശ്യങ്ങൾക്കായി മാധ്യസ്ഥ്യം വഹിക്കുന്നു.",
    ),
    meeting: B("Every Friday · 10:30 AM", "എല്ലാ വെള്ളിയാഴ്ചയും · 10:30 AM"),
    icon: "Cross", image: "marthaMariamGathering", photos: ["marthaMariamGathering", "marthaMariamAddress"],
    audience: B("All parishioners", "എല്ലാ ഇടവകാംഗങ്ങൾക്കും"),
  },
  {
    slug: "moms", name: "MOMS",
    short: B("Parish fellowship", "ഇടവക കൂട്ടായ്മ"),
    description: B(
      "A fellowship of the parish, gathering its members in prayer, fellowship and service.",
      "പ്രാർത്ഥനയിലും കൂട്ടായ്മയിലും സേവനത്തിലും അംഗങ്ങളെ ഒന്നിപ്പിക്കുന്ന ഇടവക കൂട്ടായ്മ.",
    ),
    meeting: B("First Tuesday of every month · 10:30 AM", "എല്ലാ മാസവും ഒന്നാം ചൊവ്വ · 10:30 AM"),
    icon: "HeartHandshake", image: "momsGroup", photos: ["momsGroup"],
    audience: B("Members", "അംഗങ്ങൾ"),
  },
  {
    slug: "sjof", name: "SJOF",
    short: B("Parish fellowship", "ഇടവക കൂട്ടായ്മ"),
    description: B(
      "A fellowship of the parish, gathering its members in prayer, fellowship and service.",
      "പ്രാർത്ഥനയിലും കൂട്ടായ്മയിലും സേവനത്തിലും അംഗങ്ങളെ ഒന്നിപ്പിക്കുന്ന ഇടവക കൂട്ടായ്മ.",
    ),
    meeting: B("Schedule to be announced", "സമയക്രമം പിന്നീട് അറിയിക്കും"),
    icon: "Users", image: "sjofMeeting", photos: ["sjofMeeting", "sjofGroup"],
    audience: B("Members", "അംഗങ്ങൾ"),
  },
  {
    slug: "sdof", name: "SDOF",
    short: B("Parish fellowship", "ഇടവക കൂട്ടായ്മ"),
    description: B(
      "A fellowship of the parish, gathering its members in prayer, fellowship and service.",
      "പ്രാർത്ഥനയിലും കൂട്ടായ്മയിലും സേവനത്തിലും അംഗങ്ങളെ ഒന്നിപ്പിക്കുന്ന ഇടവക കൂട്ടായ്മ.",
    ),
    meeting: B("Schedule to be announced", "സമയക്രമം പിന്നീട് അറിയിക്കും"),
    icon: "Shield", image: "sdofSunday", photos: ["sdofSunday"],
    audience: B("Members", "അംഗങ്ങൾ"),
  },
];

const missionProjectsRaw: { name: Bi; tagline: Bi; description: Bi; icon: string }[] = [
  {
    name: B("Ardram", "ആർദ്രം"),
    tagline: B("Intercessory Prayer", "മധ്യസ്ഥ പ്രാർത്ഥന"),
    description: B(
      "Every Wednesday at 6:00 PM, following the evening prayer, intercessory prayer to St. Mary (Marth Mariam) and the serving of nercha.",
      "എല്ലാ ബുധനാഴ്ചയും വൈകുന്നേരം ആറുമണിക്ക് സന്ധ്യാ നമസ്കാരത്തെ തുടർന്ന് മർത്തമറിയം മാതാവിനോടുള്ള മധ്യസ്ഥ പ്രാർത്ഥനയും നേർച്ച വിളമ്പും.",
    ),
    icon: "Flame",
  },
  {
    name: B("Aashrayam", "ആശ്രയം"),
    tagline: B("Pension Scheme", "പെൻഷൻ പദ്ധതി"),
    description: B(
      "A monthly pension of ₹1,000 for ten people facing financial hardship — eight within the parish and two from outside it. Prayer group secretaries identify the beneficiaries.",
      "സാമ്പത്തിക ബുദ്ധിമുട്ട് അനുഭവിക്കുന്ന പത്തുപേർക്ക് പ്രതിമാസം ആയിരം രൂപ പെൻഷൻ നൽകുന്ന പദ്ധതി. ഇടവകയിലെ എട്ട് പേർക്കും ഇടവകയ്ക്ക് പുറത്തുള്ള രണ്ടു പേർക്കും ആയിട്ടാണ് ഈ പദ്ധതി. (ഗുണഭോക്‌താക്കളെ കണ്ടെത്താനുള്ള ചുമതല പ്രാർത്ഥനായോഗം സെക്രട്ടറിമാർക്കാകും.)",
    ),
    icon: "HandCoins",
  },
  {
    name: B("Aalambam", "ആലംബം"),
    tagline: B("Quarterly Gathering", "ത്രൈമാസ സംഗമം"),
    description: B(
      "Once every three months, parents and brethren long unable to come to church through illness or age are brought to worship, receive Holy Qurbana, spend time in the church and join a fellowship meal.",
      "രോഗശയ്യയിലും വാർധക്യസഹജമായ അവശതകളാലും ദീർഘകാലമായി ദേവാലയത്തിൽ വരാൻ സാധിക്കാതിരിക്കുന്ന മാതാപിതാക്കളെയും സഹോദരങ്ങളെയും മൂന്നു മാസത്തിലൊരു തവണ ദേവാലയത്തിൽ കൊണ്ടുവന്ന് ആരാധനയിൽ പങ്കെടുപ്പിച്ച് വിശുദ്ധ കുർബാന അനുഭവിക്കാനും തുടർന്ന് ദേവാലയത്തിൽ അല്പസമയം ചിലവഴിച്ചു സ്നേഹവിരുന്നിലും പങ്കെടുക്കാനുമുള്ള പദ്ധതി.",
    ),
    icon: "Accessibility",
  },
  {
    name: B("Alivu", "അലിവ്"),
    tagline: B("Marth Mariam Relief Fund", "മർത്തമറിയം സഹായ നിധി"),
    description: B(
      "A relief fund supporting the varied needs of those who are financially disadvantaged.",
      "സാമ്പത്തികമായി പിന്നോക്കം നിൽക്കുന്നവർക്കുള്ള വിവിധ ആവശ്യങ്ങൾക്കുള്ള സഹായ പദ്ധതി.",
    ),
    icon: "HandHeart",
  },
  {
    name: B("Aaswas", "ആശ്വാസ്‌"),
    tagline: B("Home Visits", "ഭവന സന്ദർശനം"),
    description: B(
      "Visiting the bedridden to comfort them and spend time in their company.",
      "രോഗശയ്യയിൽ ആയിരിക്കുന്നവരെ സന്ദർശിച്ച് ആശ്വസിപ്പിക്കുന്നതിനും കുറച്ചു സമയം അവരോടൊപ്പം ചിലവഴിക്കുന്നതിനും ഉള്ള പദ്ധതി.",
    ),
    icon: "HeartPulse",
  },
  {
    name: B("Anugraham", "അനുഗ്രഹം"),
    tagline: B("Education Assistance", "വിദ്യാഭ്യാസ സഹായ പദ്ധതി"),
    description: B(
      "Support for the education of children from financially disadvantaged families.",
      "സാമ്പത്തിക പിന്നോക്കാവസ്ഥ ഉള്ളവരുടെ കുട്ടികളുടെ വിദ്യാഭ്യാസത്തിനുള്ള സഹായ പദ്ധതി.",
    ),
    icon: "GraduationCap",
  },
  {
    name: B("Aamodam", "ആമോദം"),
    tagline: B("Creative Fellowship", "സർഗ്ഗാത്മക കൂട്ടായ്മ"),
    description: B(
      "A fellowship that draws children more fully into worship and develops their creative gifts.",
      "കുട്ടികളെ കൂടുതലായി ആരാധനയിൽ പങ്കാളികളാക്കാനും അവരുടെ സർഗ്ഗാത്മക കഴിവുകൾ വികസിപ്പിക്കാനുമുള്ള കൂട്ടായ്മ.",
    ),
    icon: "Palette",
  },
  {
    name: B("Abhayam", "അഭയം"),
    tagline: B("Housing Project", "ഭവന നിർമ്മാണ പദ്ധതി"),
    description: B(
      "Building homes in the hope that, God willing, no one in our parish will be without a home before the church's 90th anniversary.",
      "ദൈവേഷ്ടമായാൽ നമ്മുടെ പള്ളിയുടെ നവതിക്ക് മുൻപ് നമ്മുടെ ഇടവകയിൽ ഭവന രഹിതരായി ആരും തന്നെ ഉണ്ടാകരുത് എന്നുള്ള ആഗ്രഹത്താൽ ഭവനങ്ങൾ നിർമ്മിക്കുന്നതിനുള്ള പദ്ധതി.",
    ),
    icon: "House",
  },
  {
    name: B("Aalayam", "ആലയം"),
    tagline: B("Library", "വായനശാല"),
    description: B(
      "Fostering a love of reading among children.",
      "കുട്ടികളിൽ വായനാശീലം സൃഷ്ടിക്കുന്നതിനുള്ള പദ്ധതി.",
    ),
    icon: "Library",
  },
  {
    name: B("Abhivridhi", "അഭിവൃദ്ധി"),
    tagline: B("Farming Fellowship", "കാർഷിക കൂട്ടായ്മ"),
    description: B(
      "Helping every family in the parish become self-sufficient in vegetables and supporting them in farming.",
      "ഇടവകയിലെ എല്ലാ കുടുംബങ്ങളിലും പച്ചക്കറികൾക്ക് സ്വയംപര്യാപ്തത നേടുന്നതിനും കൃഷി കാര്യങ്ങളിൽ സഹായിക്കുന്നതിനുമുള്ള കൂട്ടായ്മ.",
    ),
    icon: "Sprout",
  },
  {
    name: B("Athmabodhana Sangham", "ആത്മബോധന സംഘം"),
    tagline: B("Ministry of the Word", "വചന ശുശ്രൂഷാ സംഘം"),
    description: B(
      "The fellowship of the parish's evangelists, leading the ministry of the Word in prayer groups and spiritual movements.",
      "ഇടവകയിലെ സുവിശേഷ പ്രവർത്തകരുടെ കൂട്ടായ്മ. പ്രാർത്ഥനയോഗങ്ങളിലെയും ആത്‌മീയ പ്രസ്ഥാനങ്ങളിലും വചന ശുശ്രൂഷയ്ക്ക് നേതൃത്വം നൽകുന്ന സംഘം.",
    ),
    icon: "BookOpen",
  },
  {
    name: B("Aneede", "ആനീദേ"),
    tagline: B("Incense Prayer", "ധൂപ പ്രാർത്ഥന"),
    description: B(
      "Every Sunday during Holy Qurbana, incense is offered together in remembrance of the names of the departed.",
      "എല്ലാ ഞായറാഴ്ച്ചയും വിശുദ്ധ കുർബ്ബാനയിൽ വാങ്ങിപ്പോയവരുടെ പേരുകൾ ഓർത്ത് പൊതുവായി ധൂപാർപ്പണം നടത്തുവാനുള്ള പദ്ധതി.",
    ),
    icon: "Cross",
  },
];

const galleryRaw: { image: ImageKey; title: Bi; category: GalleryCategory; span?: "tall" | "wide" }[] = [
  { image: "heroInterior", title: B("Our church aglow at night", "രാത്രിയിൽ പ്രകാശിക്കുന്ന ഞങ്ങളുടെ പള്ളി"), category: "Church", span: "tall" },
  { image: "candles", title: B("Intercession of the Theotokos", "ദൈവമാതാവിന്റെ മാധ്യസ്ഥ്യം"), category: "Liturgy" },
  { image: "churchDusk", title: B("The parish church at dusk", "സന്ധ്യയിൽ ഇടവക പള്ളി"), category: "Church", span: "wide" },
  { image: "celebration", title: B("Honouring our parishioners", "ഇടവകാംഗങ്ങളെ ആദരിക്കുന്നു"), category: "Community" },
  { image: "cathedralArches", title: B("The golden madbaha (sanctuary)", "സ്വർണ്ണ മദ്ബഹാ"), category: "Heritage", span: "tall" },
  { image: "candlesPrayer", title: B("Prayer at the Marian shrine", "മറിയത്തിന്റെ നടയിലെ പ്രാർത്ഥന"), category: "Liturgy" },
  { image: "gathering", title: B("A parish gathering", "ഒരു ഇടവക കൂട്ടായ്മ"), category: "Community", span: "wide" },
  { image: "churchAlt5", title: B("Shleeha Nombu — the Apostles' Fast", "ശ്ലീഹാ നോമ്പ്"), category: "Feasts" },
  { image: "churchWarm", title: B("The Word proclaimed", "വചനം പ്രഘോഷിക്കപ്പെടുന്നു"), category: "Liturgy" },
  { image: "churchExterior", title: B("Evening splendour", "സന്ധ്യാ ശോഭ"), category: "Church", span: "tall" },
  { image: "churchAlt2", title: B("Parish feast — the flag hoisting", "ഇടവക പെരുന്നാൾ — കൊടിയേറ്റ്"), category: "Feasts" },
  { image: "peacefulPath", title: B("Our young ones together", "ഞങ്ങളുടെ യുവജനങ്ങൾ ഒരുമിച്ച്"), category: "Community", span: "wide" },
  { image: "stainedGlass", title: B("A blessing at the altar", "ബലിപീഠത്തിലെ ആശീർവാദം"), category: "Liturgy" },
  { image: "archDetail", title: B("The ancient processional cross", "പുരാതന പ്രദക്ഷിണ കുരിശ്"), category: "Heritage", span: "tall" },
  { image: "scripture", title: B("Sunday School certificate day", "വേദപാഠ സർട്ടിഫിക്കറ്റ് വിതരണം"), category: "Community" },
  { image: "churchAlt3", title: B("His Holiness the Catholicos", "പരിശുദ്ധ കാതോലിക്കാ ബാവ"), category: "Heritage" },
];

// Parish videos for the gallery; the Videos section is hidden while this is empty.
// Example: { title: B("Parish Feast — Procession", "ഇടവക പെരുന്നാൾ — പ്രദക്ഷിണം"), poster: "churchDusk", youtubeId: "<YouTube id>", duration: "4:20" },
const videosRaw: { title: Bi; poster: ImageKey; youtubeId: string; duration: string }[] = [];

const testimonialsRaw = [
  {
    quote: B(
      "This parish has been our family's spiritual home for three generations. There is a peace here you feel the moment you step in.",
      "ഈ ഇടവക മൂന്നു തലമുറകളായി ഞങ്ങളുടെ കുടുംബത്തിന്റെ ആത്മീയ ഭവനമാണ്. കാലുകുത്തുന്ന നിമിഷം അനുഭവപ്പെടുന്ന ഒരു സമാധാനം ഇവിടെയുണ്ട്.",
    ),
    name: B("Mariamma Joseph", "മറിയാമ്മ ജോസഫ്"),
    role: B("Parishioner since 1974", "1974 മുതൽ ഇടവകാംഗം"),
  },
  {
    quote: B(
      "The youth ministry gave me a place to belong and to serve. I found my faith — and lifelong friends — through the OCYM.",
      "യുവജന ശുശ്രൂഷ എനിക്ക് ചേരാനും സേവിക്കാനും ഒരിടം നൽകി. ഒസിവൈഎമ്മിലൂടെ ഞാൻ എന്റെ വിശ്വാസവും ആജീവനാന്ത സുഹൃത്തുക്കളെയും കണ്ടെത്തി.",
    ),
    name: B("Alan Thomas", "അലൻ തോമസ്"),
    role: B("OCYM member", "ഒസിവൈഎം അംഗം"),
  },
  {
    quote: B(
      "The liturgy is celebrated with such reverence and beauty. Sunday Qurbana here is the anchor of our whole week.",
      "ആരാധനക്രമം എത്ര ഭക്തിയോടും സൗന്ദര്യത്തോടും കൂടെയാണ് ആഘോഷിക്കുന്നത്. ഇവിടത്തെ ഞായർ കുർബ്ബാനയാണ് ഞങ്ങളുടെ ആഴ്ചയുടെ അടിസ്ഥാനം.",
    ),
    name: B("Dr. Rekha Varghese", "ഡോ. രേഖ വർഗീസ്"),
    role: B("Choir member", "ഗായകസംഘം അംഗം"),
  },
];

const missionVisionRaw = {
  mission: B(
    "To be a welcoming family of faith — worshipping God in the beauty of the Malankara Orthodox Holy Qurbana, forming disciples of every age, and serving our neighbours with the compassion of Christ.",
    "ഊഷ്മളമായ ഒരു വിശ്വാസ കുടുംബമായിരിക്കുക — മലങ്കര ഓർത്തഡോക്സ് വിശുദ്ധ കുർബ്ബാനയുടെ സൗന്ദര്യത്തിൽ ദൈവത്തെ ആരാധിക്കുകയും എല്ലാ പ്രായത്തിലുമുള്ള ശിഷ്യരെ രൂപപ്പെടുത്തുകയും ക്രിസ്തുവിന്റെ കാരുണ്യത്തോടെ അയൽക്കാരെ സേവിക്കുകയും ചെയ്യുക.",
  ),
  vision: B(
    "A vibrant parish rooted in the ancient Thomistic tradition of Kerala, radiant with prayer, unity and charity, and always open to all who seek the Lord.",
    "കേരളത്തിന്റെ പുരാതന തോമായുടെ പാരമ്പര്യത്തിൽ വേരൂന്നിയ, പ്രാർത്ഥനയും ഐക്യവും ജീവകാരുണ്യവും കൊണ്ട് പ്രകാശിക്കുന്ന, കർത്താവിനെ അന്വേഷിക്കുന്ന എല്ലാവർക്കുമായി എപ്പോഴും തുറന്നിരിക്കുന്ന ഒരു ഊർജ്ജസ്വല ഇടവക.",
  ),
  values: [
    { title: B("Eucharist", "വിശുദ്ധ കുർബ്ബാന"), body: B("The Holy Qurbana is the source and summit of our life together.", "വിശുദ്ധ കുർബ്ബാനയാണ് ഞങ്ങളുടെ ഒരുമിച്ചുള്ള ജീവിതത്തിന്റെ ഉറവിടവും ഉച്ചകോടിയും."), icon: "Church" },
    { title: B("Heritage", "പൈതൃകം"), body: B("We treasure the St. Thomas Christian tradition handed to us.", "ഞങ്ങൾക്ക് കൈമാറിക്കിട്ടിയ മാർത്തോമ്മാ ക്രിസ്ത്യൻ പാരമ്പര്യത്തെ ഞങ്ങൾ വിലമതിക്കുന്നു."), icon: "Landmark" },
    { title: B("Community", "കൂട്ടായ്മ"), body: B("Through koottaymas and forums, no one journeys alone.", "കൂട്ടായ്മകളിലൂടെയും വേദികളിലൂടെയും, ആരും ഒറ്റയ്ക്ക് യാത്ര ചെയ്യുന്നില്ല."), icon: "Users" },
    { title: B("Charity", "ജീവകാരുണ്യം"), body: B("Faith becomes real in works of mercy toward the least.", "ഏറ്റവും ചെറിയവരോടുള്ള കരുണയുടെ പ്രവൃത്തികളിൽ വിശ്വാസം യാഥാർത്ഥ്യമാകുന്നു."), icon: "HeartHandshake" },
  ],
};

// The parish history as written by the parish (Malayalam original; English is a translation).
const parishHistoryRaw: Bi[] = [
  B(
    "St. Mary's Orthodox Syrian Pilgrim Church, Alencherry — a community of the faithful in the Thiruvananthapuram Diocese of the Malankara Orthodox Syrian Church — is one of the principal spiritual centres of the region. The parish's journey began on 29 January 1934, when its founding fathers — George Ummen of Bethel Bungalow, Eapen of Kandathil, Kochu Koshy of Poykavilayil, Koshy of Bethel Bhavan, Ummen of Vattavelil Mukalumpurathu, Tharian of Kalangarazhikathu, Joseph of Kochukonathu Puthenveedu, Chacko of Thekkadathu Veedu and Chacko of Kizhakkumkara Charuvila Veedu — registered the title deed. Construction of the church began in 1936, and in 1937 it was consecrated with H.G. Geevarghese Mar Philoxenos as the chief celebrant. Sri. V. K. Chacko Thayyil, the first headmaster of the parish Sunday School, later served the Church as Rev. Fr. Yacob (OIC), becoming the first priest from the parish.",
    "മലങ്കര ഓർത്തഡോക്സ് സുറിയാനി സഭയുടെ തിരുവനന്തപുരം ഭദ്രാസനത്തിലെ ഒരു വിശ്വാസസമൂഹമായ ആലഞ്ചേരി സെന്റ് മേരീസ് ഓർത്തഡോക്സ് സുറിയാനി തീർത്ഥാടന പള്ളി ഈ പ്രദേശത്തെ പ്രധാന ആത്മീയ കേന്ദ്രങ്ങളിലൊന്നാണ്. 1934 ജനുവരി 29-ന് ജോർജ് ഉമ്മൻ ബേഥേൽ ബംഗ്ലാവ്, ഈപ്പൻ കണ്ടത്തിൽ, കൊച്ചു കോശി പൊയ്കവിളയിൽ, കോശി ബെഥേൽ ഭവൻ, ഉമ്മൻ വട്ടവേലിൽ മുകളും പുറത്ത്, തര്യൻ കളങ്ങരഴികത്ത്, ജോസഫ് കൊച്ചുകോണത്ത് പുത്തൻവീട്, ചാക്കോ തെക്കടത്ത് വീട്, ചാക്കോ കിഴക്കുംകര ചരുവിള വീട് എന്നീ സ്ഥാപക പിതാക്കന്മാർ ആധാരരേഖ രജിസ്റ്റർ ചെയ്തതോടെയാണ് ഇടവകയുടെ ചരിത്രയാത്ര ആരംഭിക്കുന്നത്. 1936-ൽ ദേവാലയ നിർമ്മാണം ആരംഭിക്കുകയും 1937-ൽ അഭിവന്ദ്യ ഗീവർഗ്ഗീസ് മാർ പീലക്സിനോസ് തിരുമേനിയുടെ മുഖ്യകാർമ്മികത്വത്തിൽ ദേവാലയം പ്രതിഷ്ഠിക്കപ്പെടുകയും ചെയ്തു. ഇടവകയുടെ ആദ്യ സൺഡേ സ്കൂൾ ഹെഡ്മാസ്റ്ററായിരുന്ന ശ്രീ. വി. കെ. ചാക്കോ തയ്യിൽ പിന്നീട് റവ. ഫാ. യാക്കോബ് (OIC) ആയി സഭയെ ശുശ്രൂഷിക്കുകയും ഇടവകയിൽനിന്നുള്ള ആദ്യ വൈദികനായി മാറുകയും ചെയ്തു.",
  ),
  B(
    "During a visit to Kerala, Shimona, a monk of the monastery of Mount Athos on the Greek peninsula, lived in a cave at Kudukkathupara near Chanappetta in Kollam district and came to the church to pray and meditate. On the walls of the first church he painted the holy apostles, angels and a vine, and wrote verses of Holy Scripture in Malayalam script. On 21 November 1937 he dedicated to the church an icon of the Holy Mother of God painted on joined wooden boards — anointed with oil he had brought from the Holy Land and with water from the River Jordan — together with a cross carved on a stone gathered from the Jordan. On 18 December of the same year he gave a cross made of metal and wood. These are kept today in the church's meditation room.",
    "ഗ്രീസിലെ ഉപദ്വീപിൽ ഇന്നും നിലനിൽക്കുന്ന എയ്ഞ്ചൽ ഓഫ് സെന്റ് മൗണ്ട് ആതോസ് ആശ്രമാംഗമായ ‘ശിമോണ’ കേരളസന്ദർശനവേളയിൽ കൊല്ലം ജില്ലയിലെ ചണ്ണപ്പേട്ട കുടുക്കത്തുപാറയിലുള്ള ഗുഹയിൽ താമസിക്കവെ പള്ളിയിൽവന്ന് ധ്യാനമിരിക്കുകയും പ്രഥമ ദേവാലയത്തിന്റെ ഭിത്തികളിൽ വി. ശ്ലീഹൻമാരുടേയും, മാലാഖമാരുടേയും, മുന്തിരിവള്ളിയുടെയും ചിത്രങ്ങൾ വരയ്ക്കുകയും വി. വേദവാക്യങ്ങൾ മലയാള ലിപികളിൽ എഴുതുകയും ചെയ്തു. കൂടാതെ കൂട്ടിചേർത്ത പലകയിൽ വി. ദൈവമാതാവിന്റെ ഒരു ചിത്രം വരച്ച് അതിൽ താൻ വിശുദ്ധ നാട്ടിൽ നിന്നും കൊണ്ടുവന്ന തൈലവും, ജോർദ്ദാൻ നദിയിലെ ജലവും കൊണ്ട് അഭിഷേകം ചെയ്ത ചിത്രത്തോടൊപ്പം ജോർദ്ദാൻ നദിയിൽ നിന്നും ശേഖരിച്ച പാറക്കഷണത്തിൽ കൊത്തിയ ഒരു കുരിശും 1937 നവംബർ 21-ന് പള്ളിക്ക് സമർപ്പിച്ചു. കൂടാതെ അതേ വർഷം ഡിസംബർ 18-ന് ലോഹവും തടിയുംകൊണ്ട് നിർമ്മിച്ച ഒരു കുരിശും നൽകി. ഇവ ഇപ്പോൾ പള്ളിയുടെ ധ്യാനമുറിയിൽ സൂക്ഷിച്ചിട്ടുണ്ട്.",
  ),
  B(
    "The Ettunombu (eight-day Lent) feast began at the church in the time of Rev. Fr. Njanasikhamani Sasthri, who was appointed vicar in 1965. As the community of the faithful grew, a second church building was raised in 1966 with Sri. V. M. Chacko Vadakkeveettil, Sri. Varghese Baby Thoppil (Millil) and Sri. P. K. Kurian Puthenthottathil as conveners, and H.G. Mathews Mar Coorilos Metropolitan consecrated it on 13 February 1967. The present church was rebuilt in 2006, with Captain V. C. Samuel Vadakkeveettil as convener and Sri. K. P. John Puthenpurackal as joint convener. In 2010 the church was raised to the status of an international pilgrim church — a landmark in the history of the parish. The Martha Mariam meditation room was renovated in 2011 under the leadership of Sri. Varghese Mathew Thoppil (Millil), and the church itself in 2019.",
    "1965-ൽ വികാരിയായി നിയമിതനായ റവ. ഫാ. ജ്ഞാനശിഖാമണി ശാസ്ത്രിയുടെ കാലത്ത് ഈ ദേവാലയത്തിൽ എട്ടുനോമ്പു പെരുന്നാൾ ആരംഭിച്ചു. വിശ്വാസിസമൂഹത്തിന്റെ വളർച്ചയ്ക്കനുസരിച്ച് 1966-ൽ ശ്രീ. വി. എം. ചാക്കോ വടക്കേവീട്ടിൽ, ശ്രീ. വർഗ്ഗീസ് ബേബി തോപ്പിൽ (മില്ലിൽ), ശ്രീ. പി. കെ. കുര്യൻ പുത്തൻതോട്ടത്തിൽ എന്നിവർ കൺവീനർമാരായി രണ്ടാം ദേവാലയ കെട്ടിടം നിർമ്മിക്കപ്പെട്ടു. 1967 ഫെബ്രുവരി 13-ന് അഭിവന്ദ്യ മാത്യൂസ് മാർ കൂറിലോസ് മെത്രാപ്പോലീത്ത കൂദാശാകർമ്മം നിർവഹിച്ചു. തുടർന്ന് ക്യാപ്റ്റൻ വി. സി. സാമുവൽ വടക്കേവീട്ടിൽ കൺവീനറായും, ശ്രീ. കെ. പി. ജോൺ പുത്തൻപുരയ്ക്കൽ ജോയിന്റ് കൺവീനറായും നിലവിലുള്ള ദേവാലയം 2006-ൽ പുനർനിർമ്മിക്കപ്പെട്ടു. 2010-ൽ ദേവാലയത്തിന് അന്തർദേശീയ തീർത്ഥാടന ദേവാലയ പദവി ലഭിച്ചത് ഇടവകയുടെ ചരിത്രത്തിലെ സുപ്രധാന നാഴികക്കല്ലായി മാറി. 2011-ൽ ശ്രീ. വർഗ്ഗീസ് മാത്യു തോപ്പിൽ (മില്ലിൽ) നേതൃത്വത്തിൽ മർത്തമറിയം ധ്യാനമുറിയും 2019-ൽ ദൈവാലയവും നവീകരിച്ചു.",
  ),
  B(
    "Today the parish is a vibrant community of 279 families and more than 1,600 registered members, active in worship, spiritual formation, charitable work and the life of the wider Church. One Cor-Episcopa and two priests from the parish are serving the Church.",
    "നിലവിൽ 279 കുടുംബങ്ങളും 1600-ലധികം രജിസ്റ്റർ ചെയ്ത അംഗങ്ങളും ഉൾപ്പെടുന്ന സജീവമായ വിശ്വാസി സമൂഹമാണ് ഇടവകയിലുള്ളത്. ആരാധന, ആത്മീയ രൂപീകരണം, ജീവകാരുണ്യ പ്രവർത്തനങ്ങൾ, സഭാപങ്കാളിത്തം എന്നിവയിൽ ഇടവക സജീവമായി പ്രവർത്തിച്ചുവരുന്നു. ഇടവകയിൽനിന്നുള്ള ഒരു കോർ എപ്പിസ്കോപ്പയും രണ്ട് വൈദികരും സഭയെ ശുശ്രൂഷിച്ചുകൊണ്ടിരിക്കുന്നു.",
  ),
  B(
    "The parish carries on its spiritual mission under the supreme headship of H.H. Moran Mar Baselios Marthoma Mathews III Catholicos, the spiritual leadership of H.G. Dr. Geevarghese Mar Yulios, Assistant Metropolitan of the Thiruvananthapuram Diocese, and the guidance of the vicar, Rev. Fr. Varghese T. Varghese.",
    "പരിശുദ്ധ മോറാൻ മാർ ബസേലിയോസ് മാർത്തോമ്മാ മാത്യൂസ് തൃതീയൻ കാതോലിക്ക ബാവായുടെ പരമാധ്യക്ഷതയിലും തിരുവനന്തപുരം ഭദ്രാസന സഹായ മെത്രാപ്പോലീത്ത അഭിവന്ദ്യ ഡോ. ഗീവർഗ്ഗീസ് മാർ യൂലിയോസ് തിരുമേനിയുടെ ആത്മീയ നേതൃത്വത്തിലും ബഹു. വികാരി വർഗ്ഗീസ് ടി. വർഗ്ഗീസ് അച്ചന്റെ നേതൃത്വത്തിലും ഇടവകയുടെ ആത്മീയ ദൗത്യം തുടരുന്നു.",
  ),
];

// "ഇടവകയുടെ ദൗത്യരൂപരേഖ" — the parish mission framework.
const missionFrameworkRaw = {
  verse: {
    text: B(
      "And whether one member suffer, all the members suffer with it; or one member be honoured, all the members rejoice with it.",
      "അതിനാൽ ഒരു അവയവം കഷ്ടം അനുഭവിക്കുന്നു എങ്കിൽ അവയവങ്ങൾ ഒക്കെയും കൂടെ കഷ്ടം അനുഭവിക്കുന്നു; ഒരു അവയവത്തിന്നു മാനം വന്നാൽ അവയവങ്ങൾ ഒക്കെയുംകൂടെ സന്തോഷിക്കുന്നു.",
    ),
    ref: B("1 Corinthians 12:26", "1 കൊരിന്ത്യർ 12:26"),
  },
  intro: B(
    "In the light of this apostolic vision, the work of the parish's governing committees has been guided by one mission: to bring together children and elders, those who rejoice and those who are burdened, the living and the departed, in a bond of faith, care and service. This mission was not left in words alone. It was put into practice through spiritual, formative, social and charitable ministries shaped by the parish's spiritual vision and pastoral goals — planned around the needs of parishioners at every stage of life, to foster growth in faith, formation of character, participation in the Church and care for one another.",
    "ഈ അപ്പോസ്തോലിക ദർശനത്തിന്റെ വെളിച്ചത്തിൽ, കുട്ടികളെയും മുതിർന്നവരെയും, സന്തോഷിക്കുന്നവരെയും ഭാരപ്പെടുന്നവരെയും, ജീവിച്ചിരിക്കുന്നവരെയും വാങ്ങിപ്പോയവരെയും വിശ്വാസത്തിന്റെയും കരുതലിന്റെയും സേവനത്തിന്റെയും ബന്ധത്തിൽ ഒന്നിച്ചു ചേർക്കുക എന്ന ദൗത്യമാണ് ഭരണ സമിതികളുടെ പ്രവർത്തനങ്ങൾക്ക് വഴികാട്ടിയായത്. ഈ ദൗത്യം വാക്കുകളിൽ മാത്രം ഒതുക്കാതെ, ഇടവകയുടെ ആത്മീയ ദർശനത്തിന്റെയും ഇടയപരിപാലന ലക്ഷ്യങ്ങളുടെയും അടിസ്ഥാനത്തിൽ രൂപകൽപ്പന ചെയ്ത വിവിധ ആത്മീയ, രൂപീകരണ, സാമൂഹിക, ജീവകാരുണ്യ ശുശ്രൂഷകളിലൂടെ പ്രാവർത്തികമാക്കപ്പെട്ടു. ജീവിതത്തിന്റെ വിവിധ ഘട്ടങ്ങളിലുള്ള ഇടവകാംഗങ്ങളുടെ ആവശ്യങ്ങൾ പരിഗണിച്ചുകൊണ്ട് വിശ്വാസ വളർച്ച, വ്യക്തിത്വ രൂപീകരണം, സഭാപങ്കാളിത്തം, പരസ്പര കരുതൽ എന്നിവ ലക്ഷ്യമാക്കി ഈ പ്രവർത്തനങ്ങൾ ക്രമീകരിച്ചു നടപ്പാക്കി.",
  ),
  pillars: [
    {
      icon: "Sprout",
      title: B("Children & young people", "കുട്ടികളും യുവജനങ്ങളും"),
      body: B(
        "For the spiritual and personal growth of children and young people, the parish runs Aamodam — a fellowship for children, Anugraham — an educational assistance scheme, and a range of spiritual formation programmes. Their aim is to help them recognise the gifts and opportunities God has given them and grow as Good Stewards of Christ.",
        "കുട്ടികളുടെയും യുവജനങ്ങളുടെയും ആത്മീയവും വ്യക്തിപരവുമായ വളർച്ചയ്ക്കായി ആമോദം - കുട്ടികളുടെ കൂട്ടായ്മ, അനുഗ്രഹം - വിദ്യാഭ്യാസ സഹായ പദ്ധതി, വിവിധ ആത്മീയ രൂപീകരണ പരിപാടികൾ എന്നിവ നടപ്പിലാക്കുന്നു. ദൈവം നൽകിയ കഴിവുകളും അവസരങ്ങളും തിരിച്ചറിഞ്ഞ് ക്രിസ്തുവിന്റെ നല്ല കാര്യസ്ഥന്മാരായി (Good Stewards of Christ) വളരുവാൻ അവരെ പ്രാപ്തരാക്കുക എന്നതാണ് ഈ പ്രവർത്തനങ്ങളുടെ ലക്ഷ്യം.",
      ),
    },
    {
      icon: "HandHeart",
      title: B("Elders & the departed", "മുതിർന്നവരും വാങ്ങിപ്പോയവരും"),
      body: B(
        "For the elderly there are the Ashrayam pension scheme and Alambam. The life of faith is nourished through the Holy Qurbana, the daily prayers, the lents, retreats, ministries of the Word and spiritual training; and through the Aneede incense prayer and the remembrance of our forefathers, the memory of those who have fallen asleep in the faith is kept alive as part of the life of the Church.",
        "മുതിർന്നവർക്കായി ആശ്രയം പെൻഷൻ പദ്ധതി, ആലംബം, വി. കുർബാന, നിത്യനമസ്കാരങ്ങൾ, നോമ്പുകൾ, ധ്യാനങ്ങൾ, വചനശുശ്രൂഷകൾ, ആത്മീയപരിശീലനങ്ങൾ എന്നിവയിലൂടെ വിശ്വാസ ജീവിതം പരിപോഷിപ്പിക്കുന്നതോടൊപ്പം, ആനീദേ ധൂപപ്രാർത്ഥനയും പൂർവ്വിക സ്മരണകളും വഴി വിശ്വാസത്തിൽ നിദ്രപ്രാപിച്ചവരുടെ ഓർമ്മയും സഭാജീവിതത്തിന്റെ ഭാഗമായി നിലനിർത്തുന്നു.",
      ),
    },
  ],
  closing: B(
    "Beneath all of this lies a pastoral vision: not to wait for those in need to ask for help, but to recognise their needs and reach out to them in love. In this way the parish strives to touch each of its members at every stage of life, and to grow into a spiritual family that lives out the love, care and service of Christ.",
    "സഹായം ആവശ്യപ്പെടുന്നവരെ കാത്തിരിക്കാതെ അവരുടെ ആവശ്യങ്ങൾ തിരിച്ചറിഞ്ഞ് അവരിലേക്ക് സ്നേഹപൂർവ്വം എത്തിച്ചേരുക എന്ന ഇടയപരിപാലന ദർശനമാണ് ഈ പ്രവർത്തനങ്ങൾക്ക് അടിസ്ഥാനം. ഇപ്രകാരം ജീവിതത്തിന്റെ വിവിധ ഘട്ടങ്ങളിൽ ഓരോ ഇടവക അംഗത്തെയും സ്പർശിക്കുകയും, ക്രിസ്തുവിന്റെ സ്നേഹവും കരുതലും സേവനവും പ്രാവർത്തികമാക്കുന്ന ആത്മീയ കുടുംബമായി വളരുവാൻ ഇടവക ഈ കാലയളവിൽ പ്രവർത്തിക്കുന്നു.",
  ),
};

// From the parish history plaque ("ഇടവകയുടെ നാൾവഴികൾ"), unveiled 21 April 2024.
const timelineRaw: { year: string | Bi; date?: Bi; title: Bi; body: Bi }[] = [
  { year: "1932", title: B("Sunday School begins", "സൺഡേ സ്കൂൾ ആരംഭം"), body: B("The parish Sunday School was started.", "ഇടവകയിൽ സൺഡേ സ്കൂൾ ആരംഭിച്ചു.") },
  { year: "1934", date: B("29 January", "ജനുവരി 29"), title: B("The forefathers' covenant", "പൂർവ്വികരുടെ കരാർ"), body: B("George Ummen of Bethel Bungalow, Eapen of Kandathil, Kochu Koshy of Poykavilayil, Koshy of Bethel Vadakkethil, Ummen of Vattavilayil Mukalupurathu, Tharian of Kalangazhikathu, Joseph of Kochukonathu Puthenveettil, Chacko of Thekkethil Veedu and Chacko of Kizhakkekara Charuvila Veedu drew up and registered an agreement to establish the first church.", "ബെഥേൽ ബംഗ്ലാവിൽ ജോർജ്ജ് ഉമ്മൻ, കണ്ടത്തിൽ ഈപ്പൻ, പൊയ്കവിളയിൽ കൊച്ചു കോശി, ബെഥേൽ വടക്കേതിൽ കോശി, വട്ടവിളയിൽ മുകളുപുറത്ത് ഉമ്മൻ, കളങ്ങഴികത്ത് തര്യൻ, കൊച്ചുകോണത്ത് പുത്തൻവീട്ടിൽ ജോസഫ്, തെക്കേതിൽ വീട്ടിൽ ചാക്കോ, കിഴക്കേക്കര ചരുവിള വീട്ടിൽ ചാക്കോ എന്നീ പൂർവ്വികർ പ്രഥമ ദേവാലയം സ്ഥാപിക്കുന്നതിന് കരാർ തയ്യാറാക്കി രജിസ്റ്റർ ചെയ്തു.") },
  { year: "1937", date: B("28 August", "ഓഗസ്റ്റ് 28"), title: B("The first church consecrated", "പ്രഥമ ദേവാലയ കൂദാശ"), body: B("St. Mary's Orthodox Church, Alencherry was consecrated by H.G. Puthenkavil Geevarghese Mar Philoxenos Metropolitan and included in the Diocese of Kollam. First vicar: Ayoor Mavilazhikathu Koshy Kathanar.", "ആലഞ്ചേരി സെന്റ് മേരീസ് ഓർത്തഡോക്സ് ദേവാലയം പുത്തൻകാവിൽ ഗീവർഗ്ഗീസ് മാർ പീലക്സീനോസ് മെത്രാപ്പോലീത്താ കൂദാശ ചെയ്ത് കൊല്ലം ഭദ്രാസനത്തിൽ ഉൾപ്പെടുത്തി. പ്രഥമ വികാരി: ആയൂർ മാവിലഴികത്ത് കോശി കത്തനാർ.") },
  { year: "1937", date: B("21 November", "നവംബർ 21"), title: B("Icon from Mount Athos", "മൗണ്ട് ആതോസിൽ നിന്നൊരു ചിത്രം"), body: B("Shimona (Br. Schema-monk Constantine Gustovit), a monk of the Mount Athos monastery, dedicated an icon of the Mother of God and a cross to the church.", "മൗണ്ട് ആതോസ് ആശ്രമാംഗമായ ശിമോന (Br. Schema-monk Constantine Gustovit) ദൈവമാതാവിന്റെ ചിത്രവും കുരിശും സമർപ്പിച്ചു.") },
  { year: "1937", date: B("18 December", "ഡിസംബർ 18"), title: B("The metal-clad cross", "ലോഹചട്ടയുള്ള കുരിശ്"), body: B("Shimona (Br. Schema-monk Constantine Gustovit) dedicated a wooden cross encased in metal.", "ശിമോന (Br. Schema-monk Constantine Gustovit) ലോഹചട്ടയുള്ള തടികുരിശ് സമർപ്പിച്ചു.") },
  { year: "1961", date: B("26 December", "ഡിസംബർ 26"), title: B("Foundation of the second church", "രണ്ടാം ദേവാലയത്തിന് ശിലാസ്ഥാപനം"), body: B("H.G. Mathews Mar Coorilos laid the foundation stone for the second church.", "അഭിവന്ദ്യ മാത്യൂസ് മാർ കൂറിലോസ് തിരുമേനി രണ്ടാം ദേവാലയത്തിന് ശിലാസ്ഥാപന കർമ്മം നിർവഹിച്ചു.") },
  { year: "1965", date: B("1 September", "സെപ്റ്റംബർ 1"), title: B("Ettunombu feast begins", "എട്ടുനോമ്പ് പെരുന്നാൾ"), body: B("The Ettunombu (eight-day Lent) feast was celebrated for the first time.", "എട്ടുനോമ്പ് പെരുന്നാൾ ആരംഭിച്ചു.") },
  { year: "1966", date: B("13 February", "ഫെബ്രുവരി 13"), title: B("The second church", "രണ്ടാം ദേവാലയം"), body: B("H.G. Mathews Mar Coorilos consecrated the second church.", "അഭിവന്ദ്യ മാത്യൂസ് മാർ കൂറിലോസ് തിരുമേനി രണ്ടാം ദേവാലയം കൂദാശ ചെയ്തു.") },
  { year: "1975", date: B("6 September", "സെപ്റ്റംബർ 6"), title: B("Apostolic visit", "ശ്ലൈഹിക സന്ദർശനം"), body: B("H.H. Baselios Marthoma Mathews I Catholicos made an apostolic visit to the parish.", "പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ മാത്യൂസ് പ്രഥമൻ കാതോലിക്കാ ബാവ ഇടവകയിൽ ശ്ലൈഹിക സന്ദർശനം നടത്തി.") },
  { year: "1979", title: B("Diocese of Thiruvananthapuram", "തിരുവനന്തപുരം ഭദ്രാസനം"), body: B("The church was included in the Diocese of Thiruvananthapuram.", "ദേവാലയം തിരുവനന്തപുരം ഭദ്രാസനത്തിൽ ഉൾപ്പെടുത്തി.") },
  { year: "1982", date: B("1 September", "സെപ്റ്റംബർ 1"), title: B("Shrine of the Mother of God", "ദൈവമാതാവിന്റെ ധ്യാന മന്ദിരം"), body: B("H.G. Geevarghese Mar Dioscoros Metropolitan consecrated the meditation shrine (Dhyana Mandiram) of the Mother of God.", "ദൈവമാതാവിന്റെ ധ്യാന മന്ദിരം അഭിവന്ദ്യ ഗീവർഗ്ഗീസ് മാർ ദിയസ്കോറോസ് മെത്രാപ്പോലീത്താ കൂദാശ ചെയ്തു.") },
  { year: "2001", date: B("6 September", "സെപ്റ്റംബർ 6"), title: B("Foundation of the third church", "മൂന്നാം ദേവാലയത്തിന് ശിലാസ്ഥാപനം"), body: B("H.H. Baselios Marthoma Mathews II Catholicos laid the foundation stone for the third church.", "പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ മാത്യൂസ് ദ്വിതീയൻ കാതോലിക്കാ ബാവ മൂന്നാം ദേവാലയത്തിന് ശിലാസ്ഥാപന കർമ്മം നിർവഹിച്ചു.") },
  { year: "2002", date: B("8 September", "സെപ്റ്റംബർ 8"), title: B("The second meditation shrine", "രണ്ടാം ധ്യാന മന്ദിരം"), body: B("H.G. Zacharias Mar Anthonios Metropolitan consecrated the second meditation shrine (Dhyana Mandiram) of the Mother of God.", "ദൈവമാതാവിന്റെ രണ്ടാം ധ്യാന മന്ദിരം അഭിവന്ദ്യ സഖറിയാസ് മാർ അന്തോണിയോസ് മെത്രാപ്പോലീത്താ കൂദാശ ചെയ്തു.") },
  { year: "2006", date: B("30–31 August", "ഓഗസ്റ്റ് 30, 31"), title: B("The third church consecrated", "മൂന്നാം ദേവാലയ കൂദാശ"), body: B("H.H. Baselios Marthoma Didymos I Catholicos consecrated the third church.", "പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ ദിദിമോസ് പ്രഥമൻ കാതോലിക്കാ ബാവ മൂന്നാം ദേവാലയം കൂദാശ ചെയ്തു.") },
  { year: "2010", date: B("3 September", "സെപ്റ്റംബർ 3"), title: B("International Martha Mariam pilgrimage centre", "അന്താരാഷ്ട്ര മർത്തമറിയം തീർത്ഥാടന കേന്ദ്രം"), body: B("The church was declared an International Martha Mariam Pilgrimage Centre by H.H. Baselios Marthoma Didymos I Catholicos.", "പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ ദിദിമോസ് പ്രഥമൻ കാതോലിക്കാ ബാവ അന്താരാഷ്ട്ര മർത്തമറിയം തീർത്ഥാടന കേന്ദ്രമായി പ്രഖ്യാപിച്ചു.") },
  { year: "2011", date: B("28 August", "ഓഗസ്റ്റ് 28"), title: B("Shrine renewed", "ധ്യാന മന്ദിരം നവീകരിച്ചു"), body: B("H.G. Dr. Gabriel Mar Gregorios Metropolitan consecrated the renovated meditation shrine of the Mother of God.", "നവീകരിച്ച ദൈവമാതാവിന്റെ ധ്യാന മന്ദിരം അഭി. ഡോ. ഗബ്രിയേൽ മാർ ഗ്രീഗോറിയോസ് മെത്രാപ്പോലീത്താ കൂദാശ ചെയ്തു.") },
  { year: "2019", date: B("24–25 August", "ഓഗസ്റ്റ് 24, 25"), title: B("Madbaha and Haikala renewed", "മദ്ബഹായും ഹൈക്കലായും"), body: B("H.G. Dr. Gabriel Mar Gregorios Metropolitan consecrated the renovated Madbaha (sanctuary) and Haikala (nave).", "പുനർനവീകരിച്ച മദ്ബഹായും ഹൈക്കലായും അഭി. ഡോ. ഗബ്രിയേൽ മാർ ഗ്രീഗോറിയോസ് മെത്രാപ്പോലീത്താ കൂദാശ ചെയ്തു.") },
  { year: "2024", date: B("21 April", "ഏപ്രിൽ 21"), title: B("St. Jude Chapel", "സെന്റ് ജൂഡ് ചാപ്പൽ"), body: B("H.G. Dr. Gabriel Mar Gregorios Metropolitan laid the foundation stone for the St. Jude Chapel.", "സെന്റ് ജൂഡ് ചാപ്പലിന് അഭി. ഡോ. ഗബ്രിയേൽ മാർ ഗ്രീഗോറിയോസ് മെത്രാപ്പോലീത്താ ശിലാസ്ഥാപന കർമ്മം നിർവഹിച്ചു.") },
  { year: "2026", date: B("4 September", "സെപ്റ്റംബർ 4"), title: B("Relics of St. Gregorios of Parumala enshrined", "പരുമല മാർ ഗ്രീഗോറിയോസിന്റെ തിരുശേഷിപ്പ് സ്ഥാപിച്ചു"), body: B("H.H. Baselios Marthoma Mathews III, Catholicos of the East and Malankara Metropolitan, enshrined the relics of St. Gregorios of Parumala.", "പൗരസ്ത്യ കാതോലിക്കായും മലങ്കര മെത്രാപ്പോലീത്തയുമായ പരിശുദ്ധ ബസേലിയോസ് മാർത്തോമ്മാ മാത്യൂസ് തൃതീയൻ കാതോലിക്കാ ബാവ പരുമല മാർ ഗ്രീഗോറിയോസ് തിരുമേനിയുടെ തിരുശേഷിപ്പ് സ്ഥാപിച്ചു.") },
  { year: B("Today", "ഇന്ന്"), title: B("A living parish", "ജീവനുള്ള ഇടവക"), body: B("Home to 279 families, more than 1,600 members and a dozen ministries, the parish continues its journey of faith and service.", "279 കുടുംബങ്ങളുടെയും 1600-ലധികം അംഗങ്ങളുടെയും നിരവധി കൂട്ടായ്മകളുടെയും ഭവനമായി, ഇടവക വിശ്വാസത്തിന്റെയും സേവനത്തിന്റെയും യാത്ര തുടരുന്നു.") },
];

const patronSaintRaw = {
  name: B("Nativity of the Blessed Virgin Mary", "പരിശുദ്ധ കന്യാമറിയത്തിന്റെ ജനനം"),
  title: B("Patroness of the Parish", "ഇടവകയുടെ മധ്യസ്ഥ"),
  feast: B("8 September", "സെപ്റ്റംബർ 8"),
  image: "candles" as ImageKey,
  body: B(
    "Our parish is dedicated to Mary, Mother of God, under the title of her Nativity. As the Church celebrates the birth of the Blessed Virgin — the dawn that heralds the Sun of Justice — our community looks to her as mother, model and intercessor. In the Malankara Orthodox tradition her honour is woven through the liturgical year, and the parish feast in September is the great gathering of our whole family.",
    "ഞങ്ങളുടെ ഇടവക ദൈവമാതാവായ മറിയത്തിന്റെ ജനനത്തിന്റെ നാമത്തിൽ സമർപ്പിക്കപ്പെട്ടിരിക്കുന്നു. നീതിസൂര്യനെ അറിയിക്കുന്ന ഉഷസ്സായ പരിശുദ്ധ കന്യകയുടെ ജനനം സഭ ആഘോഷിക്കുമ്പോൾ, ഞങ്ങളുടെ കൂട്ടായ്മ അവളെ അമ്മയായും മാതൃകയായും മാധ്യസ്ഥയായും കാണുന്നു. മലങ്കര ഓർത്തഡോക്സ് പാരമ്പര്യത്തിൽ അവളുടെ ബഹുമാനം ആരാധനാവർഷത്തിലുടനീളം നെയ്തിരിക്കുന്നു, സെപ്റ്റംബറിലെ ഇടവക പെരുന്നാൾ ഞങ്ങളുടെ കുടുംബം മുഴുവന്റെയും വലിയ ഒത്തുചേരലാണ്.",
  ),
};

const givingRaw = {
  intro: B(
    "Your generosity sustains the worship, upkeep and charitable works of the parish. Every contribution, large or small, is received with gratitude and prayer.",
    "നിങ്ങളുടെ ഔദാര്യം ഇടവകയുടെ ആരാധനയും പരിപാലനവും ജീവകാരുണ്യ പ്രവർത്തനങ്ങളും നിലനിർത്തുന്നു. ചെറുതോ വലുതോ ആയ ഓരോ സംഭാവനയും കൃതജ്ഞതയോടും പ്രാർത്ഥനയോടും കൂടെ സ്വീകരിക്കുന്നു.",
  ),
  upiId: "stmarysalayamon@sbi",
  bank: {
    accountName: "St. Mary's Orthodox Church, Alencherry",
    accountNumber: "0000 0000 0000",
    // Account name, number and IFSC stay in English: donors copy them into banking apps.
    bank: B("State Bank of India", "സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ഇന്ത്യ"),
    branch: B("Anchal, Kollam", "അഞ്ചൽ, കൊല്ലം"),
    ifsc: "SBIN0000000",
  },
  purposes: [
    { title: B("Church Maintenance", "പള്ളി പരിപാലനം"), body: B("Upkeep of the church, altar and grounds.", "പള്ളിയുടെയും അൾത്താരയുടെയും മുറ്റത്തിന്റെയും പരിപാലനം."), icon: "Church" },
    { title: B("Charity & Outreach", "ജീവകാരുണ്യവും സഹായവും"), body: B("Support for the poor, sick and families in need.", "ദരിദ്രർക്കും രോഗികൾക്കും ആവശ്യമുള്ള കുടുംബങ്ങൾക്കും സഹായം."), icon: "HeartHandshake" },
    { title: B("Feast & Liturgy", "പെരുന്നാളും ആരാധനയും"), body: B("Flowers, vestments and the celebration of feasts.", "പുഷ്പങ്ങൾ, തിരുവസ്ത്രങ്ങൾ, പെരുന്നാൾ ആഘോഷം."), icon: "Sparkles" },
    { title: B("Formation", "പരിശീലനം"), body: B("Catechism, youth ministry and faith formation.", "മതബോധനം, യുവജന ശുശ്രൂഷ, വിശ്വാസ പരിശീലനം."), icon: "BookOpen" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Localizer                                                         */
/* ------------------------------------------------------------------ */
export type ParishData = {
  verses: Verse[];
  heroVerse: Verse;
  sundayMass: MassSlot[];
  weekdayMass: MassSlot[];
  devotions: Devotion[];
  specialSchedules: SpecialSchedule[];
  announcements: Announcement[];
  upcomingFeast: { title: string; malayalam: string; date: string; blurb: string; image: ImageKey };
  events: ChurchEvent[];
  navathiPrograms: NavathiProgram[];
  prelates: { name: string; title: string; image: ImageKey; file: string }[];
  parishPriest: Clergy;
  assistantPriest: Clergy;
  managingCommittee: { name: string; role: string; photo?: string }[];
  committeeMembers: { name: string; photo: string; role?: string }[];
  auditors: { name: string; photo: string }[];
  sacristans: { name: string; photo: string }[];
  parishPriests: { name: string; photo?: string; role?: string; memorial: boolean }[];
  formerVicars: { name: string; role?: string; years: string; note?: string }[];
  organizations: Organization[];
  missionProjects: MissionProject[];
  gallery: GalleryItem[];
  videos: ParishVideo[];
  testimonials: Testimonial[];
  missionVision: {
    mission: string;
    vision: string;
    values: { title: string; body: string; icon: string }[];
  };
  parishHistory: string[];
  missionFramework: {
    verse: { text: string; ref: string };
    intro: string;
    pillars: { icon: string; title: string; body: string }[];
    closing: string;
  };
  timeline: TimelineEvent[];
  patronSaint: { name: string; title: string; feast: string; image: ImageKey; body: string };
  giving: {
    intro: string;
    upiId: string;
    bank: { accountName: string; accountNumber: string; bank: string; branch: string; ifsc: string };
    purposes: { title: string; body: string; icon: string }[];
  };
};

// Cached per locale so callers get stable references (safe as effect/memo deps).
const dataCache: Partial<Record<Locale, ParishData>> = {};

export function getData(locale: Locale): ParishData {
  return (dataCache[locale] ??= buildData(locale));
}

function buildData(locale: Locale): ParishData {
  const L = <T,>(b: { en: T; ml: T }) => pick(b, locale);
  return {
    verses: versesRaw.map((v) => ({ text: L(v.text), ref: L(v.ref) })),
    heroVerse: { text: L(versesRaw[0].text), ref: L(versesRaw[0].ref) },
    sundayMass: sundayMassRaw.map((s) => ({ day: L(s.day), times: s.times, note: s.note ? L(s.note) : undefined })),
    weekdayMass: weekdayMassRaw.map((s) => ({ day: L(s.day), times: s.times, note: s.note ? L(s.note) : undefined })),
    devotions: devotionsRaw.map((d) => ({ title: L(d.title), detail: L(d.detail), extra: L(d.extra), icon: d.icon })),
    specialSchedules: specialSchedulesRaw.map((s) => ({ occasion: L(s.occasion), dates: L(s.dates), detail: L(s.detail) })),
    announcements: announcementsRaw.map((a) => ({
      title: L(a.title), date: L(a.date), body: L(a.body), tag: L(a.tag), event: a.event,
    })),
    upcomingFeast: {
      title: L(upcomingFeastRaw.title),
      malayalam: L(upcomingFeastRaw.malayalam),
      date: upcomingFeastRaw.date,
      blurb: L(upcomingFeastRaw.blurb),
      image: upcomingFeastRaw.image,
    },
    events: eventsRaw.map((e) => ({
      slug: e.slug, title: L(e.title), date: e.date, endDate: e.endDate,
      time: L(e.time), location: L(e.location), category: e.category,
      image: e.image, excerpt: L(e.excerpt), featured: e.featured, album: e.album,
      details: e.details?.map(L),
      schedule: e.schedule?.map((d) => ({
        date: d.date,
        items: d.items.map((i) => ({ time: i.time, title: L(i.title), lines: i.lines?.map(L) })),
      })),
    })),
    navathiPrograms: navathiProgramsRaw.map((p) => ({
      date: p.date, endDate: p.endDate, time: p.time && L(p.time),
      title: L(p.title), description: L(p.description), location: L(p.location), event: p.event,
    })),
    prelates: prelatesRaw.map((p) => ({ name: L(p.name), title: L(p.title), image: p.image, file: p.file })),
    parishPriest: {
      name: L(parishPriestRaw.name), role: L(parishPriestRaw.role), image: parishPriestRaw.image,
      since: L(parishPriestRaw.since), bio: L(parishPriestRaw.bio), quote: L(parishPriestRaw.quote),
    },
    assistantPriest: {
      name: L(assistantPriestRaw.name), role: L(assistantPriestRaw.role), image: assistantPriestRaw.image,
      since: L(assistantPriestRaw.since), bio: L(assistantPriestRaw.bio), quote: L(assistantPriestRaw.quote),
    },
    managingCommittee: managingCommitteeRaw.map((m) => ({ name: L(m.name), role: L(m.role), photo: "photo" in m ? m.photo : undefined })),
    committeeMembers: committeeMembersRaw.map((m) => ({ name: L(m.name), photo: m.photo, role: m.role ? L(m.role) : undefined })),
    auditors: auditorsRaw.map((m) => ({ name: L(m.name), photo: m.photo })),
    sacristans: sacristansRaw.map((m) => ({ name: L(m.name), photo: m.photo })),
    parishPriests: parishPriestsRaw.map((m) => ({
      name: L(m.name), photo: m.photo, role: m.role ? L(m.role) : undefined, memorial: m.memorial ?? false,
    })),
    formerVicars: formerVicarsRaw.map((v) => ({
      name: L(v.name), role: v.role ? L(v.role) : undefined, years: v.years, note: v.note ? L(v.note) : undefined,
    })),
    organizations: organizationsRaw.map((o) => {
      const name = locale === "ml" ? orgNameMl[o.slug] ?? o.name : o.name;
      const sub = o.malayalam ? L(o.malayalam) : undefined;
      return {
        // Drop the subtitle when it would just repeat the (Malayalam) name.
        slug: o.slug, name, malayalam: sub === name ? undefined : sub,
        short: L(o.short), description: L(o.description), meeting: L(o.meeting),
        icon: o.icon, image: o.image, photos: o.photos, audience: L(o.audience),
        schedule: o.schedule?.map((g) => ({ name: L(g.name), day: L(g.day), time: g.time })),
      };
    }),
    missionProjects: missionProjectsRaw.map((m) => ({
      name: L(m.name), malayalam: m.name.ml, tagline: L(m.tagline), description: L(m.description), icon: m.icon,
    })),
    gallery: galleryRaw.map((g) => ({ image: g.image, title: L(g.title), category: g.category, span: g.span })),
    videos: videosRaw.map((v) => ({ title: L(v.title), poster: v.poster, youtubeId: v.youtubeId, duration: v.duration })),
    testimonials: testimonialsRaw.map((t) => ({ quote: L(t.quote), name: L(t.name), role: L(t.role) })),
    missionVision: {
      mission: L(missionVisionRaw.mission),
      vision: L(missionVisionRaw.vision),
      values: missionVisionRaw.values.map((v) => ({ title: L(v.title), body: L(v.body), icon: v.icon })),
    },
    parishHistory: parishHistoryRaw.map(L),
    missionFramework: {
      verse: { text: L(missionFrameworkRaw.verse.text), ref: L(missionFrameworkRaw.verse.ref) },
      intro: L(missionFrameworkRaw.intro),
      pillars: missionFrameworkRaw.pillars.map((p) => ({ icon: p.icon, title: L(p.title), body: L(p.body) })),
      closing: L(missionFrameworkRaw.closing),
    },
    timeline: timelineRaw.map((t) => ({ year: typeof t.year === "string" ? t.year : L(t.year), date: t.date && L(t.date), title: L(t.title), body: L(t.body) })),
    patronSaint: {
      name: L(patronSaintRaw.name), title: L(patronSaintRaw.title), feast: L(patronSaintRaw.feast),
      image: patronSaintRaw.image, body: L(patronSaintRaw.body),
    },
    giving: {
      intro: L(givingRaw.intro), upiId: givingRaw.upiId,
      bank: { ...givingRaw.bank, bank: L(givingRaw.bank.bank), branch: L(givingRaw.bank.branch) },
      purposes: givingRaw.purposes.map((p) => ({ title: L(p.title), body: L(p.body), icon: p.icon })),
    },
  };
}

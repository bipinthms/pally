import type { ImageKey } from "@/lib/images";
import { pick, type Bi, type Locale } from "@/lib/i18n/config";

/* ------------------------------------------------------------------ */
/*  Localized output types (what components receive)                  */
/* ------------------------------------------------------------------ */
export type Verse = { text: string; ref: string };
export type MassSlot = { day: string; times: string[]; note?: string };
export type Devotion = { title: string; detail: string; extra: string; icon: string };
export type SpecialSchedule = { occasion: string; dates: string; detail: string };
export type Announcement = { title: string; date: string; body: string; tag: string };
export type EventCategory = "Feast" | "Retreat" | "Sacrament" | "Community" | "Youth" | "News";
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
  audience: string;
};
export type GalleryCategory = "Church" | "Feasts" | "Liturgy" | "Community" | "Heritage";
export type GalleryItem = {
  image: ImageKey;
  title: string;
  category: GalleryCategory;
  span?: "tall" | "wide";
};
export type ParishVideo = { title: string; poster: ImageKey; youtubeId: string; duration: string };
export type Testimonial = { quote: string; name: string; role: string };
export type TimelineEvent = { year: string; title: string; body: string };

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
  { day: B("Saturday (Vigil)", "ശനി (തലേന്ന്)"), times: ["6:00 PM"], note: B("Malayalam", "മലയാളം") },
  { day: B("Sunday", "ഞായർ"), times: ["6:00 AM", "8:00 AM", "10:00 AM"], note: B("Malayalam", "മലയാളം") },
  { day: B("Sunday", "ഞായർ"), times: ["5:30 PM"], note: B("English", "ഇംഗ്ലീഷ്") },
];

const weekdayMassRaw = [
  { day: B("Monday", "തിങ്കൾ"), times: ["6:30 AM"], note: B("Malayalam", "മലയാളം") },
  { day: B("Tuesday", "ചൊവ്വ"), times: ["6:30 AM"], note: B("Intercession of the saints", "പുണ്യവാന്മാരുടെ മാധ്യസ്ഥ്യം") },
  { day: B("Wednesday", "ബുധൻ"), times: ["6:30 AM"], note: B("Intercession of St. Mary", "വിശുദ്ധ മറിയത്തിന്റെ മാധ്യസ്ഥ്യം") },
  { day: B("Thursday", "വ്യാഴം"), times: ["6:30 AM"], note: B("Evening prayer follows", "സന്ധ്യാ പ്രാർത്ഥന തുടർന്ന്") },
  { day: B("Friday", "വെള്ളി"), times: ["6:30 AM"], note: B("Passion prayers (Lent)", "പീഡാനുഭവ പ്രാർത്ഥന (നോമ്പ്)") },
  { day: B("Saturday", "ശനി"), times: ["6:30 AM"], note: B("Remembrance of the departed", "മൃതാത്മാക്കളുടെ ഓർമ്മ") },
];

const devotionsRaw = [
  {
    title: B("Holy Confession", "വിശുദ്ധ കുമ്പസാരം"),
    detail: B("Half an hour before the Holy Qurbana", "വിശുദ്ധ കുർബ്ബാനയ്ക്ക് അര മണിക്കൂർ മുമ്പ്"),
    extra: B("Saturdays 5:00 – 6:00 PM · or by appointment with the vicar", "ശനിയാഴ്ച 5:00 – 6:00 PM · അല്ലെങ്കിൽ വികാരിയുമായി മുൻകൂട്ടി"),
    icon: "HeartHandshake",
  },
  {
    title: B("Morning & Evening Prayer", "പ്രഭാത, സന്ധ്യാ പ്രാർത്ഥന"),
    detail: B("Daily — Prabhata & Sandhya Namaskaram", "ദിവസേന — പ്രഭാത, സന്ധ്യാ നമസ്കാരം"),
    extra: B("The canonical hours prayed morning and dusk", "പ്രഭാതത്തിലും സന്ധ്യയിലും യാമപ്രാർത്ഥനകൾ"),
    icon: "Church",
  },
  {
    title: B("Intercessory Prayers", "മാധ്യസ്ഥ്യ പ്രാർത്ഥന"),
    detail: B("To St. Mary and all the saints", "വിശുദ്ധ മറിയത്തോടും സകല പുണ്യവാന്മാരോടും"),
    extra: B("Weekly intercessions and memorial prayers", "പ്രതിവാര മാധ്യസ്ഥ്യവും ഓർമ്മ പ്രാർത്ഥനയും"),
    icon: "Sparkles",
  },
  {
    title: B("Anointing & Home Visits", "രോഗീലേപനവും ഭവന സന്ദർശനവും"),
    detail: B("For the sick and elderly, on request", "രോഗികൾക്കും വൃദ്ധർക്കും, അഭ്യർത്ഥന പ്രകാരം"),
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
    detail: B("Preceded by the Ettu Nombu (eight-day Lent); solemn Holy Qurbana at 8:00 AM.", "എട്ടു നോമ്പിനു ശേഷം; 8:00 AM-ന് ആഘോഷ വിശുദ്ധ കുർബ്ബാന."),
  },
];

const announcementsRaw = [
  {
    title: B("Parish Feast Nombu begins", "ഇടവക പെരുന്നാൾ നോമ്പ് ആരംഭിക്കുന്നു"),
    date: B("31 Aug 2026", "31 ഓഗ 2026"),
    body: B(
      "The eight-day Ettu Nombu in honour of St. Mary begins with flag hoisting after the 6:00 PM Qurbana. All parishioners are warmly invited.",
      "പരിശുദ്ധ അമ്മയുടെ ബഹുമാനാർത്ഥമുള്ള എട്ടു ദിവസത്തെ നോമ്പ് 6:00 PM കുർബ്ബാനയ്ക്കു ശേഷം കൊടിയേറ്റോടെ ആരംഭിക്കുന്നു. എല്ലാ ഇടവകാംഗങ്ങളെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.",
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
  date: "2026-09-08T08:00:00+05:30",
  blurb: B(
    "Our parish gathers for eight days of grace — the Ettu Nombu, procession and the solemn feast of the Nativity of the Blessed Virgin Mary.",
    "എട്ടു ദിവസത്തെ കൃപയ്ക്കായി ഞങ്ങളുടെ ഇടവക ഒരുമിക്കുന്നു — നോമ്പ്, പ്രദക്ഷിണം, പരിശുദ്ധ കന്യാമറിയത്തിന്റെ ജനനത്തിന്റെ ആഘോഷ തിരുനാൾ.",
  ),
  image: "churchAlt" as ImageKey,
};

const eventsRaw: {
  slug: string; title: Bi; date: string; endDate?: string; time: Bi; location: Bi;
  category: EventCategory; image: ImageKey; excerpt: Bi; featured?: boolean;
}[] = [
  {
    slug: "vbs-2026",
    title: B("Vacation Bible School — 'Rooted in Christ'", "വെക്കേഷൻ ബൈബിൾ സ്കൂൾ — 'ക്രിസ്തുവിൽ വേരൂന്നി'"),
    date: "2026-05-04", endDate: "2026-05-09",
    time: B("9:00 AM – 12:30 PM", "9:00 AM – 12:30 PM"),
    location: B("Parish Hall", "ഇടവക ഹാൾ"),
    category: "News", image: "gathering",
    excerpt: B(
      "Over 180 children spent a joyful week of songs, scripture and craft. Our thanks to the animators and OCYM volunteers.",
      "180-ലധികം കുട്ടികൾ പാട്ടും വചനവും കരകൗശലവുമായി സന്തോഷകരമായ ഒരാഴ്ച ചെലവഴിച്ചു. അനിമേറ്റർമാർക്കും ഒസിവൈഎം സന്നദ്ധപ്രവർത്തകർക്കും നന്ദി.",
    ),
  },
  {
    slug: "kcym-retreat",
    title: B("OCYM Youth Retreat", "ഒസിവൈഎം യുവജന ധ്യാനം"),
    date: "2026-08-02", time: B("8:30 AM – 5:00 PM", "8:30 AM – 5:00 PM"),
    location: B("Parish Hall & Adoration Chapel", "ഇടവക ഹാളും ആരാധനാ കപ്പേളയും"),
    category: "Youth", image: "candlesPrayer",
    excerpt: B(
      "A one-day Spirit-filled retreat for parish youth — praise, teaching, worship and confession. Registration at the office.",
      "ഇടവക യുവജനങ്ങൾക്കായി ഒരു ദിവസത്തെ ആത്മനിറവുള്ള ധ്യാനം — സ്തുതി, പ്രബോധനം, ആരാധന, കുമ്പസാരം. രജിസ്ട്രേഷൻ ഓഫീസിൽ.",
    ),
    featured: true,
  },
  {
    slug: "assumption-2026",
    title: B("Shunoyo — Dormition of St. Mary", "ശുനോയോ — വിശുദ്ധ മറിയത്തിന്റെ വാങ്ങിപ്പ്"),
    date: "2026-08-15", time: B("8:00 AM Solemn Qurbana", "8:00 AM ആഘോഷ കുർബ്ബാന"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Feast", image: "candles",
    excerpt: B(
      "A great feast of St. Mary, preceded by the Ettu Nombu. Solemn Holy Qurbana with festal prayers.",
      "എട്ടു നോമ്പിനു ശേഷമുള്ള വിശുദ്ധ മറിയത്തിന്റെ വലിയ പെരുന്നാൾ. ആഘോഷ വിശുദ്ധ കുർബ്ബാനയും തിരുനാൾ പ്രാർത്ഥനകളും.",
    ),
    featured: true,
  },
  {
    slug: "onam-sneha-virunnu",
    title: B("Onam Sneha Virunnu — Community Meal", "ഓണം സ്നേഹവിരുന്ന് — കൂട്ടായ്മ സദ്യ"),
    date: "2026-08-30", time: B("12:30 PM", "12:30 PM"),
    location: B("Parish Grounds", "ഇടവക മൈതാനം"),
    category: "Community", image: "celebration",
    excerpt: B(
      "The whole parish family shares a traditional Onam sadya in a spirit of harmony and fellowship. All are welcome.",
      "ഇടവക കുടുംബം മുഴുവൻ ഐക്യത്തിന്റെയും കൂട്ടായ്മയുടെയും ചൈതന്യത്തിൽ പരമ്പരാഗത ഓണസദ്യ പങ്കിടുന്നു. എല്ലാവർക്കും സ്വാഗതം.",
    ),
  },
  {
    slug: "parish-feast-2026",
    title: B("Nativity of Mary — Parish Feast (Perunnal)", "പരിശുദ്ധ അമ്മയുടെ ജനനത്തിരുനാൾ — ഇടവക പെരുന്നാൾ"),
    date: "2026-08-31", endDate: "2026-09-08", time: B("See daily schedule", "ദിവസ സമയക്രമം കാണുക"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Feast", image: "churchDusk",
    excerpt: B(
      "Eight days of the Ettu Nombu and celebration culminating in the solemn feast — flag hoisting, procession, and festal Holy Qurbana.",
      "എട്ടു നോമ്പും ആഘോഷവും ആഘോഷ തിരുനാളിൽ പര്യവസാനിക്കുന്നു — കൊടിയേറ്റ്, പ്രദക്ഷിണം, തിരുനാൾ കുർബ്ബാന.",
    ),
    featured: true,
  },
  {
    slug: "sunday-school-day",
    title: B("Sunday School Annual Day", "വേദപാഠ വാർഷികം"),
    date: "2026-09-20", time: B("8:00 AM", "8:00 AM"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Community", image: "scripture",
    excerpt: B(
      "Our Sunday School children present the year's learning with songs and tableaux, and prizes are distributed.",
      "ഞങ്ങളുടെ വേദപാഠ കുട്ടികൾ വർഷത്തെ പഠനം പാട്ടുകളിലൂടെയും ദൃശ്യാവിഷ്കാരങ്ങളിലൂടെയും അവതരിപ്പിക്കുന്നു, സമ്മാനങ്ങൾ വിതരണം ചെയ്യുന്നു.",
    ),
  },
  {
    slug: "mission-sunday",
    title: B("Edavaka Mission Sunday", "ഇടവക മിഷൻ ഞായർ"),
    date: "2026-10-18", time: B("All Qurbanas", "എല്ലാ കുർബ്ബാനകളിലും"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Community", image: "peacefulPath",
    excerpt: B(
      "The Edavaka Mission leads the parish in praying and giving for the mission of the Church at home and abroad.",
      "ഇടവക മിഷൻ നാട്ടിലും വിദേശത്തുമുള്ള സഭയുടെ ദൗത്യത്തിനായി പ്രാർത്ഥിക്കാനും നൽകാനും ഇടവകയെ നയിക്കുന്നു.",
    ),
  },
  {
    slug: "christmas-2026",
    title: B("Christmas Carols & Midnight Qurbana", "ക്രിസ്മസ് കരോളും പാതിര കുർബ്ബാനയും"),
    date: "2026-12-24", time: B("10:00 PM Carols · 11:30 PM Qurbana", "10:00 PM കരോൾ · 11:30 PM കുർബ്ബാന"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Feast", image: "churchWarm",
    excerpt: B(
      "The choir leads a carol service before the joyful celebration of the Lord's Nativity at the Midnight Qurbana.",
      "പാതിര കുർബ്ബാനയിൽ കർത്താവിന്റെ ജനനത്തിന്റെ സന്തോഷകരമായ ആഘോഷത്തിനു മുമ്പ് ഗായകസംഘം കരോൾ നയിക്കുന്നു.",
    ),
  },
];

const parishPriestRaw = {
  name: B("Rev. Fr. Varghese T Varghese", "റവ. ഫാ. വർഗീസ് ടി വർഗീസ്"),
  role: B("Parish Priest (Vicar)", "ഇടവക വികാരി"),
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

const formerVicarsRaw = [
  { name: B("Rev. Fr. Mathew Chackalackal", "റവ. ഫാ. മാത്യു ചക്കാലക്കൽ"), years: "2015 – 2021" },
  { name: B("Rev. Fr. Antony Puthussery", "റവ. ഫാ. അന്തോണി പുത്തൻശ്ശേരി"), years: "2009 – 2015" },
  { name: B("Rev. Fr. George Palackal", "റവ. ഫാ. ജോർജ് പാലയ്ക്കൽ"), years: "2002 – 2009" },
  { name: B("Rev. Fr. Sebastian Manackal", "റവ. ഫാ. സെബാസ്റ്റ്യൻ മണക്കൽ"), years: "1995 – 2002" },
  { name: B("Rev. Fr. Jacob Vadakkumchery", "റവ. ഫാ. ജേക്കബ് വടക്കുംചേരി"), years: "1988 – 1995" },
  { name: B("Rev. Fr. Cyriac Elavunkal", "റവ. ഫാ. സിറിയക് ഇളവുങ്കൽ"), years: "1979 – 1988" },
];

const organizationsRaw: {
  slug: string; name: string; malayalam?: Bi; short: Bi; description: Bi;
  meeting: Bi; icon: string; image: ImageKey; audience: Bi;
}[] = [
  {
    slug: "sunday-school", name: "Sunday School",
    malayalam: B("Vedapadasala", "വേദപാഠശാല"),
    short: B("Faith formation for children", "കുട്ടികളുടെ വിശ്വാസ പരിശീലനം"),
    description: B(
      "Systematic teaching of Scripture, faith and the Orthodox tradition for children, following the Diocesan Sunday School syllabus.",
      "രൂപത വേദപാഠ സിലബസ് പിന്തുടർന്ന്, കുട്ടികൾക്കായി വിശുദ്ധ ഗ്രന്ഥവും വിശ്വാസവും ഓർത്തഡോക്സ് പാരമ്പര്യവും ചിട്ടയായി പഠിപ്പിക്കുന്നു.",
    ),
    meeting: B("Sundays · after Holy Qurbana", "ഞായറാഴ്ചകൾ · വിശുദ്ധ കുർബ്ബാനയ്ക്കു ശേഷം"),
    icon: "BookOpen", image: "cathedralArches", audience: B("Grades 1–12", "ക്ലാസ് 1–12"),
  },
  {
    slug: "balajana-sakhyam", name: "Balajana Sakhyam",
    malayalam: B("Children's Movement", "ബാലജന സഖ്യം"),
    short: B("Spiritual movement for children", "കുട്ടികളുടെ ആത്മീയ പ്രസ്ഥാനം"),
    description: B(
      "The children's wing of the Church — little ones growing in prayer, mission awareness and love for the Lord.",
      "സഭയുടെ ബാല വിഭാഗം — പ്രാർത്ഥനയിലും മിഷൻ അവബോധത്തിലും കർത്താവിനോടുള്ള സ്നേഹത്തിലും വളരുന്ന കുഞ്ഞുങ്ങൾ.",
    ),
    meeting: B("Sundays · during Sunday School", "ഞായറാഴ്ചകൾ · വേദപാഠ സമയത്ത്"),
    icon: "Sprout", image: "scripture", audience: B("Children", "കുട്ടികൾ"),
  },
  {
    slug: "ocym", name: "OCYM",
    malayalam: B("Orthodox Christian Youth Movement", "ഓർത്തഡോക്സ് ക്രിസ്ത്യൻ യൂത്ത് മൂവ്‌മെന്റ്"),
    short: B("Parish youth movement", "ഇടവക യുവജന പ്രസ്ഥാനം"),
    description: B(
      "Forming young men and women as disciples and servant-leaders through prayer, retreats, study and works of charity.",
      "പ്രാർത്ഥന, ധ്യാനം, പഠനം, ജീവകാരുണ്യ പ്രവർത്തനങ്ങൾ എന്നിവയിലൂടെ യുവതീയുവാക്കളെ ശിഷ്യരും സേവന നേതാക്കളുമായി രൂപപ്പെടുത്തുന്നു.",
    ),
    meeting: B("Second Sunday · after Holy Qurbana", "രണ്ടാം ഞായർ · വിശുദ്ധ കുർബ്ബാനയ്ക്കു ശേഷം"),
    icon: "Flame", image: "candlesPrayer", audience: B("Youth (18–35)", "യുവജനം (18–35)"),
  },
  {
    slug: "mgocsm", name: "MGOCSM",
    malayalam: B("Orthodox Student Movement", "ഓർത്തഡോക്സ് വിദ്യാർത്ഥി പ്രസ്ഥാനം"),
    short: B("Student ministry", "വിദ്യാർത്ഥി ശുശ്രൂഷ"),
    description: B(
      "The Mar Gregorios Orthodox Christian Student Movement — nurturing school and college students in faith, study circles and service.",
      "മാർ ഗ്രിഗോറിയോസ് ഓർത്തഡോക്സ് ക്രിസ്ത്യൻ സ്റ്റുഡന്റ് മൂവ്‌മെന്റ് — സ്കൂൾ, കോളേജ് വിദ്യാർത്ഥികളെ വിശ്വാസത്തിലും പഠന കൂട്ടായ്മകളിലും സേവനത്തിലും വളർത്തുന്നു.",
    ),
    meeting: B("Fourth Sunday · 4:00 PM", "നാലാം ഞായർ · 4:00 PM"),
    icon: "Users", image: "gathering", audience: B("Students", "വിദ്യാർത്ഥികൾ"),
  },
  {
    slug: "martha-mariam", name: "Martha Mariam Samajam",
    malayalam: B("Women's Fellowship", "വനിതാ സമാജം"),
    short: B("Fellowship of women", "വനിതാ കൂട്ടായ്മ"),
    description: B(
      "The women of the parish united in prayer, formation and charity — the quiet strength of every Christian home.",
      "പ്രാർത്ഥനയിലും പരിശീലനത്തിലും ജീവകാരുണ്യത്തിലും ഒന്നിച്ച ഇടവക വനിതകൾ — ഓരോ ക്രിസ്തീയ ഭവനത്തിന്റെയും നിശ്ശബ്ദ ശക്തി.",
    ),
    meeting: B("First Sunday · after Holy Qurbana", "ഒന്നാം ഞായർ · വിശുദ്ധ കുർബ്ബാനയ്ക്കു ശേഷം"),
    icon: "Heart", image: "peacefulPath", audience: B("Women", "വനിതകൾ"),
  },
  {
    slug: "prayer-fellowship", name: "Prayer Fellowship",
    malayalam: B("Prarthana Koottayma", "പ്രാർത്ഥനാ കൂട്ടായ്മ"),
    short: B("Intercession & fellowship", "മാധ്യസ്ഥ്യവും കൂട്ടായ്മയും"),
    description: B(
      "Parishioners gathering for praise, intercession and the Word — carrying one another's needs before the Lord.",
      "സ്തുതിക്കും മാധ്യസ്ഥ്യത്തിനും വചനത്തിനുമായി ഒരുമിക്കുന്ന ഇടവകാംഗങ്ങൾ — പരസ്പരം ആവശ്യങ്ങൾ കർത്താവിനു മുമ്പിൽ സമർപ്പിക്കുന്നു.",
    ),
    meeting: B("Wednesday · 5:00 PM", "ബുധൻ · 5:00 PM"),
    icon: "Sparkles", image: "candles", audience: B("All parishioners", "എല്ലാ ഇടവകാംഗങ്ങൾക്കും"),
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
    icon: "Music", image: "churchWarm", audience: B("All ages", "എല്ലാ പ്രായക്കാർക്കും"),
  },
  {
    slug: "edavaka-mission", name: "Edavaka Mission",
    malayalam: B("Parish Mission", "ഇടവക മിഷൻ"),
    short: B("Evangelisation & outreach", "സുവിശേഷവേലയും സഹായവും"),
    description: B(
      "The mission wing of the parish — deepening faith through Bible study, family visits and works of mercy at home and abroad.",
      "ഇടവകയുടെ മിഷൻ വിഭാഗം — ബൈബിൾ പഠനം, കുടുംബ സന്ദർശനം, കരുണയുടെ പ്രവൃത്തികൾ എന്നിവയിലൂടെ വിശ്വാസം ആഴപ്പെടുത്തുന്നു.",
    ),
    meeting: B("Third Sunday · after Holy Qurbana", "മൂന്നാം ഞായർ · വിശുദ്ധ കുർബ്ബാനയ്ക്കു ശേഷം"),
    icon: "Shield", image: "churchStone", audience: B("All parishioners", "എല്ലാ ഇടവകാംഗങ്ങൾക്കും"),
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

const videosRaw: { title: Bi; poster: ImageKey; youtubeId: string; duration: string }[] = [
  { title: B("Parish Feast — Solemn Procession", "ഇടവക പെരുന്നാൾ — പ്രദക്ഷിണം"), poster: "churchDusk", youtubeId: "y6120QOlsfU", duration: "4:20" },
  { title: B("Christmas Carol Service", "ക്രിസ്മസ് കരോൾ"), poster: "churchWarm", youtubeId: "e5jQqp1Ad3c", duration: "6:12" },
  { title: B("A Walk Through Our Heritage", "ഞങ്ങളുടെ പൈതൃകത്തിലൂടെ"), poster: "cathedralArches", youtubeId: "0-2QcM6L5Zk", duration: "3:47" },
];

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

const timelineRaw = [
  { year: "1898", title: B("A community is born", "ഒരു കൂട്ടായ്മ പിറക്കുന്നു"), body: B("The faithful of Alayamon gather to build a place of worship, laying the first foundations of the parish.", "അലയമണിലെ വിശ്വാസികൾ ഒരു ആരാധനാലയം പണിയാൻ ഒരുമിക്കുന്നു, ഇടവകയുടെ ആദ്യ അടിത്തറ പാകുന്നു.") },
  { year: "1921", title: B("The first church rises", "ആദ്യ പള്ളി ഉയരുന്നു"), body: B("The original church is consecrated, its laterite walls and tiled roof echoing the Kerala Christian style.", "കേരള ക്രിസ്തീയ ശൈലിയിലുള്ള വെട്ടുകല്ലു ചുവരുകളും ഓടുമേഞ്ഞ മേൽക്കൂരയുമുള്ള ആദ്യ പള്ളി വെഞ്ചരിക്കപ്പെടുന്നു.") },
  { year: "1956", title: B("Establishment as a parish", "ഇടവകയായി സ്ഥാപനം"), body: B("The community is established as a full parish, with its own resident vicar and registers.", "സ്വന്തം വികാരിയോടും രേഖകളോടും കൂടെ കൂട്ടായ്മ ഒരു പൂർണ്ണ ഇടവകയായി ഔപചാരികമായി സ്ഥാപിക്കപ്പെടുന്നു.") },
  { year: "1972", title: B("A school for the young", "കുട്ടികൾക്കായി ഒരു വിദ്യാലയം"), body: B("The parish opens a school, extending its mission of faith and education to the whole village.", "ഇടവക ഒരു വിദ്യാലയം തുറന്ന്, വിശ്വാസത്തിന്റെയും വിദ്യാഭ്യാസത്തിന്റെയും ദൗത്യം ഗ്രാമം മുഴുവൻ വ്യാപിപ്പിക്കുന്നു.") },
  { year: "1998", title: B("Centenary of faith", "വിശ്വാസത്തിന്റെ ശതാബ്ദി"), body: B("The parish celebrates one hundred years of God's providence with a year of jubilee and thanksgiving.", "ജൂബിലിയുടെയും കൃതജ്ഞതയുടെയും വർഷത്തോടെ ഇടവക ദൈവപരിപാലനയുടെ നൂറു വർഷം ആഘോഷിക്കുന്നു.") },
  { year: "2009", title: B("The new church", "പുതിയ പള്ളി"), body: B("A larger church is built and blessed to welcome the growing congregation, preserving the old sanctuary.", "വളരുന്ന സമൂഹത്തെ സ്വീകരിക്കാൻ, പഴയ മദ്ബഹാ സംരക്ഷിച്ചുകൊണ്ട് വലിയ ഒരു പള്ളി പണിത് വെഞ്ചരിക്കുന്നു.") },
  { year: "Today", title: B("A living parish", "ജീവനുള്ള ഇടവക"), body: B("Home to hundreds of families and a dozen ministries, the parish continues its journey of faith and service.", "നൂറുകണക്കിന് കുടുംബങ്ങളുടെയും നിരവധി കൂട്ടായ്മകളുടെയും ഭവനമായി, ഇടവക വിശ്വാസത്തിന്റെയും സേവനത്തിന്റെയും യാത്ര തുടരുന്നു.") },
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
    accountName: "St. Mary's Orthodox Church, Alayamon",
    accountNumber: "0000 0000 0000",
    bank: "State Bank of India",
    branch: "Anchal, Kollam",
    ifsc: "SBIN0000000",
  },
  purposes: [
    { title: B("Church Maintenance", "പള്ളി പരിപാലനം"), body: B("Upkeep of the church, altar and grounds.", "പള്ളിയുടെയും അൾത്താരയുടെയും മുറ്റത്തിന്റെയും പരിപാലനം."), icon: "Church" },
    { title: B("Charity & Outreach", "ജീവകാരുണ്യവും സഹായവും"), body: B("Support for the poor, sick and families in need.", "ദരിദ്രർക്കും രോഗികൾക്കും ആവശ്യമുള്ള കുടുംബങ്ങൾക്കും സഹായം."), icon: "HeartHandshake" },
    { title: B("Feast & Liturgy", "പെരുന്നാളും ആരാധനയും"), body: B("Flowers, vestments and the celebration of feasts.", "പുഷ്പങ്ങൾ, തിരുവസ്ത്രങ്ങൾ, പെരുന്നാൾ ആഘോഷം."), icon: "Sparkles" },
    { title: B("Formation", "പരിശീലനം"), body: B("Catechism, youth ministry and faith formation.", "മതബോധനം, യുവജന ശുശ്രൂഷ, വിശ്വാസ പരിശീലനം."), icon: "BookOpen" },
  ],
};

const prayerCategoriesRaw: Bi[] = [
  B("Thanksgiving", "കൃതജ്ഞത"),
  B("Healing & Health", "സൗഖ്യവും ആരോഗ്യവും"),
  B("Family", "കുടുംബം"),
  B("Guidance", "മാർഗ്ഗനിർദേശം"),
  B("Departed Souls", "മൃതാത്മാക്കൾ"),
  B("Vocation", "ദൈവവിളി"),
  B("Other", "മറ്റുള്ളവ"),
];

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
  parishPriest: Clergy;
  assistantPriest: Clergy;
  formerVicars: { name: string; years: string }[];
  organizations: Organization[];
  gallery: GalleryItem[];
  videos: ParishVideo[];
  testimonials: Testimonial[];
  missionVision: {
    mission: string;
    vision: string;
    values: { title: string; body: string; icon: string }[];
  };
  timeline: TimelineEvent[];
  patronSaint: { name: string; title: string; feast: string; image: ImageKey; body: string };
  giving: {
    intro: string;
    upiId: string;
    bank: typeof givingRaw.bank;
    purposes: { title: string; body: string; icon: string }[];
  };
  prayerCategories: string[];
};

export function getData(locale: Locale): ParishData {
  const L = <T,>(b: { en: T; ml: T }) => pick(b, locale);
  return {
    verses: versesRaw.map((v) => ({ text: L(v.text), ref: L(v.ref) })),
    heroVerse: { text: L(versesRaw[0].text), ref: L(versesRaw[0].ref) },
    sundayMass: sundayMassRaw.map((s) => ({ day: L(s.day), times: s.times, note: s.note ? L(s.note) : undefined })),
    weekdayMass: weekdayMassRaw.map((s) => ({ day: L(s.day), times: s.times, note: s.note ? L(s.note) : undefined })),
    devotions: devotionsRaw.map((d) => ({ title: L(d.title), detail: L(d.detail), extra: L(d.extra), icon: d.icon })),
    specialSchedules: specialSchedulesRaw.map((s) => ({ occasion: L(s.occasion), dates: L(s.dates), detail: L(s.detail) })),
    announcements: announcementsRaw.map((a) => ({ title: L(a.title), date: L(a.date), body: L(a.body), tag: L(a.tag) })),
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
      image: e.image, excerpt: L(e.excerpt), featured: e.featured,
    })),
    parishPriest: {
      name: L(parishPriestRaw.name), role: L(parishPriestRaw.role), image: parishPriestRaw.image,
      since: L(parishPriestRaw.since), bio: L(parishPriestRaw.bio), quote: L(parishPriestRaw.quote),
    },
    assistantPriest: {
      name: L(assistantPriestRaw.name), role: L(assistantPriestRaw.role), image: assistantPriestRaw.image,
      since: L(assistantPriestRaw.since), bio: L(assistantPriestRaw.bio), quote: L(assistantPriestRaw.quote),
    },
    formerVicars: formerVicarsRaw.map((v) => ({ name: L(v.name), years: v.years })),
    organizations: organizationsRaw.map((o) => ({
      slug: o.slug, name: o.name, malayalam: o.malayalam ? L(o.malayalam) : undefined,
      short: L(o.short), description: L(o.description), meeting: L(o.meeting),
      icon: o.icon, image: o.image, audience: L(o.audience),
    })),
    gallery: galleryRaw.map((g) => ({ image: g.image, title: L(g.title), category: g.category, span: g.span })),
    videos: videosRaw.map((v) => ({ title: L(v.title), poster: v.poster, youtubeId: v.youtubeId, duration: v.duration })),
    testimonials: testimonialsRaw.map((t) => ({ quote: L(t.quote), name: L(t.name), role: L(t.role) })),
    missionVision: {
      mission: L(missionVisionRaw.mission),
      vision: L(missionVisionRaw.vision),
      values: missionVisionRaw.values.map((v) => ({ title: L(v.title), body: L(v.body), icon: v.icon })),
    },
    timeline: timelineRaw.map((t) => ({ year: t.year, title: L(t.title), body: L(t.body) })),
    patronSaint: {
      name: L(patronSaintRaw.name), title: L(patronSaintRaw.title), feast: L(patronSaintRaw.feast),
      image: patronSaintRaw.image, body: L(patronSaintRaw.body),
    },
    giving: {
      intro: L(givingRaw.intro), upiId: givingRaw.upiId, bank: givingRaw.bank,
      purposes: givingRaw.purposes.map((p) => ({ title: L(p.title), body: L(p.body), icon: p.icon })),
    },
    prayerCategories: prayerCategoriesRaw.map((c) => L(c)),
  };
}

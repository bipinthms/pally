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
  { day: B("Tuesday", "ചൊവ്വ"), times: ["6:30 AM"], note: B("Novena to St. Antony", "വി. അന്തോനീസിന്റെ നൊവേന") },
  { day: B("Wednesday", "ബുധൻ"), times: ["6:30 AM"], note: B("Novena to Our Lady", "പരിശുദ്ധ അമ്മയുടെ നൊവേന") },
  { day: B("Thursday", "വ്യാഴം"), times: ["6:30 AM"], note: B("Adoration follows", "ആരാധന തുടർന്ന്") },
  { day: B("Friday", "വെള്ളി"), times: ["6:30 AM"], note: B("Way of the Cross (Lent)", "കുരിശിന്റെ വഴി (നോമ്പ്)") },
  { day: B("Saturday", "ശനി"), times: ["6:30 AM"], note: B("Novena to St. George", "വി. ഗീവർഗീസിന്റെ നൊവേന") },
];

const devotionsRaw = [
  {
    title: B("Holy Confession", "വിശുദ്ധ കുമ്പസാരം"),
    detail: B("Half an hour before every Holy Mass", "ഓരോ വിശുദ്ധ കുർബ്ബാനയ്ക്കും അര മണിക്കൂർ മുമ്പ്"),
    extra: B("Saturdays 5:00 – 6:00 PM · or by appointment with the vicar", "ശനിയാഴ്ച 5:00 – 6:00 PM · അല്ലെങ്കിൽ വികാരിയുമായി മുൻകൂട്ടി"),
    icon: "HeartHandshake",
  },
  {
    title: B("Eucharistic Adoration", "വിശുദ്ധ കുർബ്ബാന ആരാധന"),
    detail: B("Thursdays after morning Mass", "വ്യാഴാഴ്ച പ്രഭാത കുർബ്ബാനയ്ക്കു ശേഷം"),
    extra: B("First Friday: whole-day adoration 7:00 AM – 6:00 PM", "ഒന്നാം വെള്ളി: ദിവസം മുഴുവൻ ആരാധന 7:00 AM – 6:00 PM"),
    icon: "Church",
  },
  {
    title: B("Rosary & Novena", "ജപമാലയും നൊവേനയും"),
    detail: B("Daily before the evening Angelus", "എല്ലാ ദിവസവും സന്ധ്യാ ത്രികാലജപത്തിനു മുമ്പ്"),
    extra: B("Family Rosary encouraged during October & May", "ഒക്ടോബർ, മെയ് മാസങ്ങളിൽ കുടുംബ ജപമാല പ്രോത്സാഹിപ്പിക്കുന്നു"),
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
    detail: B("Eight-day novena (Ettu Nombu), flag hoisting & solemn procession.", "എട്ടു ദിവസത്തെ നൊവേന (എട്ടു നോമ്പ്), കൊടിയേറ്റ്, പ്രദക്ഷിണം."),
  },
  {
    occasion: B("Christmas", "ക്രിസ്മസ്"),
    dates: B("24 – 25 Dec", "ഡിസ 24 – 25"),
    detail: B("Carol service 10:00 PM · Midnight Mass 11:30 PM · Christmas Day 7:00 & 9:00 AM.", "കരോൾ 10:00 PM · പാതിര കുർബ്ബാന 11:30 PM · ക്രിസ്മസ് ദിനം 7:00 & 9:00 AM."),
  },
  {
    occasion: B("Holy Week & Easter", "വിശുദ്ധവാരവും ഉയിർപ്പും"),
    dates: B("Palm Sunday – Easter", "ഓശാന ഞായർ – ഉയിർപ്പ്"),
    detail: B("Pesaha Thursday, Good Friday Way of the Cross & Easter Vigil.", "പെസഹാ വ്യാഴം, ദുഃഖവെള്ളി കുരിശിന്റെ വഴി, ഉയിർപ്പു തിരുനാൾ."),
  },
  {
    occasion: B("Assumption of Our Lady", "പരിശുദ്ധ അമ്മയുടെ സ്വർഗ്ഗാരോപണം"),
    dates: B("15 Aug", "ഓഗ 15"),
    detail: B("Solemn High Mass at 8:00 AM followed by blessing of grain.", "8:00 AM-ന് ആഘോഷ കുർബ്ബാന, തുടർന്ന് ധാന്യാശീർവാദം."),
  },
];

const announcementsRaw = [
  {
    title: B("Parish Feast Novena begins", "ഇടവക പെരുന്നാൾ നൊവേന ആരംഭിക്കുന്നു"),
    date: B("31 Aug 2026", "31 ഓഗ 2026"),
    body: B(
      "The eight-day novena in honour of Our Lady begins with flag hoisting after the 6:00 PM Mass. All parishioners are warmly invited.",
      "പരിശുദ്ധ അമ്മയുടെ ബഹുമാനാർത്ഥമുള്ള എട്ടു ദിവസത്തെ നൊവേന 6:00 PM കുർബ്ബാനയ്ക്കു ശേഷം കൊടിയേറ്റോടെ ആരംഭിക്കുന്നു. എല്ലാ ഇടവകാംഗങ്ങളെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.",
    ),
    tag: B("Feast", "പെരുന്നാൾ"),
  },
  {
    title: B("Catechism re-opens for the new year", "പുതുവർഷത്തേക്ക് മതബോധനം പുനരാരംഭിക്കുന്നു"),
    date: B("14 Jul 2026", "14 ജൂലൈ 2026"),
    body: B(
      "Sunday School classes resume after the vacation. Kindly ensure children are enrolled at the parish office before the first session.",
      "അവധിക്കു ശേഷം ഞായറാഴ്ച മതബോധന ക്ലാസുകൾ പുനരാരംഭിക്കുന്നു. ആദ്യ ക്ലാസിനു മുമ്പ് കുട്ടികളെ ഇടവക ഓഫീസിൽ ചേർക്കുക.",
    ),
    tag: B("Sunday School", "മതബോധനം"),
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
    "Our parish gathers for eight days of grace — novena, procession and the solemn feast of the Nativity of the Blessed Virgin Mary.",
    "എട്ടു ദിവസത്തെ കൃപയ്ക്കായി ഞങ്ങളുടെ ഇടവക ഒരുമിക്കുന്നു — നൊവേന, പ്രദക്ഷിണം, പരിശുദ്ധ കന്യാമറിയത്തിന്റെ ജനനത്തിന്റെ ആഘോഷ തിരുനാൾ.",
  ),
  image: "churchDusk" as ImageKey,
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
      "Over 180 children spent a joyful week of songs, scripture and craft. Our thanks to the animators and KCYM volunteers.",
      "180-ലധികം കുട്ടികൾ പാട്ടും വചനവും കരകൗശലവുമായി സന്തോഷകരമായ ഒരാഴ്ച ചെലവഴിച്ചു. അനിമേറ്റർമാർക്കും കെസിവൈഎം സന്നദ്ധപ്രവർത്തകർക്കും നന്ദി.",
    ),
  },
  {
    slug: "kcym-retreat",
    title: B("KCYM Youth Retreat", "കെസിവൈഎം യുവജന ധ്യാനം"),
    date: "2026-08-02", time: B("8:30 AM – 5:00 PM", "8:30 AM – 5:00 PM"),
    location: B("Parish Hall & Adoration Chapel", "ഇടവക ഹാളും ആരാധനാ കപ്പേളയും"),
    category: "Youth", image: "candlesPrayer",
    excerpt: B(
      "A one-day Spirit-filled retreat for parish youth — praise, teaching, adoration and confession. Registration at the office.",
      "ഇടവക യുവജനങ്ങൾക്കായി ഒരു ദിവസത്തെ ആത്മനിറവുള്ള ധ്യാനം — സ്തുതി, പ്രബോധനം, ആരാധന, കുമ്പസാരം. രജിസ്ട്രേഷൻ ഓഫീസിൽ.",
    ),
    featured: true,
  },
  {
    slug: "assumption-2026",
    title: B("Assumption of the Blessed Virgin Mary", "പരിശുദ്ധ കന്യാമറിയത്തിന്റെ സ്വർഗ്ഗാരോപണം"),
    date: "2026-08-15", time: B("8:00 AM Solemn Mass", "8:00 AM ആഘോഷ കുർബ്ബാന"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Feast", image: "candles",
    excerpt: B(
      "Holy day of obligation. Solemn High Mass followed by the traditional blessing of grain and first-fruits.",
      "കടമയുള്ള തിരുനാൾ. ആഘോഷ കുർബ്ബാനയ്ക്കു ശേഷം പരമ്പരാഗത ധാന്യാശീർവാദവും ആദ്യഫലാശീർവാദവും.",
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
      "Eight days of novena and celebration culminating in the solemn feast — flag hoisting, procession, and festal High Mass.",
      "എട്ടു ദിവസത്തെ നൊവേനയും ആഘോഷവും ആഘോഷ തിരുനാളിൽ പര്യവസാനിക്കുന്നു — കൊടിയേറ്റ്, പ്രദക്ഷിണം, തിരുനാൾ കുർബ്ബാന.",
    ),
    featured: true,
  },
  {
    slug: "first-holy-communion",
    title: B("First Holy Communion", "പ്രഥമ ദിവ്യകാരുണ്യ സ്വീകരണം"),
    date: "2026-09-20", time: B("8:00 AM", "8:00 AM"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Sacrament", image: "scripture",
    excerpt: B(
      "Our young ones receive the Blessed Eucharist for the first time. Please keep the children and families in prayer.",
      "ഞങ്ങളുടെ കുഞ്ഞുങ്ങൾ ആദ്യമായി വിശുദ്ധ കുർബ്ബാന സ്വീകരിക്കുന്നു. കുട്ടികളെയും കുടുംബങ്ങളെയും പ്രാർത്ഥനയിൽ ഓർക്കുക.",
    ),
  },
  {
    slug: "mission-sunday",
    title: B("Mission Sunday & CML Collection", "മിഷൻ ഞായറും സിഎംഎൽ പിരിവും"),
    date: "2026-10-18", time: B("All Masses", "എല്ലാ കുർബ്ബാനകളിലും"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Community", image: "peacefulPath",
    excerpt: B(
      "The Cherupushpa Mission League leads the parish in praying and giving for the missions of the universal Church.",
      "ചെറുപുഷ്പ മിഷൻ ലീഗ് സാർവത്രിക സഭയുടെ മിഷനുകൾക്കായി പ്രാർത്ഥിക്കാനും നൽകാനും ഇടവകയെ നയിക്കുന്നു.",
    ),
  },
  {
    slug: "christmas-2026",
    title: B("Christmas Carols & Midnight Mass", "ക്രിസ്മസ് കരോളും പാതിര കുർബ്ബാനയും"),
    date: "2026-12-24", time: B("10:00 PM Carols · 11:30 PM Mass", "10:00 PM കരോൾ · 11:30 PM കുർബ്ബാന"),
    location: B("Parish Church", "ഇടവക പള്ളി"),
    category: "Feast", image: "churchWarm",
    excerpt: B(
      "The choir leads a carol service before the joyful celebration of the Lord's Nativity at Midnight Mass.",
      "പാതിര കുർബ്ബാനയിൽ കർത്താവിന്റെ ജനനത്തിന്റെ സന്തോഷകരമായ ആഘോഷത്തിനു മുമ്പ് ഗായകസംഘം കരോൾ നയിക്കുന്നു.",
    ),
  },
];

const parishPriestRaw = {
  name: B("Rev. Fr. Thomas Varghese", "റവ. ഫാ. തോമസ് വർഗീസ്"),
  role: B("Parish Priest (Vicar)", "ഇടവക വികാരി"),
  image: "priest1" as ImageKey,
  since: B("Since 2021", "2021 മുതൽ"),
  bio: B(
    "Ordained in 1998, Fr. Thomas has served parishes across the Archdiocese with a heart for the poor and a love for the liturgy. He shepherds our parish with gentle wisdom, guiding its spiritual and pastoral life.",
    "1998-ൽ പട്ടം സ്വീകരിച്ച ഫാ. തോമസ്, ദരിദ്രരോടുള്ള സ്നേഹത്തോടും ആരാധനക്രമത്തോടുള്ള താൽപ്പര്യത്തോടും കൂടെ അതിരൂപതയിലുടനീളം ഇടവകകളിൽ സേവനം ചെയ്തിട്ടുണ്ട്. സൗമ്യമായ വിവേകത്തോടെ അദ്ദേഹം ഞങ്ങളുടെ ഇടവകയെ പരിപാലിക്കുന്നു.",
  ),
  quote: B(
    "A parish is a family gathered around the altar — here, everyone has a place at the Lord's table.",
    "ഇടവക എന്നത് ബലിപീഠത്തിനു ചുറ്റും ഒരുമിച്ച കുടുംബമാണ് — ഇവിടെ കർത്താവിന്റെ മേശയിൽ എല്ലാവർക്കും ഇടമുണ്ട്.",
  ),
};

const assistantPriestRaw = {
  name: B("Rev. Fr. Joseph Kurian", "റവ. ഫാ. ജോസഫ് കുര്യൻ"),
  role: B("Assistant Parish Priest", "അസി. വികാരി"),
  image: "priest2" as ImageKey,
  since: B("Since 2024", "2024 മുതൽ"),
  bio: B(
    "Fr. Joseph accompanies our youth and family ministries with energy and joy. He coordinates the KCYM, catechism and the parish choir, drawing young hearts closer to Christ.",
    "ഫാ. ജോസഫ് ഊർജ്ജത്തോടും സന്തോഷത്തോടും കൂടെ ഞങ്ങളുടെ യുവജന-കുടുംബ ശുശ്രൂഷകളെ അനുഗമിക്കുന്നു. കെസിവൈഎം, മതബോധനം, ഇടവക ഗായകസംഘം എന്നിവ ഏകോപിപ്പിച്ച് അദ്ദേഹം യുവഹൃദയങ്ങളെ ക്രിസ്തുവിനോട് അടുപ്പിക്കുന്നു.",
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
    slug: "kcym", name: "KCYM",
    malayalam: B("Kerala Catholic Youth Movement", "കേരള കത്തോലിക്കാ യൂത്ത് മൂവ്‌മെന്റ്"),
    short: B("Parish youth movement", "ഇടവക യുവജന പ്രസ്ഥാനം"),
    description: B(
      "Forming young men and women as disciples and leaders through prayer, retreats, service and cultural life.",
      "പ്രാർത്ഥന, ധ്യാനം, സേവനം, സാംസ്കാരിക ജീവിതം എന്നിവയിലൂടെ യുവതീയുവാക്കളെ ശിഷ്യന്മാരും നേതാക്കളുമായി രൂപപ്പെടുത്തുന്നു.",
    ),
    meeting: B("Second Sunday · after evening Mass", "രണ്ടാം ഞായർ · സന്ധ്യാ കുർബ്ബാനയ്ക്കു ശേഷം"),
    icon: "Flame", image: "candlesPrayer", audience: B("Youth (18–35)", "യുവജനം (18–35)"),
  },
  {
    slug: "smym", name: "SMYM",
    malayalam: B("Syro-Malabar Youth Movement", "സീറോ-മലബാർ യൂത്ത് മൂവ്‌മെന്റ്"),
    short: B("Teen & college ministry", "കൗമാര-കോളേജ് ശുശ്രൂഷ"),
    description: B(
      "The official youth wing of the Syro-Malabar Church, nurturing teens and college students in faith and fellowship.",
      "സീറോ-മലബാർ സഭയുടെ ഔദ്യോഗിക യുവജന വിഭാഗം, കൗമാരക്കാരെയും കോളേജ് വിദ്യാർത്ഥികളെയും വിശ്വാസത്തിലും കൂട്ടായ്മയിലും വളർത്തുന്നു.",
    ),
    meeting: B("Fourth Sunday · 4:00 PM", "നാലാം ഞായർ · 4:00 PM"),
    icon: "Users", image: "gathering", audience: B("Teens & students", "കൗമാരക്കാരും വിദ്യാർത്ഥികളും"),
  },
  {
    slug: "mathruvedi", name: "Mathruvedi",
    malayalam: B("Mothers' Forum", "മാതൃവേദി"),
    short: B("Fellowship of mothers", "അമ്മമാരുടെ കൂട്ടായ്മ"),
    description: B(
      "Mothers of the parish united in prayer, formation and charity — the quiet strength of every Christian home.",
      "പ്രാർത്ഥനയിലും പരിശീലനത്തിലും ജീവകാരുണ്യത്തിലും ഒന്നിച്ച ഇടവക അമ്മമാർ — ഓരോ ക്രിസ്തീയ ഭവനത്തിന്റെയും നിശ്ശബ്ദ ശക്തി.",
    ),
    meeting: B("First Sunday · after 8:00 AM Mass", "ഒന്നാം ഞായർ · 8:00 AM കുർബ്ബാനയ്ക്കു ശേഷം"),
    icon: "Heart", image: "peacefulPath", audience: B("Mothers", "അമ്മമാർ"),
  },
  {
    slug: "pithruvedi", name: "Pithruvedi",
    malayalam: B("Fathers' Forum", "പിതൃവേദി"),
    short: B("Fellowship of fathers", "അപ്പന്മാരുടെ കൂട്ടായ്മ"),
    description: B(
      "Fathers and heads of families supporting the parish's works and growing together as men of faith.",
      "ഇടവകയുടെ പ്രവർത്തനങ്ങളെ പിന്തുണയ്ക്കുകയും വിശ്വാസികളായി ഒരുമിച്ചു വളരുകയും ചെയ്യുന്ന അപ്പന്മാരും കുടുംബനാഥന്മാരും.",
    ),
    meeting: B("First Sunday · 10:30 AM", "ഒന്നാം ഞായർ · 10:30 AM"),
    icon: "Shield", image: "churchStone", audience: B("Fathers", "അപ്പന്മാർ"),
  },
  {
    slug: "cml", name: "CML",
    malayalam: B("Cherupushpa Mission League", "ചെറുപുഷ്പ മിഷൻ ലീഗ്"),
    short: B("Children's mission league", "കുട്ടികളുടെ മിഷൻ ലീഗ്"),
    description: B(
      "Little missionaries in the spirit of St. Thérèse — children praying, learning and giving for the missions.",
      "വി. കൊച്ചുത്രേസ്യായുടെ ചൈതന്യത്തിലുള്ള കൊച്ചു മിഷനറിമാർ — മിഷനുകൾക്കായി പ്രാർത്ഥിക്കുകയും പഠിക്കുകയും നൽകുകയും ചെയ്യുന്ന കുട്ടികൾ.",
    ),
    meeting: B("Sundays · during catechism", "ഞായറാഴ്ചകൾ · മതബോധന സമയത്ത്"),
    icon: "Sprout", image: "scripture", audience: B("Children", "കുട്ടികൾ"),
  },
  {
    slug: "choir", name: "Parish Choir",
    malayalam: B("Gana Sabha", "ഗാനസഭ"),
    short: B("Ministry of sacred music", "വിശുദ്ധ സംഗീത ശുശ്രൂഷ"),
    description: B(
      "Lifting the parish's prayer in song — leading the congregation in the sacred music of the Syro-Malabar liturgy.",
      "ഇടവകയുടെ പ്രാർത്ഥനയെ ഗാനത്തിലുയർത്തുന്നു — സീറോ-മലബാർ ആരാധനക്രമത്തിന്റെ വിശുദ്ധ സംഗീതത്തിൽ സമൂഹത്തെ നയിക്കുന്നു.",
    ),
    meeting: B("Friday · 7:00 PM rehearsal", "വെള്ളി · 7:00 PM പരിശീലനം"),
    icon: "Music", image: "churchWarm", audience: B("All ages", "എല്ലാ പ്രായക്കാർക്കും"),
  },
  {
    slug: "sunday-school", name: "Sunday School",
    malayalam: B("Catechism", "മതബോധനം"),
    short: B("Faith formation for children", "കുട്ടികളുടെ വിശ്വാസ പരിശീലനം"),
    description: B(
      "Systematic catechesis from Grades 1–12 following the Syro-Malabar syllabus, forming children in the faith.",
      "സീറോ-മലബാർ സിലബസ് പിന്തുടർന്ന് 1 മുതൽ 12 വരെ ക്ലാസുകളിലെ ചിട്ടയായ മതബോധനം, കുട്ടികളെ വിശ്വാസത്തിൽ വളർത്തുന്നു.",
    ),
    meeting: B("Sundays · 9:00 – 10:00 AM", "ഞായറാഴ്ചകൾ · 9:00 – 10:00 AM"),
    icon: "BookOpen", image: "cathedralArches", audience: B("Grades 1–12", "ക്ലാസ് 1–12"),
  },
  {
    slug: "legion-of-mary", name: "Legion of Mary",
    malayalam: B("Mary's Legion", "മറിയത്തിന്റെ സേന"),
    short: B("Apostolate of charity", "ജീവകാരുണ്യ അപ്പസ്തോലത്വം"),
    description: B(
      "Under Our Lady's banner, members visit the sick and lonely, offering prayer and practical works of mercy.",
      "പരിശുദ്ധ അമ്മയുടെ കൊടിക്കീഴിൽ, അംഗങ്ങൾ രോഗികളെയും ഏകാകികളെയും സന്ദർശിച്ച് പ്രാർത്ഥനയും കരുണയുടെ പ്രവൃത്തികളും അർപ്പിക്കുന്നു.",
    ),
    meeting: B("Wednesday · 5:00 PM", "ബുധൻ · 5:00 PM"),
    icon: "Sparkles", image: "candles", audience: B("All parishioners", "എല്ലാ ഇടവകാംഗങ്ങൾക്കും"),
  },
];

const galleryRaw: { image: ImageKey; title: Bi; category: GalleryCategory; span?: "tall" | "wide" }[] = [
  { image: "heroInterior", title: B("Morning light through the nave", "നടുത്തളത്തിലൂടെ പ്രഭാത വെളിച്ചം"), category: "Church", span: "tall" },
  { image: "candles", title: B("Votive candles at Our Lady's altar", "അമ്മയുടെ അൾത്താരയിലെ നേർച്ചത്തിരികൾ"), category: "Liturgy" },
  { image: "churchDusk", title: B("The parish church at dusk", "സന്ധ്യയിൽ ഇടവക പള്ളി"), category: "Church", span: "wide" },
  { image: "celebration", title: B("Parish feast celebrations", "ഇടവക പെരുന്നാൾ ആഘോഷങ്ങൾ"), category: "Feasts" },
  { image: "cathedralArches", title: B("Arches of the sanctuary", "മദ്ബഹായുടെ കമാനങ്ങൾ"), category: "Heritage", span: "tall" },
  { image: "candlesPrayer", title: B("Adoration & silent prayer", "ആരാധനയും മൗന പ്രാർത്ഥനയും"), category: "Liturgy" },
  { image: "gathering", title: B("The parish family gathers", "ഇടവക കുടുംബം ഒരുമിക്കുന്നു"), category: "Community", span: "wide" },
  { image: "ornateCeiling", title: B("Ornamented ceiling detail", "അലങ്കൃത മേൽക്കൂര"), category: "Heritage" },
  { image: "scripture", title: B("The Word proclaimed", "വചനം പ്രഘോഷിക്കപ്പെടുന്നു"), category: "Liturgy" },
  { image: "churchStone", title: B("Weathered stone & memory", "പഴമയുടെ കല്ലും ഓർമ്മയും"), category: "Heritage", span: "tall" },
  { image: "churchWarm", title: B("Christmas at the parish", "ഇടവകയിലെ ക്രിസ്മസ്"), category: "Feasts" },
  { image: "peacefulPath", title: B("Grounds & garden of prayer", "പ്രാർത്ഥനയുടെ മുറ്റവും തോട്ടവും"), category: "Community", span: "wide" },
  { image: "stainedGlass", title: B("Light through coloured glass", "വർണ്ണച്ചില്ലിലൂടെ വെളിച്ചം"), category: "Church" },
  { image: "archDetail", title: B("Colonnade & cloister", "തൂണുകളും ഇടനാഴിയും"), category: "Heritage" },
  { image: "churchWide", title: B("The congregation at Mass", "കുർബ്ബാനയിലെ സമൂഹം"), category: "Liturgy", span: "tall" },
  { image: "columnLight", title: B("Pillars of the old church", "പഴയ പള്ളിയുടെ തൂണുകൾ"), category: "Church" },
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
      "The youth ministry gave me a place to belong and to serve. I found my faith — and lifelong friends — through KCYM.",
      "യുവജന ശുശ്രൂഷ എനിക്ക് ചേരാനും സേവിക്കാനും ഒരിടം നൽകി. കെസിവൈഎമ്മിലൂടെ ഞാൻ എന്റെ വിശ്വാസവും ആജീവനാന്ത സുഹൃത്തുക്കളെയും കണ്ടെത്തി.",
    ),
    name: B("Alan Thomas", "അലൻ തോമസ്"),
    role: B("KCYM member", "കെസിവൈഎം അംഗം"),
  },
  {
    quote: B(
      "The liturgy is celebrated with such reverence and beauty. Sunday Mass here is the anchor of our whole week.",
      "ആരാധനക്രമം എത്ര ഭക്തിയോടും സൗന്ദര്യത്തോടും കൂടെയാണ് ആഘോഷിക്കുന്നത്. ഇവിടത്തെ ഞായർ കുർബ്ബാനയാണ് ഞങ്ങളുടെ ആഴ്ചയുടെ അടിസ്ഥാനം.",
    ),
    name: B("Dr. Rekha Varghese", "ഡോ. രേഖ വർഗീസ്"),
    role: B("Choir member", "ഗായകസംഘം അംഗം"),
  },
];

const missionVisionRaw = {
  mission: B(
    "To be a welcoming family of faith — worshipping God in the beauty of the Syro-Malabar liturgy, forming disciples of every age, and serving our neighbours with the compassion of Christ.",
    "ഊഷ്മളമായ ഒരു വിശ്വാസ കുടുംബമായിരിക്കുക — സീറോ-മലബാർ ആരാധനക്രമത്തിന്റെ സൗന്ദര്യത്തിൽ ദൈവത്തെ ആരാധിക്കുകയും എല്ലാ പ്രായത്തിലുമുള്ള ശിഷ്യരെ രൂപപ്പെടുത്തുകയും ക്രിസ്തുവിന്റെ കാരുണ്യത്തോടെ അയൽക്കാരെ സേവിക്കുകയും ചെയ്യുക.",
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
  { year: "1898", title: B("A community is born", "ഒരു കൂട്ടായ്മ പിറക്കുന്നു"), body: B("The faithful of Alencherry gather to build a place of worship, laying the first foundations of the parish.", "ആലഞ്ചേരിയിലെ വിശ്വാസികൾ ഒരു ആരാധനാലയം പണിയാൻ ഒരുമിക്കുന്നു, ഇടവകയുടെ ആദ്യ അടിത്തറ പാകുന്നു.") },
  { year: "1921", title: B("The first church rises", "ആദ്യ പള്ളി ഉയരുന്നു"), body: B("The original church is consecrated, its laterite walls and tiled roof echoing the Kerala Christian style.", "കേരള ക്രിസ്തീയ ശൈലിയിലുള്ള വെട്ടുകല്ലു ചുവരുകളും ഓടുമേഞ്ഞ മേൽക്കൂരയുമുള്ള ആദ്യ പള്ളി വെഞ്ചരിക്കപ്പെടുന്നു.") },
  { year: "1956", title: B("Establishment as a parish", "ഇടവകയായി സ്ഥാപനം"), body: B("The community is canonically erected as a full parish, with its own resident vicar and registers.", "സ്വന്തം വികാരിയോടും രേഖകളോടും കൂടെ കൂട്ടായ്മ ഒരു പൂർണ്ണ ഇടവകയായി കാനോനികമായി സ്ഥാപിക്കപ്പെടുന്നു.") },
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
    "Our parish is dedicated to Mary, Mother of God, under the title of her Nativity. As the Church celebrates the birth of the Blessed Virgin — the dawn that heralds the Sun of Justice — our community looks to her as mother, model and intercessor. In the Syro-Malabar tradition her honour is woven through the liturgical year, and the parish feast in September is the great gathering of our whole family.",
    "ഞങ്ങളുടെ ഇടവക ദൈവമാതാവായ മറിയത്തിന്റെ ജനനത്തിന്റെ നാമത്തിൽ സമർപ്പിക്കപ്പെട്ടിരിക്കുന്നു. നീതിസൂര്യനെ അറിയിക്കുന്ന ഉഷസ്സായ പരിശുദ്ധ കന്യകയുടെ ജനനം സഭ ആഘോഷിക്കുമ്പോൾ, ഞങ്ങളുടെ കൂട്ടായ്മ അവളെ അമ്മയായും മാതൃകയായും മാധ്യസ്ഥയായും കാണുന്നു. സീറോ-മലബാർ പാരമ്പര്യത്തിൽ അവളുടെ ബഹുമാനം ആരാധനാവർഷത്തിലുടനീളം നെയ്തിരിക്കുന്നു, സെപ്റ്റംബറിലെ ഇടവക പെരുന്നാൾ ഞങ്ങളുടെ കുടുംബം മുഴുവന്റെയും വലിയ ഒത്തുചേരലാണ്.",
  ),
};

const givingRaw = {
  intro: B(
    "Your generosity sustains the worship, upkeep and charitable works of the parish. Every contribution, large or small, is received with gratitude and prayer.",
    "നിങ്ങളുടെ ഔദാര്യം ഇടവകയുടെ ആരാധനയും പരിപാലനവും ജീവകാരുണ്യ പ്രവർത്തനങ്ങളും നിലനിർത്തുന്നു. ചെറുതോ വലുതോ ആയ ഓരോ സംഭാവനയും കൃതജ്ഞതയോടും പ്രാർത്ഥനയോടും കൂടെ സ്വീകരിക്കുന്നു.",
  ),
  upiId: "alencherrypally@sbi",
  bank: {
    accountName: "St. Mary's Church, Alencherry",
    accountNumber: "0000 0000 0000",
    bank: "State Bank of India",
    branch: "Ernakulam",
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

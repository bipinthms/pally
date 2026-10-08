/**
 * Central image bank, backed by the parish's own photographs.
 *
 * public/images/
 *   brand/          logo
 *   church/         the church building — exterior, shrine, heritage objects
 *   icons/          holy icons
 *   clergy/         Catholicos, Metropolitan, vicar and assistant vicar portraits
 *   committee/      group.jpg + office-bearers/, members/, auditors/, sacristans/
 *   events/         photographs from parish events and services
 *   organizations/  photographs of the parish organisations
 *   posters/        designed graphics with text (feast notices, banners)
 *
 * To swap a photo, replace the file or point its key below at another file.
 */

const FILES = {
  churchDay: "church/exterior-day.jpg",
  churchNight: "church/exterior-night.jpg",
  marianShrine: "church/marian-shrine.jpg",
  marianShrineNight: "church/marian-shrine-night.jpg",
  antiqueCross: "church/antique-cross.jpg",
  theotokos: "icons/theotokos.jpg",
  theotokos2: "icons/theotokos-2.jpg",
  catholicos: "clergy/catholicos-baselios-marthoma-mathews-iii.jpg",
  metropolitan: "clergy/metropolitan-geevarghese-mar-yulios.jpg",
  lateCatholicos: "clergy/late-catholicos.jpg",
  vicar: "clergy/vicar.jpg",
  assistantVicar: "clergy/assistant-vicar.jpg",
  committee: "committee/group.jpg",
  navathiInauguration: "events/navathi-inauguration.jpeg",
  relicsStGregorios: "events/relics-st-gregorios.jpeg",
  reception: "events/reception.jpg",
  blessing: "events/blessing.jpg",
  preaching: "events/preaching.jpg",
  sundaySchool: "organizations/sunday-school.jpg",
  youthMeeting: "organizations/youth-meeting.jpg",
  youthGathering: "organizations/youth-gathering.jpg",
  churchBanner: "posters/church-banner.jpg",
  pallyBanner: "posters/alencherry-pally-banner.jpg",
  perunnal: "posters/perunnal.jpg",
  sleehaNombu: "posters/sleeha-nombu.jpg",
  ardram: "posters/ardram.jpg",
  missionProjects: "posters/mission-projects.jpg",
} as const;

/** Base path prefix for raw asset URLs (empty: the site is served from the domain root). */
export const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const f = (name: keyof typeof FILES) => assetPath(`/images/${FILES[name]}`);

/**
 * Named slots used throughout the site, each pointing at a local photo.
 * (Keys are kept stable so components don't need to change.)
 */
export const IMAGES = {
  // Hero / church views
  heroInterior: f("churchNight"),
  churchExterior: f("churchDay"),
  churchDusk: f("churchBanner"),
  churchWide: f("marianShrine"),
  churchStone: f("churchBanner"),
  churchWarm: f("preaching"),
  churchAlt: f("churchDay"),
  churchAlt2: f("perunnal"),
  churchAlt3: f("lateCatholicos"),
  churchAlt4: f("theotokos"),
  churchAlt5: f("sleehaNombu"),

  // Interior / heritage
  cathedralArches: f("pallyBanner"),
  churchArch: f("pallyBanner"),
  ornateCeiling: f("marianShrine"),
  interiorDetail: f("pallyBanner"),
  archDetail: f("antiqueCross"),
  columnLight: f("churchDay"),
  stainedGlass: f("blessing"),

  // Devotion
  candles: f("theotokos"),
  candlesPrayer: f("marianShrine"),
  scripture: f("sundaySchool"),
  peacefulPath: f("youthGathering"),
  ardramPoster: f("ardram"),
  marianShrine: f("marianShrineNight"),
  marianIcon: f("theotokos2"),

  // Community / events
  gathering: f("youthMeeting"),
  celebration: f("reception"),
  navathiInauguration: f("navathiInauguration"),
  relicsStGregorios: f("relicsStGregorios"),

  // Clergy
  priest1: f("vicar"),
  priest2: f("assistantVicar"),
  priest3: f("preaching"),
  priest4: f("lateCatholicos"),
  priest5: f("blessing"),
  priest6: f("preaching"),
  priest7: f("vicar"),

  // Church hierarchy
  catholicos: f("catholicos"),
  diocesanMetropolitan: f("metropolitan"),

  // Managing committee group photo
  committeeMembers: f("committee"),
} as const;

export type ImageKey = keyof typeof IMAGES;

/**
 * Resolve an image key to its local path. `opts` is accepted for backwards
 * compatibility but ignored — next/image optimises local files automatically.
 */
export function image(key: ImageKey, _opts?: { w?: number; h?: number; q?: number }): string {
  return IMAGES[key];
}

/** Direct file helper, if a component needs a specific file. */
export function img(name: keyof typeof FILES): string {
  return f(name);
}

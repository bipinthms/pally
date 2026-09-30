/**
 * Central image bank — now backed by the parish's own photographs in
 * /public/images. Each key maps to a local file. To swap a photo, either
 * replace the file in /public/images or point the key at a different file.
 */

const FILES = {
  churchDusk: "church-dusk.jpg",
  churchNight: "church-night.jpg",
  churchNight2: "church-day.jpg",
  interiorAltar: "interior-altar.jpg",
  interiorShrine: "interior-shrine.jpg",
  intercession: "intercession.jpg",
  intercession2: "intercession2.jpg",
  intercession3: "intercession3.jpg",
  intercession4: "intercession4.jpg",
  feast: "feast.jpg",
  apostlesFast: "apostles-fast.jpg",
  antiqueCross: "antique-cross.jpg",
  catholicos: "catholicos.jpg",
  sundaySchool: "sunday-school.jpg",
  youthMen: "youth-men.jpg",
  youthFloor: "youth-floor.jpg",
  preaching: "preaching.jpg",
  reception: "reception.jpg",
  blessing: "blessing.jpg",
  vicar: "vicar.jpg",
  assistant: "assistant.jpg",
  committee: "commitee_members.jpg",
  metropolitan: "dr-geevarghese-yulios-metropolitian.jpg",
  mathewsIII: "baselios-marthoma-mathews-III.jpg",
} as const;

/** GitHub Pages publishes this repository beneath /pally/. */
export const assetPath = (path: string) => `/pally${path}`;

const f = (name: keyof typeof FILES) => assetPath(`/images/${FILES[name]}`);

/**
 * Named slots used throughout the site, each pointing at a local photo.
 * (Keys are kept stable so components don't need to change.)
 */
export const IMAGES = {
  // Hero / church views
  heroInterior: f("churchNight"),
  churchExterior: f("churchNight2"),
  churchDusk: f("churchDusk"),
  churchWide: f("interiorShrine"),
  churchStone: f("churchDusk"),
  churchWarm: f("preaching"),
  churchAlt: f("churchNight2"),
  churchAlt2: f("feast"),
  churchAlt3: f("catholicos"),
  churchAlt4: f("intercession"),
  churchAlt5: f("apostlesFast"),

  // Interior / heritage
  cathedralArches: f("interiorAltar"),
  churchArch: f("interiorAltar"),
  ornateCeiling: f("interiorShrine"),
  interiorDetail: f("interiorAltar"),
  archDetail: f("antiqueCross"),
  columnLight: f("churchNight2"),
  stainedGlass: f("blessing"),

  // Devotion
  candles: f("intercession"),
  candlesPrayer: f("interiorShrine"),
  scripture: f("sundaySchool"),
  peacefulPath: f("youthFloor"),
  ardramPoster: f("intercession2"),
  marianShrine: f("intercession3"),
  marianIcon: f("intercession4"),

  // Community / events
  gathering: f("youthMen"),
  celebration: f("reception"),

  // Clergy
  priest1: f("vicar"),
  priest2: f("assistant"),
  priest3: f("preaching"),
  priest4: f("catholicos"),
  priest5: f("blessing"),
  priest6: f("preaching"),
  priest7: f("vicar"),

  // Church hierarchy
  catholicos: f("mathewsIII"),
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

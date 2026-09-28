/**
 * Central image bank — now backed by the parish's own photographs in
 * /public/images. Each key maps to a local file. To swap a photo, either
 * replace the file in /public/images or point the key at a different file.
 */

const FILES = {
  churchDusk: "church-dusk.jpg",
  churchNight: "church-night.jpg",
  churchNight2: "church-night-2.jpg",
  interiorAltar: "interior-altar.jpg",
  interiorShrine: "interior-shrine.jpg",
  intercession: "intercession.jpg",
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

/**
 * Central image bank.
 *
 * Every URL here has been verified to resolve. To use the parish's own
 * photography, drop files into /public/images and replace the `img(...)`
 * values below with e.g. "/images/hero.jpg" — nothing else needs to change.
 */

const BASE = "https://images.unsplash.com/photo-";

export function img(
  id: string,
  opts: { w?: number; h?: number; q?: number } = {},
): string {
  const { w = 1600, h, q = 72 } = opts;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    crop: "entropy",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `${BASE}${id}?${params.toString()}`;
}

export const IMAGES = {
  // Hero / heritage
  heroInterior: "1438032005730-c779502df39b",
  churchExterior: "1507692049790-de58290a4334",
  cathedralArches: "1477281765962-ef34e8bb0967",
  ornateCeiling: "1466442929976-97f336a657be",
  churchArch: "1524230572899-a752b3835840",
  churchWarm: "1481277542470-605612bd2d61",
  churchStone: "1438232992991-995b7058bbb3",
  churchWide: "1517816743773-6e0fd518b4a6",
  churchDusk: "1531123897727-8f129e1688ce",
  churchAlt: "1548407260-da850faa41e3",
  churchAlt2: "1490127252417-7c393f993ee4",
  churchAlt3: "1544427920-c49ccfb85579",
  churchAlt4: "1602940659805-770d1b3b9911",
  churchAlt5: "1584285405429-136bf988919c",
  archDetail: "1524230659092-07f99a75c013",
  interiorDetail: "1512389142860-9c449e58a543",
  stainedGlass: "1498889444388-e67ea62c464b",
  columnLight: "1490806843957-31f4c9a91c65",

  // Devotion
  candles: "1519491050282-cf00c82424b4",
  candlesPrayer: "1533158307587-828f0a76ef46",
  scripture: "1445633629932-0029acc44e88",
  peacefulPath: "1509909756405-be0199881695",

  // Community / events
  gathering: "1470229722913-7c0e2dbbafd3",
  celebration: "1511578314322-379afb476865",

  // Portraits (clergy)
  priest1: "1568602471122-7832951cc4c5",
  priest2: "1507003211169-0a1dd7228f2d",
  priest3: "1500648767791-00dcc994a43e",
  priest4: "1472099645785-5658abf4ff4e",
  priest5: "1519345182560-3f2917c472ef",
  priest6: "1560250097-0b93528c311a",
  priest7: "1541971875076-8f970d573be6",
} as const;

export type ImageKey = keyof typeof IMAGES;

/** Convenience: resolve an IMAGES key straight to a sized URL. */
export function image(
  key: ImageKey,
  opts?: { w?: number; h?: number; q?: number },
): string {
  return img(IMAGES[key], opts);
}

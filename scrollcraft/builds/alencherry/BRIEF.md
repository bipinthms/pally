# BRIEF: St. Mary's Orthodox Syrian Church, Alencherry

**Self-authored under explicit creative delegation.** On 2026-10-30 the owner answered the
interview with "use your judgement". Nothing below is a quotation from the owner. Facts
come from the existing site source (`src/lib/site.ts`, `src/lib/data.ts`,
`src/lib/i18n/dictionary.ts`). Where a line is an authored decision, it says so.

## Scope (authored)

This rebuilds the **home page** as a scroll experience. It is a standalone page in
`scrollcraft/builds/alencherry/` that uses the parish's own photographs. The other
pages of the live site (Holy Qurbana, Clergy, Gallery, Navathi, Events, Prayer
Requests, Contact and the rest) are kept and linked from it at
`https://www.alencherrychurch.org`. Folding it into the Next.js app, and the
Malayalam version, come later.

## The eight topics

1. **Vibe** (authored): *hushed, golden, living, ninety years deep.* References: the
   moment a sanctuary curtain is drawn at the start of the Qurbana; a brass nilavilakku
   lit at evening prayer; the parish history plaque at the church door.
2. **Journey** (authored, in the order of a liturgy): arrive at the church at night,
   lit for the feast. Read the covenant your forefathers signed. Wait at the closed curtain.
   It opens on the Madbaha. Go to the Mother of God's shrine. Meet the parish. Be
   sent out at evening prayer with directions home.
3. **Energy** (authored): calm opening, quieter still before the curtain, then the
   loudest moment on the page (the gold sanctuary). After that it comes down to
   warmth, and ends very still.
4. **Feeling and the one moment:** see the feeling curve and peak below.
5. **The thing no other site does** (authored): the visitor draws back the sanctuary
   curtain with their own hand, the way it is drawn at every Qurbana.
6. **Range** (authored): *heritage-editorial with one maximal moment*. The page is
   restrained everywhere so that the gold of the altar can be loud. This is not
   premium-minimal. The maroon and gold are the parish's own colours, already used on
   the live site and the logo, not a default palette.
7. **One world or scenes** (authored): **distinct scenes in one building**, walked in
   procession. There are cuts between rooms, and no continuous camera flight. A
   worldflight would need video and generated legs, and neither is available here
   (no ffmpeg, no generation key).
8. **Assets:** about 110 real parish photographs. The ones used here are the illuminated
   night exterior (hero planes), the daytime exterior, the gold altar, the antique cross, the Theotokos icon, the shrine at night,
   the night exterior with feast lights, and the parish life photos. **No generated
   imagery, no video.** The hero planes are cut from the real exterior photograph with
   the macOS Vision subject mask.

## Step 1 answers (authored)

- **What and who:** the home page of a 90-year-old Malankara Orthodox parish. It is
  for parishioners (here and in the diaspora), and for visitors and pilgrims to the
  International Martha Mariam Pilgrimage Centre.
- **What the visitor must believe by the end:** *this is a living house of prayer
  ninety years deep, and there is a place in it for you on Sunday morning.*
- **The one action:** come. The label is **"Get directions"**, and it is the same
  label everywhere it appears.

## Journey

```
1  Arrival       the church lit for the feast under a full moon, its name behind the spire
2  Roots         nine families, a covenant in 1934, a cross sent from Mount Athos
3  Threshold     the curtain is closed; Sunday, 7:00 in the morning
4  Encounter     the curtain opens on the Madbaha: Holy Qurbana
5  Intercession  the Mother of God, the shrine, Wednesdays
6  Belonging     the parish: choir, youth, the Navathi lamp, the feast at night
7  Dismissal     evening prayer, the lamp fully lit, the way here
```

Beats 3 and 4 are one pinned act (the hush is the first third of the peak act).

## Grammar: Liturgical procession (new)

A page shaped like the order of a liturgy. The visitor moves *inward* through
thresholds: grounds, door, nave, sanctuary. Then they turn once and are sent out.

- **Sequence:** strictly inward, then a single turn outward at the dismissal. No
  section returns to a depth already passed.
- **Navigation:** no top bar. A small header row scrolls away with the hero. The fixed
  chrome is a **five-wick brass nilavilakku** in the margin. One wick lights for each
  threshold the visitor crosses, and the lamp opens an index of the chapters.
- **Hero:** the building, from the road, at night.
- **Ending:** the dismissal at evening prayer. The same lamp, large and fully lit, is
  the closing image. The CTA sits in the plain practical facts (times, address).
- **Symmetry is reserved for the sanctuary.** Only the peak act is centred. Every
  other act anchors lead or trail.
- **Bans:** `pan` (a procession does not move sideways), `scrub` (no video), `magnet`,
  `spotlight`, `tilt`, chapter numbers or counters, centred copy outside the sanctuary,
  and invented figures.

## Signature move

**The sanctuary curtain, drawn by the visitor's scroll.** Two panels of maroon cloth
meet on a gold cross. Light shows at the seam first. Then the panels part and gather
toward the sides, their folds bunching as they go. The cross splits in two and the
Madbaha is there behind them. It is page-local code reading `--sc-p`, not a
clip-path wipe. The engine is untouched.

## Feeling curve (written before the score)

```
1  Arrival      wonder, quiet: the lit church at night; as you come down to the road the spire rises through its name
2  Reverence    small honest type: nine named families, a 1934 covenant, a cross from Mount Athos
3  Hush         the closed curtain fills the frame, one line, nothing moves
4  Awe (PEAK)   the curtain draws back and the gold Madbaha is there, huge, centred
5  Tenderness   after awe, the intimate scale of the Mother of God, the shrine at night
6  Belonging    faces: choir, youth, the Navathi lamp, the feast lights
7  Peace        evening, the brass lamp with all five wicks burning, the way home
```

No two adjacent lines share a feeling. Beat 3 is the authored silence before the peak.

## The peak

> "The red curtain pulled apart while I was scrolling and the whole gold altar was just
> there, like walking in on a Sunday morning."

It lives in act 3 (the Veil). It gets the largest span on the page (3.2 viewport
heights), the best photograph (the altar), and the silence in front of it.

## Tell-someone

> It's the site where **you draw the altar curtain open yourself and the gold sanctuary
> is just there**, and a little brass lamp lights a wick for every step you take inside.

## Authored silence

The first ~25% of the Veil act is deliberately still: the closed curtain and one line.
The verification pass should read it as the authored hush, not as dead scroll. The
curtain's light seam is already brightening there, so it is not frozen.

## Score

| # | Act | Device | Span | Why this one |
|---|---|---|---|---|
| 1 | Gate | `pin` + layered `parallax` planes (page JS) | 1.8 | The hero planes separate under the hand; the name passes behind the towers |
| 2 | Covenant | `flow` + `in`, `reveal` (up) on the cross | flow | The only act that reads like a document. Small, honest, archival |
| 3 | Veil (peak) | `pin` + signature curtain + `kinetic` lines | 3.2 | The longest hold; the change of state is the curtain |
| 4 | Mother | `flow` with `parallax` layers (shrine behind, icon in front) | flow | Overlapping planes at intimate scale |
| 5 | Parish | `flow` with big `reveal` wipes per photograph | flow | Each photograph arrives as a change of scene |
| 6 | Dismissal | `pin` (short) + the lamp, hold cue | 1.4 | The page stops and stays lit |

That is five device families (pin, parallax, flow/in, reveal, kinetic), with no family
leading two adjacent acts. There are 6 acts at roughly 11 viewport-heights, which is
outside the 6–7 acts at 13.6–13.8vh band.

## Change log

- **Hero photograph, changed before any markup was written.** The plan was the daytime
  exterior. Its church cut out cleanly, but the cloud sky could not be extended to fit
  desktop and phone framing without fabricating sky (a mirrored-cloud plate was tried
  and rejected as visibly fake). The illuminated night exterior has a true-black sky
  that extends seamlessly and a real moon, so it gives honest planes: moon (rebuilt as a
  radial glow from the photo's own halo), church, road with light trail. The feeling
  (wonder at arrival) is unchanged. The daytime photo now closes the Covenant act.

## Feel check (2026-10-30, read off the desktop, phone and reduced-motion sheets)

| Act | Intended | Felt | Verdict |
|---|---|---|---|
| Gate | wonder | wonder | Holds. The name sinking behind the spire is the clearest depth cue on the page |
| Covenant | reverence | quiet, archival | Holds |
| Veil, first third | hush | anticipation | Holds. Light at the seam keeps it from reading as stalled |
| Veil (peak) | awe | awe | Holds. Largest visual change on every sheet, longest span (3.2) |
| Mother | tenderness | calm, nocturnal | Close enough. The blue ground does more than the copy |
| Parish | belonging | documentary | **Weaker than intended.** Group photographs at mid size read as a record more than a welcome |
| Dismissal | peace | peace, resolved | Holds. The last screen stands still with content, lamp fully lit |

Changes made from the check: none to the curve. The Parish gap is reported rather than
papered over. The fix is better photographs (close, candid, one face per frame), which
the parish would need to supply.

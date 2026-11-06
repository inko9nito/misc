# Handoff: surgery supplement tracker

## Paste this into Claude Code to start

> Read HANDOFF.md in this folder first. It describes a phone checklist app (app/surgery-checklist.html), a printable half-letter checklist (print/), and a photo-cutout pipeline for product thumbnails (thumbnails/). The protocol table below is the source of truth for doses and dates. Keep the design rules in "Design direction" — the user has already rejected two earlier layouts. Before changing any dose or schedule, check "Open questions".

---

## What this is

The user has a tooth extraction surgery on **Mon, Nov 2, 2026**. The dental office gave them a two-page supplement protocol (photos kept out of this repo for privacy). The sheet mixes timing, prices and marketing copy, so we turned it into:

1. **Phone tracker app**: a single self-contained HTML file published as a private claude.ai artifact, which the user opens on their iPhone.
2. **Printable checklist**: a half-letter (5.5 × 8.5 in), 2-page PDF.
3. **Product thumbnails**: product photos cut out of hand-held shots and embedded in the app.

Ground rules from the user: **no prices and no appointment time** anywhere. Sentence case, few words.

## Where things live

| Thing | Location |
|---|---|
| Live tracker (private claude.ai artifact, version 5) | https://claude.ai/artifact/KsLmVdpucy41jiiH6B1jhY |
| Tracker source | `app/surgery-checklist.html` (one file; CSS, JS and base64 WebP images inline) |
| Home Screen app (GitHub Pages) | https://inko9nito.github.io/misc/surgery/ once merged to main; PR previews at `/misc/pr-preview/pr-<n>/`. Source in `web/`. |
| Print source and PDF | `print/checklist.html` → `print/Surgery-Supplement-Checklist.pdf` |
| Unused empty Design canvas (doesn't open in the iOS Claude app) | https://claude.ai/artifact/4YQ4D5DCp1WAxjCmfPRnXy — safe to delete if the user agrees |
| Product photos (originals) | Not in the repo (they show hands). Put new ones in `thumbnails/source-photos/`, which is gitignored. |
| Cutouts (transparent PNG) | `thumbnails/cutouts/*.png` |
| Label photos (dose facts) | Not in the repo. The dose facts are copied into the protocol table below. |
| UI reference the user chose | `reference/design-reference-tracker.jpg` (a dog-rehab exercise tracker) |

To update the live tracker, republish to the **same artifact URL**. That keeps the link and the synced checkmarks, which are stored server-side against the artifact.

## Protocol (source of truth)

Dates: the 2-week prep runs **Mon Oct 19 – Sun Nov 1** (14 days). Night before is **Sun Nov 1**. Surgery is **Mon Nov 2**. Recovery starts **Tue Nov 3**; the app's calendar runs through **Sun Nov 22** (5 Mon–Sun weeks).

| Item (product) | When | Dose / instruction | Source / notes |
|---|---|---|---|
| D3K2 (Quicksilver Scientific nanoemulsion) | Prep, before breakfast | 8 pumps (20,000 IU)/day, hold in mouth 30 sec | Label: 1 pump (0.5 mL) = 2,500 IU D3 + 90 mcg K2, so 20,000 IU = 8 pumps. Label directions: empty stomach, at least 10 min before meals, hold 30–90 sec; label dose is 1 pump 1–2×/day. See open question 1. |
| Methyl-B12 (Quicksilver Scientific liposomal spray) | Prep, before breakfast | 2 pumps, hold in mouth 30 sec | Label: 1–2 pumps (some listings 2), empty stomach, at least 10 min before meals. Replenishes B12 depleted by nitrous oxide. |
| PhytoMulti with iron (Metagenics, 60 tablets) | Prep and recovery, with breakfast | Once a day | Label: 1–2 tablets once daily with food; 2 tablets = 1,000 IU vitamin D + 18 mg iron. Kept apart from Bone Builder (calcium reduces iron absorption; usual advice is 2 h apart). Vitamin C just before breakfast helps iron. |
| Bio-D-Mulsion Forte (Biotics Research) | Prep, with breakfast | 2 drops (4,000 IU) | **Not on the office sheet.** Added at the user's request using the label serving size (2 drops = 100 mcg / 4,000 IU). Vitamin D absorbs better with a fat-containing meal (Dawson-Hughes 2015: +32% peak). |
| Vitamin C (Quicksilver Scientific liposomal, 4 fl oz) | Prep, 1 tsp 10 min before each meal | 3 tsp/day | Label: 1 tsp (5 mL) = 1,000 mg (sodium ascorbate) + 125 mg sodium; 24 tsp a bottle; empty stomach, 10+ min before meals, hold 30–90 sec, repeat to desired dose; refrigerate, use within 60 days of opening. Split in 3 because absorption saturates at high doses. See open question 6. |
| Magnesium glycinate (Metagenics, 120 tablets) | Prep, lunch + dinner + bedtime | 100 mg (1 tablet) 3 times a day | Set by the user, matching the US label (100 mg per tablet, 1 tablet 3×/day). The office sheet said "300ug" twice daily. Kept off breakfast, which has PhytoMulti's iron. Items `mgam`, `mgdn`, `mgpm`. |
| Bone Builder Plus (Metagenics, 90 caps) | Start ASAP; daily in prep and recovery, with dinner | 2 capsules (label) | US label: 2 capsules once daily = 420 mg calcium (MCHC) + 2,000 IU vitamin D. Sheet: "start as soon as possible… helps bone growth after surgery." Continuing after surgery is inferred. |
| GABA, CBD, Relax Milieu (blue bottle) | Night before (bedtime) **and** 1 hour before surgery | 1 pump each | |
| Halcion (prescription) | Surgery day | As directed by the office | Office calls it in. |
| Intenzyme Forte (Biotics, **50 tablets**) | Surgery day, day after, then every other day until gone; between meals | 10 tablets | 50 tablets = 5 doses: **Nov 2, 3, 5, 7, 9**. Biotics: take proteolytic enzymes on an empty stomach for their systemic effect; with food they act as a digestive aid. |
| Drainage Milieu (Physica, 2 fl oz tincture) | Recovery, anytime | Per bottle until empty | Sheet groups it with Lymph 3 as the "blue bottles." Label directions not found online. |
| Lymph 3 Chronic (Physica, 2 fl oz tincture) | Recovery, anytime | Per bottle until empty | Label directions not found online. |
| Renew silver gel (ameo life, extra strength) | Recovery, anytime | Q-tip around gums | "Gently, don't dislodge the clot." |
| Ultra Flora (Metagenics, probiotic) | Recovery from Nov 3, anytime | 1 tablet a day, 4 hours after the antibiotic | **Not on the office sheet.** Added by the user. Uses the Timing setting (`gap: 4, gapOf: abx`). |
| Antibiotic (amoxicillin) | From Oct 30, 3 times a day | As prescribed; the dinner dose is set to 1 tablet by the user | From the checklist email. |

App slots, in order: Before breakfast, Breakfast, Lunch, Dinner, Bedtime, Between meals, Anytime, 1 hour before, Also today.

### Open questions (don't resolve these by guessing)

1. **Vitamin D total.** The sheet says D3K2 at 20,000 IU/day, and the user also has Bio-D-Mulsion. It's unknown whether Bio-D counts toward the 20,000 or is in addition to it. Bone Builder Plus (2,000 IU per 2 caps) and PhytoMulti (1,000 IU per 2 tablets) also contain vitamin D, so as listed the daily total is about 27,000 IU. The app lists each separately.
2. ~~Magnesium unit and tablet count~~ Resolved by the user: 100 mg, 3 times a day.
3. **Whether D3K2, vitamin C, magnesium and B12 continue after surgery.** The sheet only says "2 weeks before." The app's Supplements view tells the user to ask the office.
4. **CBD with Halcion.** CBD inhibits CYP3A4, which metabolizes triazolam (Halcion) and can increase sedation. Already flagged to the user as something to confirm with the office. Don't add medical advice to the UI.
5. How long the recovery tinctures last ("until empty"). The app shows them daily through Nov 22.
6. **Vitamin C grams.** The sheet says "3.5 g/day (3 tsp)", but this bottle is 1,000 mg per tsp, so 3 tsp = 3 g. The app follows the teaspoon count. At 3 tsp a day a 24-tsp bottle lasts 8 days, so the 14-day prep needs 2 bottles.

## The app (`app/surgery-checklist.html`)

### Structure
- **Today** (default): surgery countdown (no card; a calendar button showing today's date on the right jumps to today and its week) → swipeable week strip with progress rings (5 weeks, scroll-snap, dots below) → the day's list, one card per time of day. A card's header shows "1 of 3" once something in it is taken; when everything in it is taken it holds open for 0.5 s (the tapped circle springs, the header turns sage and "✓ Done" pops in) so the user can see what they tapped, then folds smoothly down to its header ("✓ Done ⌄") (`HOLD_MS`, `foldSection`; the user asked for no bounce on the fold); unticking during the hold cancels the fold, and tapping the header opens it again until something in it is unticked. The user removed the date line, the "2 / 8 done today" counter and the To do header; the strip's selected day and rings carry that. One list. A supplement taken more than once a day shows which dose it is beside its name ("Vitamin C 2 of 3", counted in time order), and Intenzyme shows its dose of the 5-dose course; the user asked to keep the dose number out of the Dose text. Tapping the circle marks a dose taken; it stays in place, faded, with its check (the user asked not to move taken doses to a separate Done list). Tapping anywhere else on the row pushes a details page in from the right, as the user's HPDE app opens an event: a large photo (`IMG_L`), today's dose and time, how to take it, label facts and notes (`DETAILS`, keyed by name), and a "Mark as taken" button pinned at the bottom. The page under it slides 30% left and dims, on iOS's push spring. As in HPDE, each details page is a history entry (`#d/<day>/<id>`, `#s/<row>`): the Back chevron steps back through history, and Safari's own swipe back and forward slide the pages; when `popstate` says the browser already animated it (`hasUAVisualTransition`), the page shows or goes instantly instead of sliding twice. There is no custom swipe gesture: an earlier one fought Safari's and doubled the screens. Inside claude.ai's frame it skips history and only opens and closes. The user asked for the row/circle split after tapping rows by accident, and for the push page after a bottom sheet clipped its close button on long entries.
- **Edit** (top right of a details page): a page sheet slides up from the bottom, as HPDE's Edit details does. It stops below the status bar, the details page shrinks into a dimmed card on black, and it has Cancel, title and Save (disabled until something changes) across the top. It closes by dragging down from its toolbar (or from the form once scrolled to the top), with Cancel, or with back; it's a history entry of its own (`.../edit`). Fields: *Supplement* first (Name, Brand, How to take it, Label, Why, Note), then *This dose* (Dose, When, Reminder; from Today) or *This row* (Schedule, Reminder; from Supplements). Each section has its own note under its card saying what its changes affect. Restore original refills the defaults, and Save then clears the override. Edits are stored as overrides (`EDITS = { p: by product key, i: by item id, s: by Supplements row }`) in `localStorage` key `surgery-tracker-edits-v1`, and on claude.ai in the `tracker/edits` db doc. All shown text is HTML-escaped.
- **Supplements**: the full protocol by phase (2 weeks before / Night before / Surgery day / Recovery) with dates and notes. This replaces the paper sheet. Its rows open the same details page, without the mark button.
- **Progress**: "X / Y doses so far" plus a 5-week ring calendar. Tapping a day opens it in Today.
- **Local changes**: edits live only in the app's own storage, which iOS deletes with the Home Screen app. When there are any, a "✎ N local changes" chip sits next to Refresh. It opens a page (`#changes`) listing each one as old → new, with a **Copy for Claude** button that copies a plain list such as `- Bone Builder Plus [dose bone] · This dose (Dinner) · Dose: "2 capsules" → "2 capsules with food"`. The key in brackets says what to change: `supplement <product>` means `DETAILS` (or the name), `dose <item id>` means that item in `BEFORE`/`NIGHT`/`SURGERY`/`RECOVERY`, and `row <group>:<product>` means that `infoRow` in `renderSupps`. Build pasted changes into those defaults; on its next load the app drops overrides that match the defaults (`pruneEdits`), so the count clears by itself.
- A subtle Refresh button sits at the bottom of every tab, because the Home Screen app can't pull to refresh. It re-fetches the page with `cache: "reload"` (GitHub Pages lets browsers cache it for 10 minutes), then reloads.
- Bottom bar: Today / Supplements / Progress.

### Schedule model
- `DAY1 = Oct 19 2026`, `DAYS = 35`, day index `n` = days since DAY1. `NIGHT_N = 13` (Nov 1), `SURG_N = 14` (Nov 2), `INTZ_LAST_N = 21` (Nov 9).
- `itemsFor(n)` returns the day's items: BEFORE for n < 13; BEFORE + NIGHT for n = 13; SURGERY for n = 14; RECOVERY (plus Intenzyme on n = 15, 17, 19, 21) after that.
- Each item has `id`, `slot`, `name`, `sub`, `icon` (SVG fallback), optional `img` (key into `IMG`) and optional `pill` note.
- **Slots / cards**: `Before breakfast`, `Breakfast`, `Lunch`, `Dinner`, `Bedtime`, `Between meals`, `Anytime`, `1 hour before`, `Also today`, chosen from the bottle labels (see the protocol table). Each slot is its own card when a day uses more than one slot. On Nov 1 the night-before pumps sit under Bedtime. Vitamin C is three items (`vitc`, `vitc2`, `vitc3`).
- **Special days**: Nov 1 and Nov 2 get amber rings and numbers plus a marker (moon for night before, tooth for surgery day): under the ring in the Progress calendar, and on the ring's bottom edge in the week strip, so the strip's day cards don't reserve an empty row at the bottom (issue #12). The date line names them in amber.
- **Countdown card** (sage, matching the nav; the user asked to drop its amber): "15 days until surgery" → "Surgery is tomorrow" → "Surgery is today" → "N days since surgery". Based on the device's real date.

### State and sync
- Checkmarks are stored as a flat map: `{ "YYYY-MM-DD:<itemId>": true }`. Unchecking deletes the key.
- Synced through the claude.ai artifact runtime `db` capability: `await window.claude.use("db")` → `db.doc("tracker/state")`, using `onSnapshot` for live updates and debounced `set()` of the whole map. A first-snapshot merge keeps any taps made before sync connected.
- Falls back to `localStorage` key `surgery-tracker-v2` when `window.claude` is missing (any host outside claude.ai) or `use("db")` returns null.
- An earlier version used `checklist/state` and `surgery-checklist-v1`. Both are abandoned and the store was empty.
- **If you move the app off claude.ai**, replace the sync layer (functions `connect`, `queueSync`, `flush`). Everything else is plain DOM.

### Artifact runtime constraints (if it stays on claude.ai)
- One self-contained file. Stylesheets only from Google Fonts. Scripts only from allowlisted CDNs (none are used). Images as data URIs.
- No `alert`/`confirm`/`print`. Keep the `<meta name="claude:viewport-fit-sides" content="cover">` + `max(16px, env(safe-area-inset-*))` gutters and the safe-area padding on the fixed bottom bar.
- Light and dark themes are defined as tokens on `:root`, with the dark block under `prefers-color-scheme` and again under `[data-theme="dark"]`.

## Home Screen app (GitHub Pages)

The same app file, served from GitHub Pages so it can be added to the iPhone Home Screen with its own icon.

- `web/build.sh <out>` wraps `app/surgery-checklist.html` in `web/head.html` (viewport, safe-area padding that claude.ai normally adds, manifest, icons, launch images) and copies the images and `print/`.
- `web/generate.mjs` renders the icons from `web/icon.svg` and the launch images (app background, light and dark) from `web/devices.json`, and writes the launch `<link>`s into `head.html`. Re-run it after changing either file.
- Workflows: `.github/workflows/pr-preview.yml` builds each PR to `main:pr-preview/pr-<n>/`; `.github/workflows/pages.yml` builds main to `main:surgery/`. Pages serves `main` / root.
- Off claude.ai there's no `window.claude`, so checkmarks save to `localStorage` only. iOS keeps the Home Screen app's storage separate from Safari's, and a different URL is a different app, so install from `/misc/surgery/`, not a PR preview.

## Design direction (the user's feedback, in order)

1. v1 had four phase tabs (Before / Night / Day of / After) with day chips *and* a day stepper. **Rejected**: "bad layout with bugs and redundancies."
2. v2 was the date-driven tracker modeled on `reference/design-reference-tracker.jpg`. **Rejected**: "why did you make everything so huge."
3. v3 matched the reference's sizes, added dose dividers, highlighted the special days and added the countdown. Accepted.
4. v4 added product photos as thumbnails.
5. v5 added Bio-D-Mulsion Forte.

Standing preferences: minimal UI, fewer words, sentence case, outcome-oriented labels, and sizes that match the reference screenshot (not bigger).

Current sizes (CSS px, 375-wide phone): body 15; weekday 12 uppercase; ring 34 with stroke 3 and number 14; date line 15; counter 30 / 30 / 15; section title 16 at weight 600; list radius 16; row min-height 64; tile 42 with radius 12; item name 15 at weight 500; subtitle 14; check circle 24; bottom bar label 12 with 22 icon.

Tokens (light): bg `#F5F4F0`, card `#FFFFFF`, band `#FAF9F6`, line `#ECE9E2`, ink `#1E1E1B`, muted `#6E6B63`, ring track `#E6E3DB`, accent sage `#5F9C74` (text `#3D7552`, tint `#E4EEE6`), special amber `#B4651F` (tint `#F5E4D2`). Font: Figtree.

## Product thumbnails

Photos are of a hand holding each bottle on a white counter, with fingers wrapped over the bottle's right side. Pipeline (`thumbnails/pipeline/`, Python with rembg, OpenCV and Pillow):

1. `1_masks.py`: rembg `isnet-general-use` subject mask on a 1000-px downscale. Expects photos in `src/<name>.jpg`.
2. `2_cutouts.py`:
   - Finds skin with YCrCb thresholds and keeps skin components that touch the mask border, which separates fingers and palm from label artwork.
   - On white bottles (`intz`, `biod`, `silver`) it treats any warm saturated pixel as hand. `silver` also has a loose bounding box to drop the palm.
   - Straightens the bottle from its clean left edge and builds a **symmetric silhouette** around the bottle axis. Half-width is the narrower clean side, and straight body sides come from a line fit. The real top 14% is kept so the D3K2 pump spout survives.
   - Fills pixels hidden by fingers from their mirror twin across the axis, with inpainting for the rest. Feathers the edge and crops.
3. `3_export.py`: WebP data URIs → the app's `IMG` map (180 px, about 5–7 KB each) and `IMG_L` map (420 px, for the details sheet).

Keys: `mag`, `bone`, `d3k2`, `lymph`, `drain`, `silver`, `intz`, `biod`, `multi`, `b12`, `vitc`. `multi` and `b12` came from retailer product shots on a plain background, cut out with `4_product_shots.py` instead of steps 1–2. `vitc` too. Items with no photo yet (GABA, CBD, Relax Milieu, Halcion) use stroke icons. The user may send more photos. Run them through the same pipeline and check edges on light and dark tiles.

## Print checklist (`print/`)

- Half-letter portrait, 2 pages, front and back. Page 1: before-surgery dose list + a 14-day tracker grid (Day 1–14; Day 14 is the day before surgery). Page 2: night before, surgery day (1 hour before / also today), after surgery.
- Render: `python3 render_pdf.py <abs path to checklist.html> <out.pdf> <preview.png>` (Playwright Chromium; edit the hard-coded `executable_path` for your machine). Fonts are local in `print/fonts/` (Figtree, OFL).
- **Out of date versus the app**: it predates Bio-D-Mulsion, the 50-tablet Intenzyme schedule (it shows 8 every-other-day boxes), the real product names and the dose dividers. If the user wants a new print, generate it from the same data as the app.

## Suggested next steps
- Get answers to the open questions from the user or the office, and build them into the app.
- Pull the item data into one shared JSON so the app and the print version can't drift.
- Add photos for the remaining items if the user sends them.

## Post-op additions (from the office's implant post-op sheet and checklist email)
- Recovery days add **homeopathic pellets** (6 remedies, 30C; the sheet says 4 of each every 3 hours, the email says 3 every hour — open question for the office), **jaw exercises** 3×/day through Nov 8 (`JAW`, ids jaw1–3), and a **salt water rinse** 2×/day Nov 5–9 (`SALT`, ids salt1–2). Silver gel is 3–5 times a day.
- The Supplements tab has a **Recovery care** card (`CARE`): first-24-hours rules, soft foods, foods to avoid, pain medicine, retainer, rest. The office's address and phone numbers are left out of the public repo on purpose.
- From the checklist email: **antibiotic** 3×/day from Oct 30 (`ABX`, ids abx1–3), and on surgery day the antibiotic and **ibuprofen 800 mg** 2 hours before (new slots "2 hours before" and "After surgery"); silver gel, pellets and jaw exercises start after surgery. The email names Valium; the office called in Halcion, so Halcion stays and its note mentions the difference. How long the antibiotic continues after surgery is an open question.
- **Supplements continue after surgery.** The post-op sheet says "Make sure to take all of your supplements as per protocol till it is gone", so the whole daily stack (`BEFORE`) is on surgery day and every recovery day, along with the antibiotic 3×/day (until the prescription is finished; the end date is unknown) and Drainage, Lymph, silver gel and pellets (from after surgery on surgery day). Surgery-day slots come first in `SLOTS` ("2 hours before", "1 hour before"), then the usual meal slots, then "After surgery".

## Logged times
- Ticking a dose stores the time it was logged: `state["YYYY-MM-DD:id"] = "HH:MM"` (24-hour, local). `true` still means taken with no time (the time was cleared, or it was ticked before times existed). `on(k)` accepts either; `timeOf(k)` returns the time or "".
- A taken row shows "Taken 8:14 AM" under its dose. The details page has a "Taken at" time field above Mark as not taken: changing it saves at once, and Clear removes the time but keeps the dose taken. Sync (`clean`) keeps both kinds of value.
- **Next dose.** A supplement's interval is its `every` field (hours, a string in `DETAILS`; editable in the Edit sheet as "Repeat every", from "No set times" to 24 hours). Doses of it show when the next dose is due: the latest time logged for that supplement that day plus the interval, or the previous day's last dose when it runs past midnight. Pellets are `every: 3` (the post-op sheet); the antibiotic is `every: 8`, taken as "three times a day" spread evenly, which is an assumption. The taken row says "Taken 8:10 AM · next 4:10 PM", the first untaken dose says "Next 4:10 PM", and either says "due now" once the time has passed.
- **Repeating doses.** Pellets (any timed supplement with one row that day gets `repeat`) are logged again with each tap of the circle; the value is a list of times (`["08:10","11:15"]`). Their row says "2 doses · last 11:15 AM · next 2:15 PM" and never fades or folds its card. The details page lists each time to change or remove, and "Log a dose now".
- **Logged toast.** Logging a dose shows a toast above the tab bar for about 4.5 seconds: "✓ D3K2 logged" and the time. The time is a native time input under a label, so tapping it opens the iOS time picker; a new time saves straight away (for a repeating dose, it changes that one logged time). The toast stays while the picker is open.
- **Skipped doses.** "Skip this dose" on the details page stores `"skip"`. A skipped row fades, shows a dashed circle with a dash and "Skipped", and counts as dealt with: it folds its card the day's ring shows it as a lighter arc after the taken doses (out of all the day's doses), and Progress counts it separately ("· 3 skipped"). Tapping its circle, or Undo skip, puts it back to not taken; Mark as taken on it logs it as taken now.
- **Swipe to skip.** Swiping a not-yet-taken row left reveals a Skip button (Undo skip on a skipped row), iOS style: past half the row's width it acts straight away; a shorter swipe leaves the 96 px button showing to tap; tapping elsewhere or scrolling closes it. Only clearly horizontal drags are taken (`touch-action: pan-y` on rows), so vertical scrolling and Safari's edge swipe still work. Taken rows don't swipe.
- **Through the day.** Silver gel and pellets sit in a "Through the day" card at the top of each recovery day (after the surgery-day slots in `SLOTS`), not in Anytime at the bottom. Both are timed and logged again with each tap: pellets every 3 hours, silver gel every 4 hours (the sheet says 3–5 times a day). Their row says "2 times today · last 8:10 AM · next 12:10 PM".
- **Daily target.** A repeating dose can have `perDay` (editable as "Times a day"): silver gel 4, pellets 6 (estimates from 3–5 a day and every 3 hours while awake). Its row shows a segmented bar, one segment per time, filled as they're logged, with "2 of 4 · last 8:00 AM · next 12:00 PM". Its circle shows a plus until the target is reached, then the check; its card counts it as finished only then. The details page shows a larger bar with "2 of 4 today".
- **Doses tab.** A repeating dose's details page has Doses | Details tabs under its title. Doses starts with the day it was opened from ("Tuesday, Nov 3 · Yesterday") and counts that day only; past days show no next time (Doses first; the choice is remembered while the app is open). Doses holds the bar, the next time and the logged times in one card; the sticky footer keeps only "Log a dose now" (and Skip), so it stays short however many doses there are.

## Added supplements
- The Supplements tab has an **Add** button (top right). It opens the bottom sheet with Supplement (name, brand, how, label, why, note, icon) then Schedule (dose, times of day as chips with one dose each, start and end date, repeat every, times a day, reminder).
- They're stored in the edits doc as `EDITS.c["u_<id>"]` (so they sync like other edits) and appear in an "Added by you" group on the Supplements tab and as rows on each day in their date range (`customItemsFor`; item ids `u_<id>_<slot index>`). Edit on one of them reopens the same form, with Delete supplement.
- Each one counts as a local change ("New supplement" with everything about it on one line), so Copy for Claude can build it into the defaults.


## Activity

The Today view has a Schedule | Activity switch under the day strip. Activity lists every logged time for the selected day, earliest first, grouped into one card per hour under a heading like "8 AM", one row per time (so a dose taken 4 times shows 4 rows, numbered "2 of 4"). Doses ticked with no time and skipped doses are listed after it under their own headings. Tapping a row opens its details, where the time can be changed. The switch stays put when you change days.

## Reschedule

Swipe a dose left to show Move and Skip (a full swipe still skips). Move, or Reschedule on the details page, opens a small sheet with a date and an optional time. Doses that are taken, skipped or logged over and over through the day (silver gel, pellets) can't be moved.

- Stored on the dose's original key as `"mv>2026-11-06"` or `"mv>2026-11-06T14:30"`, so it syncs with the checkmarks. Moving it again changes the same record.
- On the new day it's its own row keyed `2026-11-06:d3k2@2026-11-05`, with a "Moved from" note, "At 2:30 PM" when a time was set, and no dose number. It counts toward the new day's ring, not the old one.
- The old day lists it under "Moved" at the end, with Undo while the moved copy isn't taken or skipped. Choosing the original date with no time also undoes the move.

## Care tab

A fourth tab in the bottom nav, from the office's implant post-op sheet (2 pages) and the checklist email. It replaced the "Recovery care" card on the Supplements tab.

- **Timeline** with dates worked out from surgery day. Rows that apply today get a "Now" chip, and finished ones fade: first 24 hours, jaw exercises, silver gel, very soft foods, salt water rinse, tougher foods, retainer.
- The rest of the tab: first 24 hours, pain, mouth care (pellets are left out, since they're already on the Today and Supplements tabs), foods to eat and foods to avoid.
- Office name, address and phone numbers, including the after-hours emergency number, are left out on purpose. The footer points to the office's sheet instead.

## Timing between supplements

Edit → Timing ties one supplement to another: "Take [4 hours] [after] [Antibiotic]". It's saved as the product fields `gap` (hours), `gapDir` ("after" by default, or "before") and `gapOf` (the other product's key), and works on added supplements too.

- **After:** the row shows "Take after 12:15 PM · 4 h after Antibiotic", using the other supplement's latest logged time that day. Once that time has passed it says "Ready now".
- **Before:** the row shows "Take before 2:15 PM · 2 h before Antibiotic", using the other supplement's next due time, which needs its "Repeat every" set.
- With nothing to work from, the row shows just "4 h after Antibiotic". Only the first dose of the day still to take shows timing.
- The details page shows the rule as "Timing".

Built-in from local changes (Nov 6): Ultra Flora was an added supplement (`u_mw3ca7gx8x7`). On load the app drops that copy and moves its checkmarks to `flora` (`BUILT_IN` in the app).

Details page footer (sticky): one row with the main button, then square icon buttons for Skip (or Undo skip, tinted) and Reschedule. Labels are in aria-label and title.

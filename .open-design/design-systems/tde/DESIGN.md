# The Drivers Edge Design System

> Texas HPDE school. Motorsport precision on the BMW M foundation, carried in TDE’s night purple and racing red: square geometry, light large type with one strong phrase, spaced caps labels, spec cells, photography on dark bands, everything you read on white.

**Foundation:** `bmw-m` from Open Design Agent Kit (chosen by Vera, Nov 2026, over Ferrari, Tesla and a Porsche-inspired option). We take its structure and manner, not its brand: no M tricolor stripe, no BMW type, no all-caps headlines.
**Implementation:** `tde/site/` (tokens in `assets/css/tokens.css`, components in `assets/css/tde.css`). Live reference: `tde/site/design-system.html`. `tokens.css` here is copied from the site by `tde/tools/sync-design-system.sh`.

## 1. Visual Theme & Atmosphere

- **Dark chrome, white reading.** The header, home hero, spec strip, photo band and footer are night purple (`--brand-purple-night`, with the carbon texture on the hero bands). Everything people read (events, run groups, the event page body, the booking card) sits on white.
- **Precision through restraint.** Square corners everywhere. Structure comes from 1px rules, not boxes or shadows: an ink rule opens a block, hairlines separate its rows.
- **Light, large display type** with one strong phrase (“Teaching the art of **high-performance** driving”). Labels are small spaced capitals.
- **Facts read like a spec sheet.** TDE’s claims (31 years, every level, in-car coaching, classroom, your car) and each event’s key numbers are spec cells: a big light value, a small caps label.
- **Photography leads.** Real car photos and real track outlines only, never drawn tracks.
- **TDE identity stays:** the wordmark (THEDRIVERS white, EDGE red, Saira wide italic), deep purple carbon, red redline accents.

## 2. Color

| Token | Value | Role |
|---|---|---|
| `--brand-purple-night` | `#0d0819` | Header, spec strip, photo band, footer, booking-card header bar is ink |
| `--brand-purple-deep` | `#160935` | Home hero and event-page hero, under `--carbon` |
| `--brand-purple` | `#24104e` | Carbon podium step style, accents on dark |
| `--accent` / `--brand-red` | `#d11f1f` | The main button, countdown tag, eyebrow labels on white, date-stamp bar |
| `--accent-hover` | `#b01818` | Button hover |
| `--brand-red-on-dark` | `#ff3b3b` | The strong phrase in the home hero, EDGE in the wordmark |
| `--fg` | `#12101a` | Ink: text, opening rules, selected options, booking header |
| `--fg-2` | `#2b2833` | Long reading text |
| `--muted` / `--muted-2` | `#575463` / `#45424f` | Secondary text, labels on white |
| `--meta` | `#6e6b78` | Fine print (4.5:1 on white) |
| `--border` | `#dcdbe2` | Hairlines between rows |
| `--surface-tint` | `#f1f0f4` | Notes, tips |
| `--on-dark-2` / `--on-dark-muted` | `#d9d5e4` / `#a8a2bb` | Text and labels on night |

**Early-bird row:** `#fff6d6` background, 3px `#e8c35a` left rule, `#4d3600` text, `#9a6b00` stopwatch, and a square `#4d3600` “N DAYS LEFT” tag.
**Status:** not open `#ece6fb` / `#2a1660`; sold out `#e9e6ee` / `#3b3546` with a `#17131f` photo tag; required `#fde4e4` / `#9b1515`.

### Run groups
| Format | Lowest to highest |
|---|---|
| 1-day | Purple `#8b5cf6` · Orange `#f97316` · Pink `#ec4899` |
| 2-day | Green `#22a35a` · Blue `#3b82f6` · Yellow `#eab308` (dark text `#1b1530`) · Red `#dc2626` |

Always paired with the group name. One event shows one set, never both. Never use orange for UI or selection; selection is ink.

## 3. Typography

One family: **Barlow** (free, DIN-style grotesk; stand-in for a licensed brand face). Saira wide italic is the brand face for the **wordmark and the date stamps on photos only**.

| Role | Setting | Size / leading |
|---|---|---|
| Home hero | Barlow 300, strong phrase 600 | clamp(46px, 6.6vw, 88px) / 0.96, −0.03em |
| Event hero | Barlow 300, track name 600 on its own line | clamp(38px, 4.4vw, 58px) / 0.98 |
| Section heading | Barlow 300 | clamp(34px, 4.2vw, 52px) / 1.0, −0.02em |
| Event-page heading | Barlow 300 | clamp(32px, 3.4vw, 42px) |
| Event title on a tile | Barlow 300 | clamp(30px, 3vw, 38px) / 1.05 |
| Spec value | Barlow 300, number 600 | clamp(26px, 2.5vw, 36px) |
| Item title (group, venue, card heading) | Barlow 500 | 21–24px |
| Reading text | Barlow 400 | 18px / 1.6 |
| Body | Barlow 400 | 17px / 1.55 |
| Label (eyebrows, nav, buttons, dt, tags) | Barlow 600, UPPERCASE | 11–13px, 0.10–0.14em tracking |
| Date stamp on photos | Saira italic 850, uppercase, 4px red bar | 28px on tiles, 38px on banners |

- Headings are sentence case. Capitals are only for labels, buttons and stamps.
- Use the strong weight for one phrase per heading at most.

## 4. Spacing & Grid

- 4px base. Container 1280px; gutter `max(4vw, 20px)`.
- Bands: 112px vertical on desktop, 64px on phones. Photo CTA band 112px.
- Section header (eyebrow, h2, sub) then 48px to content.
- Event page: content column up to 720px, 64px gap, 400px sticky booking card; under 900px the card follows the content and a sticky bottom bar appears.
- Rows: 16–18px vertical padding, hairline between rows, a 1px ink rule above each list.
- Radius: 0 everywhere. Touch targets ≥ 44px; buttons 52px (46px in tiles).

## 5. Layout & Composition

### Home
1. **Header** (night, 68px): wordmark left; nav in spaced caps right (Events, New drivers, Tracks, Rules & forms, Gift cards, Sign in); a red underline on hover; hamburger under 860px.
2. **Hero** (deep purple carbon): red car photo blended in from the right (on phones it sits behind the lower text and buttons). Eyebrow “High-performance driving school · Texas”, the tagline as the h1, lede, red “See upcoming events” and outlined “How we place you”. No booking from the hero.
3. **Spec strip** (night): 31 years · Every level · In-car · Classroom · Your car. Five cells on desktop, two columns on phones.
4. **Upcoming events** (white): eyebrow “Calendar”, h2, sub, then photo-led tiles two across.
5. **New drivers** photo band: the blue car under a night gradient, “Never driven a track?”, white button “See Dec 12”.
6. **How we place you** (white): two columns, 1-day and 2-day.
7. **Footer** (night): wordmark and line, three link columns (Drive, Prepare, TDE), base row with the cancellation policy and privacy.

### Event page
1. **Event hero** (deep purple carbon): crumb, eyebrow “HPDE by The Drivers Edge”, h1 (“Saturday Track at **Motorsport Ranch 1.7**”), date and city, and the banner photo on the right (same component as the tile).
2. **Spec strip** (white, ruled): date · sessions · groups · track length · entry price (the price cell follows the event state).
3. **Body:** fact rows (date with Add to calendar, venue with Get directions, registration status), early-bird row, a sticky tab bar of section links (About · Run groups · Schedule · Before you come · Track · Cancellation), then the sections. No organizer section.
4. **Booking card** on the right, sticky.

## 6. Components

### Event photo (tile and banner)
Aspect 900/516. Car photo pushed left (`background-size: auto 118%`; position `8% 60%`, the Corvette `26% 62%`) over `#05030b`, with the bottom-right vignette. White track outline bottom-right at 38% width and 72% opacity. A square red tag top-right in spaced caps (“IN 16 DAYS”; “SOLD OUT” in `#17131f`). Saira date stamp bottom-left on two lines with a 4px red bar. Each event has its own car; the tile photo matches the event-page banner.

### Event tile
Photo on top, then on white: red caps date line (“SAT, DEC 12 · 1-DAY”), title in Barlow 300, “Track · City”, the state block, and the action row pinned to the bottom (square button + “from $275”).

| State | Shows |
|---|---|
| Open, early-bird running | Early-bird row · red VIEW & BOOK |
| Open, early-bird over | No row · regular price |
| Registration not open | Purple-tint caps badge “REGISTRATION OPENS TUE, NOV 3, 10 AM · IN 3 DAYS” · outlined VIEW DETAILS |
| Sold out | Grayscale photo, dark tag, gray caps badge, outlined JOIN WAITLIST, price struck through |

### Spec cells
`dl.specs`: value (Barlow 300, number in 600) over a caps label; cells divided by 1px vertical rules. `.specs-dark` on night, `.specs-light` on white with a bottom rule.

### Buttons
Square, spaced caps, 13px/600. Red filled (main action, one per view) · ink outline on white (secondary; fills ink on hover) · white outline on dark (fills white on hover) · white filled on dark photo bands · disabled tint. Text links in caps with an arrow (“MORE EVENTS →”).

### Early-bird row
Stopwatch, “**Early-bird: save $30** until Dec 2”, square “N DAYS LEFT” tag. Identical on the tile, under the event facts and at the top of the booking card.

### Run groups (“How we place you”)
Per format: item title with a caps count (“3 GROUPS”) over an ink rule, the step graphic on a 2px ink baseline, then a ruled list: a 4px color bar, the name (Barlow 500), one sentence. The step style is still open: A (hatched outline, floating color cap) is live; B–E are on the reference page.

### Fact rows, lists, tables
Ink rule above, hairlines between rows. Icons in ink. Key–value lists with caps labels (150px column; stacked on phones). Schedule times in Barlow 300 at 22px. Disclosures are ruled rows with a light “+”/“–”. The cancellation table has caps headers over an ink rule.

### Booking card
1px ink border, square. An ink header bar (“BOOK · SAT, DEC 12” and “from $275”), then: early-bird row; RUN GROUP with a square two-tab switch (selected tab ink); options as stacked ruled rows (selected: ink border); New to TDE asks where you’ve driven; Returning lists only this event’s groups with an info icon for the other format’s equivalents; the solo checkbox only for returning drivers on a solo group; a note confirming the group; YOUR CAR (number + CHECK, sharing); ADD-ONS (helmet +$25, cap +$20); TOTAL in Barlow 300 at 40px; red RESERVE MY SPOT; phone line. Not open: the button is disabled and names the opening time. Sold out: header reads SOLD OUT, add-ons and total hide, the button is JOIN WAITLIST.

## 7. Motion & Interaction

- Nearly still. Hover: buttons invert or darken in 150ms; nav and tab links get a 2px red underline; arrow links nudge right 4px.
- Focus: 2px red outline, 3px offset.
- Smooth in-page scrolling, off under `prefers-reduced-motion`.

## 8. Voice & Brand

- Plain, direct, second person. “Bring your own car; a certified coach rides with you until you’re ready to go solo.”
- Sentence case for headings; caps only for labels. No exclamation marks.
- TDE’s own words: groups by color name (never numbers or “Level 1/2/3”), solo-approved, lead/follow, tech inspection. Spell out part-time instead of “P/T”.
- TDE makes the final call on placement; say so. Sign-off: “Show up ready. Get fast. Drive hard.”

## 9. Anti-patterns

- Copying BMW: the M tricolor stripe, BMW type, all-caps headlines, BMW naming.
- Rounded corners, drop shadows, gradients on UI controls, pill shapes.
- Heavy display weight on every heading; more than one strong phrase in a heading.
- Racing font (Saira) anywhere but the wordmark and photo date stamps.
- Made-up track shapes; flat photos with no vignette.
- Orange for UI or selection; the 1-day and 2-day color sets on one event.
- Level numbers, bar charts that read as quantities, matrices of group rules, gauges, flags, wristbands.
- Booking from the hero; an organizer section on TDE’s own site.
- Grey text on grey; reading text on dark bands longer than a lede.

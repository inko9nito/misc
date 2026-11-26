# The Drivers Edge Design System

> Texas HPDE school. Deep purple carbon and racing red up top, calm white reading below. Saira wide italic headings in sentence case, Inter for everything else.

Built for the redesign of thedriversedge.net (direction D, “Combined”). The live reference is `tde/site/design-system.html`; the site in `tde/site/` is the implementation. Tokens: `tokens.css` here, copied from `tde/site/assets/css/tokens.css` by `tde/tools/sync-design-system.sh`.

## 1. Visual Theme & Atmosphere

TDE has a 31-year-old identity: a bold, wide italic **THEDRIVERS** in white with **EDGE** in red, over the tagline “HIGH PERFORMANCE DRIVING EVENTS”, on a deep purple carbon-fiber background. Keep the logo and colors; modernize how they’re used.

- **The brand is loud only in the header and hero.** Purple carbon (`--brand-purple` with `--carbon`) and a 3px red rule under the header, a red ticker, and a dark hero with a real car photo blended into the purple.
- **Everything below the hero is on white.** This is a hard requirement for readability.
- **Approachable, not intimidating.** A lot of information (schedules, policies, run groups), made easy with generous spacing, short lines and hairline dividers.
- **Real motorsport imagery only:** real car photos and real track outlines. Never a drawn or invented track.

## 2. Color

### Brand
| Token | Value | Use |
|---|---|---|
| `--brand-purple` | `#24104e` | Header, hero, footer accents, the new-driver band |
| `--brand-purple-deep` | `#160935` | Headings and primary ink (`--fg`) |
| `--brand-purple-night` | `#0f0a1e` | Darkest surfaces |
| `--brand-red` / `--accent` | `#d11f1f` | Primary buttons, countdown pill, date-stamp bar, ticker |
| `--accent-hover` | `#b01818` | Button hover |
| `--brand-red-on-dark` | `#ff3b3b` | Red text on purple (“high-performance” in the hero), focus ring |
| `--carbon` | two 45° repeating gradients | Laid over `--brand-purple` on the header and hero only |

### Text and lines
`--fg #160935` headings and labels · `--fg-2 #2e2645` long reading text · `--muted #5d5868` and `--muted-2 #4b4462` secondary text · `--meta #76708a` fine print (darkened from the prototype’s #8a8399 to pass 4.5:1) · `--border #e6e0f0` card borders · `--border-soft #eee9f5` dividers · `--surface-tint #f5f2fa` soft fills.

### Early-bird (one style everywhere)
Background `#fff6d6`, border `#f3dc8a`, text `#4d3600`, stopwatch icon `#9a6b00`, and a dark “N days left” pill (`#4d3600` on `#fff6d6`).

### Status
Registration not open: `#ece6fb` / `#2a1660`, icon `#5b3fc0` · Sold out: `#e9e6ee` / `#3b3546`, pill `#17131f` · Required: `#fde4e4` / `#9b1515`.

### Run groups
Deliberately brighter than the brand purple, so Purple never reads as decoration.

| Format | Groups, lowest to highest |
|---|---|
| 1-day | Purple `#8b5cf6` · Orange `#f97316` · Pink `#ec4899` |
| 2-day | Green `#22a35a` · Blue `#3b82f6` · Yellow `#eab308` (dark text `#1b1530` on it) · Red `#dc2626` |

- Always pair a group color with the group’s name. Color is never the only signal.
- **One event shows one set.** Never show the 1-day and 2-day colors together on an event page or booking card.
- **Never color UI or selection states orange**, or they read as the Orange group. Selection is dark ink (`--brand-purple`).

## 3. Typography

| Role | Font | Size / line height | Notes |
|---|---|---|---|
| Hero h1 | Saira italic 850, stretch 112% | clamp(38px, 5.4vw, 64px) / 1.0 | Sentence case. Uses TDE’s tagline: “Teaching the art of *high-performance* driving”, with “high-performance” in `--brand-red-on-dark` |
| Section h2 | Saira italic 850, 112% | clamp(28px, 3.4vw, 38px) / 1.05 | Sentence case |
| Event-page h1 | Saira italic 850, 112% | clamp(30px, 3.8vw, 42px) / 1.08 | |
| Event-page h2 | Saira italic 850, 112% | 27px / 1.1 | |
| Card heading | Saira italic 800 | 19px | “1-day events” |
| Group name in lists | Saira italic 850, 110% | 18px | |
| Event name | Inter 700 | 19px / 1.25 | Not the racing font |
| Reading text | Inter 400 | 17.5px / 1.65 | Event-page body |
| Body | Inter 400 | 16px / 1.55 | |
| Date line | Inter 600, red | 13px | “Sat, Dec 12 · 1-day” |
| Fine print | Inter 400, `--meta` | 13.5px | |
| Wordmark | Saira italic 850, stretch 125% | 24px | Until TDE’s logo file arrives |
| Ticker, date stamp | Saira italic 800–850, **uppercase** | 14px / 28–34px | The only uppercase racing-font elements |

- Letter spacing on display type: −0.5px.
- **Don’t overuse the display font.** It goes on headings, the wordmark, the ticker, date stamps and group names, and nowhere else. On card details it made the cards busy and was rejected.
- Fonts are self-hosted (SIL OFL): `saira-italic.woff2` (variable width and weight) and `inter.woff2` (variable weight).

## 4. Spacing & Grid

- Container max 1240px; side gutter `max(4vw, 18px)`.
- Homepage sections: 64px vertical padding on desktop, 44px on phones, hairline between sections.
- Event page: one column up to 720px, 48px gap, a 400px sticky booking card on the right. Sections are 44px apart with 40px padding and a hairline (`#e9e4f1`) between them. Under 900px the booking card follows the content.
- Touch targets are at least 44px. Buttons are 48px tall (44px in cards).
- Radius: 6px tags · 10px buttons and inputs · 12px inner boxes · 16px cards · 18px panels and the booking card · pill for countdowns and badges.

## 5. Layout & Composition

### Homepage
1. Header: purple carbon, 3px red bottom border, wordmark, nav (Events, New drivers, Tracks, Rules & forms, Gift cards, Sign in). Hamburger under 760px.
2. Red ticker: “31 YEARS ON TRACK · NOVICE TO ADVANCED · CERTIFIED IN-CAR INSTRUCTION · CLASSROOM FOR EVERY GROUP · YOUR OWN CAR”. Scrolls slowly; stops for reduced motion.
3. Hero on dark carbon: headline, lede, red “See upcoming events” (scrolls to the list; no booking from the hero) and outlined “How we place you”. The car photo is **blended in, not placed on top**: masked from the right on desktop; on phones it starts behind the lower text and buttons with a purple tint.
4. Upcoming events (white), stacked event cards.
5. “Never driven a track?”: a solid purple band with a white button.
6. “How we place you”: two run-group cards.
7. Footer.

### Event page (MotorsportReg pattern)
Breadcrumb → banner (the same thumbnail as the card) → “HPDE by The Drivers Edge” → h1 → icon fact rows (date and hours with “Add to calendar”, track and address with “Get directions”, registration status) → early-bird box → section links (About · Run groups · Schedule · Before you come · Track · Cancellation; sticky on desktop) → sections → “Questions? Call 903.303.3000”. No organizer section. On phones a sticky bottom bar reads “From $275 · Book”.

## 6. Components

### Event thumbnail (card and banner)
Aspect 900/516. Car photo pushed left (`background-size: auto 118%`, position `8% 60%`; the Corvette uses `26% 62%`) over `#05030b`. A bottom-right vignette `radial-gradient(85% 120% at 100% 100%, #05030b 30%, rgba(5,3,11,.75) 52%, transparent 78%)` plus a bottom shade. The white track outline sits bottom-right, 38% wide, at **72% opacity** with a soft drop shadow (pure white was too stark). Red countdown pill top-right (“in 17 days”). Date stamp bottom-left in the racing font on two lines (“1-DAY · SAT” over “DEC 12”) with a 4px red bar. Each event has its own car photo, and the card must match the event-page banner.

### Event card
Thumbnail 340px left, body right; stacked under 600px. Body: red date line, event name (Inter 700), “Track · City”, then the state block, then the action row.

| State | Comes from | Shows |
|---|---|---|
| Open, early-bird running | dates | Early-bird box · red “View & book” · “from $275” |
| Open, early-bird over | dates | No box · regular “from” price |
| Registration not open | dates | Light purple calendar badge “Registration opens Sat, Nov 28, 10 am · in 3 days” · outlined “View details” |
| Sold out | booking-system flag | Photo mostly grayscale, dark “Sold out” pill, gray badge with a slashed circle, outlined “Join waitlist”, price struck through |

The price stays modest (Inter 600, 15px) so it never competes with the button.

### Early-bird box
Stopwatch icon, “**Early-bird: save $30** until Dec 2”, and a dark “N days left” pill on the right. Identical on the card, under the event-page facts and at the top of the booking card.

### Buttons
Red (`--accent`, white text) is the one main action per view. White on purple for the new-driver band. Outlined (2px currentColor) on dark. Quiet (white, 1.5px `#cfc8e2` inset) for secondary actions on white. Disabled: tinted fill, muted text.

### Run groups (“How we place you”)
Two white cards, “1-day events” and “2-day events”. Each has a **step graphic** rising lowest to highest with the group color as a cap, then a full-width list: a short color bar matching the cap, the name in the racing font, one sentence in Inter. Note below: “Everyone starts on the first step. You move up when a TDE instructor signs you off.” The step style is an open decision (A, hatched outline with a floating bar, is live; B–E are on the reference page).

### Booking card
Early-bird box first. **Run group** as a two-tab switch:
- **New to TDE:** “First time on a track” and “I’ve done track days elsewhere”; the second asks “Where have you driven, and about how many days?” and says TDE places you and confirms by email.
- **Returning driver:** only this event’s groups, each with a one-line description and an info icon revealing the other format’s equivalents.
- “I’m solo-approved for this track” appears **only** for returning drivers choosing a solo group, never for new drivers.
- A note confirms the choice: “On Dec 12 you’ll run in ● Purple. TDE confirms by email before the event.”

Then **Your car** (painted car number with “Check”, “Sharing this car” revealing the other driver’s name), **Add-ons** (helmet rental +$25, TDE ball cap +$20), **Total**, red “Reserve my spot”, and “Questions? Call 903.303.3000”. Not open yet: the button is disabled and names the opening time. Sold out: add-ons and total hide, and the button becomes “Join waitlist”.

### Fact rows, lists, tables
Icon rows with a 28px icon column, hairline dividers. Key–value lists (`dl`) at 120px label width, stacking on phones. Schedule rows with right-aligned tabular times in purple and a red-tinted “Required” tag. The cancellation policy is a two-column credit table with a 2px purple header rule.

## 7. Motion & Interaction

- Almost static. The ticker scrolls (38s loop) and stops under `prefers-reduced-motion`.
- Hover: buttons darken over 150ms; links underline.
- Focus: 3px `#ff3b3b` outline, 2px offset, on every interactive element.
- Smooth scrolling to in-page anchors, off for reduced motion.

## 8. Voice & Brand

- Plain, direct, warm; second person. “Bring your own car; a certified coach rides with you until you’re ready to go solo.”
- Sentence case everywhere, headings included. No exclamation marks.
- Use TDE’s own words: run groups by color name (never numbers or “Level 1/2/3”), “solo-approved”, “lead/follow”, “tech inspection”. Spell out jargon like part-time (“P/T”).
- TDE makes the final call on placement; say so.
- Closing line from TDE: “Show up ready. Get fast. Drive hard.”

## 9. Anti-patterns

Rejected during design review; don’t bring them back:
- A generic or template look; flat thumbnails with no depth.
- The display font everywhere, all-caps headings, or the racing font on card details.
- Made-up track shapes.
- An orange UI accent or orange selection states.
- The 1-day and 2-day color sets shown together on one event.
- Level numbers, “Level 1/2/3”, bar charts that read as quantities, tables or matrices of group rules, gauges, flags, progress lines, wristbands, staircases with a paragraph in each block.
- Text squeezed into narrow columns; extra tables or facts nobody asked for.
- Booking from the hero.
- An organizer section on TDE’s own site.
- Inconsistent styles between the homepage and the event page (“identity crisis”).

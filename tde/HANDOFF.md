# Handoff: The Drivers Edge (TDE) website redesign

**Owner:** Vera, a principal UX/product designer. She is preparing an unsolicited redesign proposal for The Drivers Edge, a Texas HPDE (high-performance driving) school, at thedriversedge.net.
**Status:** Direction **D · Combined** is the chosen direction. The homepage and event page are mostly settled. One visual decision is still open: the step style for the run-group graphic (see "Open decisions").
**Your job:** Continue refining D to proposal quality, apply Vera's decisions as she makes them, and keep the screenshot workflow going. She reviews by saving screenshots and marking them up on her phone.

---

## 1. What's in this package

| Path | What it is |
|---|---|
| `prototype/directions.html` | **The working prototype.** One self-contained HTML file with four directions (A Tower, B Pass, C School, D Combined), each with a homepage and an event page, plus a switcher bar. **D is the one that matters.** A, B and C are kept for reference only. |
| `prototype/redesign-v1-audit.html` | The first pass: a heuristic audit, user types, decisions and a validation plan. Useful as the case-study narrative for the proposal. Its visuals are outdated. |
| `assets/` | Photos and track images supplied by Vera (see section 6). |
| `screenshots/` | The latest renders of D, which are the visual source of truth. |
| `tools/shoot.py`, `tools/shootde.py` | Playwright scripts that render full-page screenshots with the real fonts (see section 8). |

Live hosted copies (Claude artifacts, private to Vera):
- Directions prototype: https://claude.ai/artifact/HE4NQuzaJ9sS2bQ5fNg3cG (slug `8364f6c2-1b57-4bba-adfd-1c74561de0ed`)
- v1 audit page: https://claude.ai/artifact/SCPqSm7eYqpJtfRa549cU5 (slug `cc0bb87f-0ff0-4b60-8071-f3223eb37b3e`)

> Vera's Claude "Design canvas" artifacts don't load for her, so never use them. Deliver designs as plain HTML and as screenshot images.

---

## 2. Brand: keep TDE's identity, modernize how it's used

TDE's real logo is a bold, wide italic **"THEDRIVERS" in white plus "EDGE" in red**, with the tagline **"HIGH PERFORMANCE DRIVING EVENTS"** underneath (words alternate between regular and bold). It sits on a **deep purple carbon-fiber** background with a **tachometer** motif and a red redline. The proposal must keep the logo and colors.

The prototype recreates the wordmark in CSS: Saira italic, wght 850, font-stretch 125%. **Swap in their real logo file when it's available.** The site's logo image wouldn't load from the sandbox.

| Token | Value | Use |
|---|---|---|
| Brand purple | `#24104e` (darker `#160935`, near-black `#0f0a1e`) | header, hero, footer, date blocks |
| Brand red | `#d11f1f` (hover `#b01818`; on dark backgrounds `#ff3b3b`) | primary buttons, countdown pill, accents, date-stamp bar |
| Ink | `#17131f` / `#1a0b3a` | text |
| Muted text | `#5d5868`, `#4b4462` | secondary text |
| Lines | `#e6e0f0`, `#eee9f5` | card borders, dividers |
| Early-bird yellow | bg `#fff6d6`, border `#f3dc8a`, text `#4d3600`, icon `#9a6b00` | the early-bird box (one style everywhere) |
| Carbon pattern | `repeating-linear-gradient(45deg, rgba(255,255,255,.045) 0 5px, transparent 5px 10px), repeating-linear-gradient(-45deg, rgba(0,0,0,.22) 0 5px, transparent 5px 10px)` over `#24104e` | header and hero |

**Run-group colors.** These are deliberately brighter than the brand purple so the Purple group never reads as decoration:
1-day groups: Purple `#8b5cf6`, Orange `#f97316`, Pink `#ec4899`.
2-day groups: Green `#22a35a`, Blue `#3b82f6`, Yellow `#eab308` (use dark text on it), Red `#dc2626`.
Never color selection or UI states orange, or they'll be confused with the Orange group. The selected state is dark ink.

**Type (settled):**
- **All headings use the racing font in sentence case:** Saira italic, 800–850, font-stretch ~110–118%. Do not use all caps for headings. Vera explicitly asked for consistency across the homepage and event page.
- Body, labels, card titles and form text use **Inter**.
- Don't overuse the display font. Putting it on card details made the cards feel busy, and Vera rejected that.
- The ticker in the header and the date stamps on images are the only uppercase racing-font elements.

---

## 3. Direction D · Combined: the settled design

### Homepage (`#d-home`)
1. **Header:** purple carbon background with a 3px red bottom border, the wordmark, and nav (Events, New drivers, Tracks, Rules & forms, Gift cards, Sign in). On phones, the nav collapses to a hamburger.
2. **Red ticker** (scrolls slowly, and stops when the user prefers reduced motion): "31 YEARS ON TRACK · NOVICE TO ADVANCED · CERTIFIED IN-CAR INSTRUCTION · CLASSROOM FOR EVERY GROUP · YOUR OWN CAR".
3. **Hero, dark carbon:**
   - The headline is TDE's own tagline, **"Teaching the art of high-performance driving"**, with the word "high-performance" in red. Do not use other headlines.
   - Lede text, a red "See upcoming events" button that scrolls to the event list (Vera does *not* want booking from the hero), and an outlined "How we place you" button.
   - **The car photo is blended into the background, not placed on top of it.** On desktop it's masked from the right and fades into the purple. On phones it starts behind the lower text and buttons, with a purple tint for readability. It shouldn't sit below all the content.
4. **Everything below the hero is on white.** Vera requires this for readability.
5. **Upcoming events:** the event cards (see below), stacked.
6. **"Never driven a track?"**: a solid purple band with a white button.
7. **"How we place you"**: the run groups (see below).
8. Footer.

### Event card (settled)
- **Side-by-side layout:** the thumbnail on the left (340px wide, aspect 900/516), the body on the right. On phones they stack.
- **Thumbnail recipe (final, after many rounds):**
  - The car photo is pushed to the left (`background-size: auto 118%`, `background-position: 8% 60%`).
  - A **bottom-right vignette** fades it to near-black: `radial-gradient(85% 120% at 100% 100%, #05030b 30%, rgba(5,3,11,.75) 52%, transparent 78%)` plus a bottom shade.
  - The **white track outline** (transparent PNG) sits in the bottom-right, about 38% wide, **muted to ~72% opacity** with a soft drop shadow. Vera said pure white was too stark.
  - A **red countdown pill in the top-right**, e.g. "in 17 days".
  - A **date stamp in the bottom-left in the racing font, on two lines:** a small "1-DAY · SAT" above a large "DEC 12", with a 4px red bar on the left. Splitting it onto two lines keeps long 2-day dates ("SAT–SUN / FEB 6–7") from running into the track.
  - Each event uses a different car photo (red GT-R for the 1-day, blue Corvette for the 2-day). **The thumbnail on the event card must match the event page banner.**
- **Body:** the date and format in red (Inter 600), the event name (Inter 700), "Track · City", then the **early-bird box**, then a red **"View & book"** button followed by "from $275". Keep the price modest: Vera said it was too big and competed with the button.
- **Card states** (all built, see `cards-states-desktop.png`):
  1. **Open, early-bird running:** shows the early-bird box.
  2. **Open, early-bird over:** no box, and the price shows the regular rate.
  3. **Registration not open yet:** a light purple badge with a calendar icon, "Registration opens Sat, Nov 28, 10 am · in 3 days", and an outlined "View details" button.
  4. **Sold out:** the photo goes mostly grayscale, a dark "Sold out" pill replaces the countdown, a gray badge with a slashed-circle icon appears, the button becomes an outlined "Join waitlist", and the price is struck through.
  - Registration-not-open and early-bird states are worked out from the dates. Sold out needs a flag from their booking system.
- **The early-bird box is identical in all three places** (card, top of the event page, booking card): a stopwatch icon, **"Early-bird: save $30"** until the date, and a dark "N days left" pill on the right. Vera picked the event-page version as the standard.

### Event page (`#d-event`), modeled on MotorsportReg's event page
One calm column with a sticky booking card on the right on desktop. On phones the booking card comes after the content, with a sticky bottom bar reading "From $275 · Book".
- A small "Events · 1-day Saturday Track" link, then the **banner, which is the same thumbnail as the card**.
- "HPDE by The Drivers Edge", then the H1 in the racing font, sentence case.
- **Fact rows with icons:**
  - date, hours (CT) and "in N days", with "Add to calendar"
  - "Motorsport Ranch 1.7 · clockwise", the address, and "Get directions"
  - registration status ("Registration open · Opened Nov 3 · from $275")
- The early-bird box.
- A row of section links: About · Run groups · Schedule · Before you come · Track · Cancellation.
- **About:** the description plus a fact list:
  - Format: one full day on a true racetrack
  - Track time: 5 sessions per run group plus lead/follow at lunch
  - Coaching: certified in-car instructors
  - Classroom
  - Levels: Novice to Advanced
- **Run groups:** Purple, Orange and Pink, each with its 2-day equivalents, plus expandable sections for **"Am I solo-approved? (and the solo discount)"** (five conditions) and **"New to TDE but have track or race experience?"**.
- **Schedule:** 6:30 gates · 7:00 sign-in and tech · 7:30 drivers' meeting (Required) · 8:00 track hot · 11:35 lunch + lead/follow (30 min) · 5:00 track cold. All times Central.
- **Before you come:** tech inspection within 30 days before the event, a helmet (or rent one for $25), and RV overnight parking (no hookups, restrooms only).
- **Track & location**, then **Cancellation policy** as a credit table, then a closing "Questions? Call 903.303.3000…" line.
- **No Organizer section.** Vera removed it because the page is already on TDE's own site.
- **Spacing matters:** sections have generous separation (44px margin, 40px padding, hairline dividers), headings ~25–27px, and body text ~17–17.5px. The goal is **approachable, not intimidating**: a lot of information, but easy to take in.

### Booking card (settled logic)
- The **early-bird box** comes first.
- **Run group:** a two-tab switch, **New to TDE** / **Returning driver**.
  - **New to TDE:** two choices, "First time on a track" ($365) and "I've done track days elsewhere" ($365). The second opens a "Where have you driven, and about how many days?" field, and the note reads "You'll start in Purple or Orange. TDE reviews your experience and confirms by email."
  - **Returning driver:** only this event's groups are listed. A 1-day event shows Purple, Orange and Pink. **Never show the 1-day and 2-day color sets together on the same event.** Each group has a one-line description and an **info icon** that reveals its 2-day equivalents ("At 2-day schools: ● Green, ● early Blue").
  - The **"I'm solo-approved for this track"** checkbox appears **only for Returning drivers choosing a solo group** (Pink). It can never appear for New to TDE drivers, since a new driver can't be solo-approved.
  - A note confirms the choice: "On Dec 12 you'll run in ● Purple. TDE confirms by email before the event."
- **Your car:** the painted-on car number with a "Check" button, and a "Sharing this car" checkbox that reveals a field for the other driver's name.
- **Add-ons:** helmet rental +$25 and TDE ball cap +$20. Both are real; they're on TDE's current event page.
- **Total**, a red "Reserve my spot" button, and "Questions? Call 903.303.3000".

### Run groups section ("How we place you"), partly open
- **Settled layout:** two white cards, "1-day events" and "2-day events". Each card has the **step graphic on top**, rising from lowest to highest, with the color as a cap. Below it is a **full-width list** of what each group means: a short colored bar matching the step cap, the name in the racing font, and one sentence in Inter. A note underneath reads "Everyone starts on the first step. You move up when a TDE instructor signs you off."
- **What Vera wants from this section:** show *what the levels are*, *that you progress* and *that one is lower than another*, plus *what each means*. Nothing more.
- **Rejected, don't bring back:**
  - level numbers (TDE never refers to groups by number)
  - "Level 1/2/3" labels
  - bar charts that look like quantities
  - tables or matrices, passing rules or extra facts
  - gauges, flags, or progress lines
  - narrow text columns under each step
  - staircases where each block holds a paragraph
  - wristbands

---

## 4. Open decisions (ask Vera, don't assume)

1. **Step style for the run-group graphic.** Five options are built under "Step style exploration" (`step-styles-desktop.png`):
   - A: her sketch, gray hatched outlines with a floating color bar (currently live)
   - B: carbon-purple podiums with a color cap
   - C: tinted podiums with a solid color band
   - D: stacked blocks, where each level adds one
   - E: a 3D podium

   Once she picks one, make it the main version and **delete the exploration block**.
2. **Per-group prices.** $365 / $325 / $275 (Purple, Orange, Pink) are placeholders. TDE's page only shows "$275–$365".
3. **The $30 early-bird saving and regular prices ($305 / $295).** These are inferred from TDE's Green pricing ($395 → $365). A note in the prototype says to confirm them per event.
4. **"Join waitlist"** in the sold-out state is a proposal. TDE has no visible waitlist, so the alternative is "call for cancellations".
5. **Run-group description copy.** Check the lines for Blue ("some drivers earn part-time solo") and Yellow ("solo once TDE signs you off"), which are summaries rather than TDE's wording.
6. **Images:**
   - Houston MSR has no track image. Vera said to use the Eagles Canyon one for the Feb card for now, even though the Feb event is at Houston MSR.
   - The real TDE logo file is still needed.
   - More car photos would help.

---

## 5. Business rules and facts (from TDE's site, Nov 2026)

- **Events:**
  - **Dec 12, 2026**, 1-day "Saturday Track" at Motorsport Ranch 1.7, clockwise, 9012 Performance Ct, Cresson TX 76035. 6:30 am–5:00 pm. From $275 (range $275–$365). Registration opened Nov 3 at 10:00 am. Early-bird ends Dec 2.
  - **Feb 6–7, 2027**, 2-day weekend school at Houston MSR 2.4 mi (17 turns), Angleton TX. From $265. Registration opened Nov 14 at 10:00 am. Early-bird ends Jan 27.
- **Formats** (FAQ):
  - 1-day: 3 groups (Purple, Orange, Pink), 5 sessions per group plus 1 lead/follow at lunch.
  - 2-day: 4 groups (Green, Blue, Yellow, Red), 4 sessions per day (8 total) plus 2 lead/follow.
- **Group equivalents** (event page and Solo Discount page):
  - Purple = Green, plus Blue drivers new to that group (full-time instructed).
  - Orange = Yellow and Blue part-time instructed.
  - Pink = TDE solo-approved Yellow and Red.
- **Solo rules:**
  - The solo discount is only for full-time solo-approved Yellow or Red (Pink on 1-day events).
  - A driver is **not** solo-approved if they haven't been evaluated by TDE, are new to TDE, haven't driven this event, track, configuration or direction, haven't driven with TDE in over 12 months, or TDE decides they need more in-car instruction.
- **Placement:** based on experience, history references, credible evaluations and the overall mix of drivers. **TDE makes the final call.**
- **Tech inspection:** within 30 days before each event.
- **Cancellation:**
  - Entries are non-transferable and non-refundable. Cancelling earns credit, valid for 12 months:
    - 30+ days before: 100%
    - 29–18 days: 50%
    - 17–8 days: 25%
    - 7–0 days: none
  - Car failures, failed tech, travel, weather and health issues aren't covered.
- **Contact:** 903.303.3000.
- **Original-site problems the redesign fixes** (detailed in the v1 audit):
  - two color systems on one page, and a dropdown of about 80 duplicate or typo'd options
  - prices not tied to options, and undefined jargon (SOLO, P/T)
  - policies hidden in footer links, and the event calendar kept in an external Google Doc
  - dead "#" links and a Google+ share button

---

## 6. Assets

| File | Notes |
|---|---|
| `car-red-gtr.jpg` (660×427) | Supplied by Vera. Used in the hero and on 1-day event thumbnails. |
| `car-blue-corvette.jpg` (925×526) | Supplied by Vera. Used on 2-day thumbnails. It has a busier, brighter background, so the vignette is essential. |
| `track-msr-cresson-aerial.jpg`, `track-eagles-canyon-aerial.jpg` | Track outlines over aerial photos, cropped from Vera's own HPDE app screenshots (her app). The whole track fits in frame. |
| `track-outline-*.png` | White outlines on transparent backgrounds, extracted from the aerials. Used on the thumbnails. |

**Do not draw made-up track shapes.** Vera rejected that. Use only real track images.

In the prototype these are embedded as base64 data URIs, because the hosted artifact can't load remote images. A production build should reference the files directly.

---

## 7. How Vera works (important)

- She reviews on her **iPhone**. She wants **full-page screenshots she can save and mark up**, sent as images. She doesn't want to navigate a small frame.
- Phone screenshots over 8000px tall must be **split into parts** before sending.
- The prototype has a compact switcher with a **Full screen** button and a floating **Exit** pill. Keep that working.
- Feedback style: she marks up screenshots and is precise. When she asks for options, give **2–3 genuinely different** ones, labeled, and show each on both the 1-day and 2-day cases and on both car photos. Don't over-explain, and don't add information she didn't ask for.
- **Things she pushed back on:**
  - generic or template look
  - display font everywhere
  - flat thumbnails with no depth
  - fake tracks
  - an orange UI accent
  - text squeezed into narrow columns
  - extra tables or facts
  - showing the 1-day and 2-day color sets together
  - level numbers
  - gimmicks
  - the page having an "identity crisis", meaning inconsistent styles

---

## 8. Technical notes

- `directions.html` is a single file of about 950 lines. CSS for each direction is scoped by class: `.dA`, `.dB`, `.dC`. **D uses `.dA.dD`**, plus `.dE` for its event page. The D-specific CSS blocks are marked `/* ============ D · COMBINED`, `/* D v2`, `/* D event`, `/* final thumbnail + states`, `/* compact switcher + full screen`, and so on.
- JS is one block at the end of `<body>`. Key functions:
  - `mount(form)`: the shared booking-card logic (tabs, groups, info icons, solo rule, totals)
  - `thumbF(id, state)`: the final thumbnail
  - `cardF(event, state)`: the event card with its four states
  - `ebBox(dateLabel, days)`: the early-bird box
  - `stepV(groups, variant)`: the step-style explorations
  - `DESC`: run-group descriptions
  - `DX2`: per-event dates, prices and labels
- **Watch for CSS class collisions.** Short names were reused across directions and broke things twice: `.sr` (screen-reader-only) and `.tk` (B's ticket). Use distinctive names.
- Routing uses the hash (`#d-home`, `#d-event`, and so on). The switcher clicks drive `go(direction, page)`.
- **Screenshots:** `tools/shoot.py` renders every direction with Playwright and system Chrome. Google Fonts are blocked in the sandbox, so it serves local fonts from `@fontsource-variable/saira`, `archivo` and `source-serif-4`, plus `@fontsource/inter` (`npm i` into `/tmp/fonts`), through a request route. It hides `.sw` and `.mcta` while capturing. Phone captures use a 390×844 viewport at 2× scale; desktop uses 1280 wide at 1×. `shootde.py` renders only D. **Update the hardcoded `/home/claude/...` paths** to your workspace.
- Reduced motion is respected (the ticker stops). Touch targets are at least 44px. Run-group colors are always paired with text, never used alone.

---

## 9. Suggested next steps

1. Get Vera's choice of **step style** and apply it. Remove the exploration block.
2. Clean D into a **standalone file** with A, B and C and the switcher removed, keeping the full-screen behavior. Move images out of base64 into an `assets/` folder for production.
3. Build a **2-day event page** for Feb 6–7, Houston MSR. It uses the Green, Blue, Yellow and Red groups in the booking card, with info icons that reveal the 1-day equivalents, and the blue Corvette thumbnail.
4. Add the **registration-not-open** and **sold-out** states to the event page and booking card, not just the cards.
5. Combine the v1 audit narrative with D into a **proposal deck or page** for TDE: problem, audit, users, before/after screenshots, and the open questions from section 4 for TDE to answer.
6. Re-render screenshots after every change and send them to Vera as images, split if they're too tall.

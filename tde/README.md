# The Drivers Edge redesign

An unsolicited redesign proposal for thedriversedge.net, a Texas HPDE school. Issues #29 (design system) and #30 (v1 build).

## What's here

| Path | What it is |
|---|---|
| `site/` | The v1 site: static HTML, CSS and JS. No build step. |
| `site/index.html` | Homepage |
| `site/event-dec-12.html` | 1-day Saturday Track, Motorsport Ranch 1.7 |
| `site/event-feb-6-7.html` | 2-day weekend school, Houston MSR 2.4 |
| `site/design-system.html` | Live design-system reference, rendered from the site's own CSS and JS |
| `site/assets/css/tokens.css` | Design tokens (source of truth) |
| `site/assets/css/tde.css` | Components |
| `site/assets/js/data.js` | Events, run groups, prices. Edit this each season. |
| `site/assets/js/tde.js` | Date-driven event states, countdowns, booking card |
| `../.open-design/design-systems/tde/` | The design system in Open Design Agent Kit format (`DESIGN.md`, `tokens.css`, `brand.json`) |
| `HANDOFF.md`, `reference/` | The design handoff and the earlier prototypes (direction D and the v1 audit) |
| `tools/shoot.mjs` | Full-page screenshots for phone review (Playwright) |
| `tools/sync-design-system.sh` | Copies `site/assets/css/tokens.css` into the Open Design design system |

## Design system

Built on the **BMW M** foundation from [Open Design Agent Kit](https://github.com/feimacode/open-design-agent-kit), in TDE's own purple, red and wordmark (no BMW stripe, type or caps headlines). Square geometry, light large Barlow display type with one strong phrase, spaced caps labels, spec cells, photography on dark bands, and everything people read on white. Details: `../.open-design/design-systems/tde/DESIGN.md`.

To use it with Open Design Agent Kit, ask your agent to use the design system `user:tde`.

## View it

Open `site/index.html` through any web server (fonts don't load from `file://`), for example `npx serve tde/site`.

Preview helpers in the URL:
- `?today=2026-11-26` pretends it's that day
- `?state=soon|ebx|sold` shows an event page as not open yet, early-bird over, or sold out
- `?clean` hides the prototype bar

Screenshots: `node tde/tools/shoot.mjs [outDir] [--only=index,event-dec-12] [--devices=phone]`.

## Open questions for TDE

1. Per-group prices ($365 / $325 / $275 at 1-day; $365 / $345 / $305 / $265 at 2-day) are placeholders. TDE's site shows only "$275–$365" and "from $265".
2. The $30 early-bird saving is inferred from Green pricing ($395 → $365).
3. "Join waitlist" when sold out is a proposal; the alternative is "call for cancellations".
4. The 2-day schedule, and whether RV parking is available at Houston MSR.
5. Run-group copy for Blue and Yellow summarizes rather than quotes TDE.
6. Images: a Houston MSR track outline (Eagles Canyon stands in), the real logo file, more car photos.
7. Step style for the run-group graphic (options on `design-system.html`).

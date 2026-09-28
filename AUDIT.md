# Repository Audit

## Project Shape

- Static multi-page HTML, CSS, and vanilla JavaScript. There is no framework, package manifest, dependency install, or build step; pages work from disk or a static host.
- Shared header and footer are now injected by `js/layout.js` into `#site-header` and `#site-footer`. Each page includes a no-script navigation fallback.
- Changeable conference facts are in classic-script globals under `data/`; there is no `fetch()` dependency.

## Canonical Pages

| File | Current content |
|---|---|
| `index.html` | Home page |
| `call-for-papers.html` | Renamed from `authors.html`; author guidance and dates |
| `registration.html` | Renamed from `registrations.html`; fees and registration steps |
| `committees.html` | Renamed from `committee.html`; renders organizing rosters from data |
| `sponsorship.html` | Sponsorship information; retained outside the target sitemap |
| `icetite20.html` | Historical ic-ETITE'20 page; retained outside the target sitemap |
| `visa.html` | Visa information |
| `venue.html` | Renamed from `hotel.html`; accommodation and travel information |
| `keynote-speakers.html` | Renamed from `speakers.html`; keynote content |
| `contact.html` | Contact information and client-side email form |

Redirect stubs remain at `authors.html`, `registrations.html`, `committee.html`, `hotel.html`, and `speakers.html`.

## Target Sitemap Status

The live target has 16 routes. Ten canonical pages now exist; the eight requested pages deliberately deferred to later steps are `about.html`, `advisory.html`, `tracks.html`, `important-dates.html`, `events.html`, `hackathon.html`, `technext.html`, and `team.html`. Header/footer links to those not-yet-created pages are intentional for this intermediate step. The live target routes were previously checked and returned HTTP 200.

## Styles, Scripts, and Data

- `assets/css/style.css`: shared color palette, typography, layout, components, responsive rules, reduced-motion behavior, and token-based styles for the injected header/footer.
- `assets/js/main.js`: scroll behavior, hamburger menu, homepage scrollspy, marquee, tabs, copy-email, back-to-top, hero entrance animation, and contact form.
- `js/layout.js`: shared responsive navigation and footer, dropdown/touch/keyboard behavior, active-page indication, and footer facts from `CONF`.
- `js/render.js`: safe DOM rendering for registration fees and organizing committee groups.
- `data/conference.js`: `window.CONF` event identity, dates, organiser, location, links, and address.
- `data/dates.js`, `data/fees.js`, `data/topics.js`, `data/committee.js`, `data/advisory.js`, `data/contacts.js`, `data/speakers.js`, and `data/editions.js`: their corresponding source-derived globals. The speakers array is empty because no 2028 speakers are named in the source.
- Media: `assets/12Asset 1.svg` (126,068 bytes), `assets/vit-white-logo.png` (94,971 bytes), `assets/VIT.jpeg` (171,683 bytes), and `assets/Video/videoplayback-2abc.mp4` (2,642,844 bytes). No approved IEEE ITS emblem asset is present; the top bar currently uses a linked text mark instead.
- `STYLE.md` documents the shared design tokens. No `images/` directory exists; `ic-ETITE24/` was empty in the initial tree.

## Content Flags and Remaining Stale Text

- Step 2 corrected the PDF submission-date typo to 05 October 2027 and records the organiser confirmation note in the data. Dr. Vijayan R's designation differs between the committee and contact sources. Dr. M. P. Rajan's affiliation still carries the PDF conflict and needs confirmation. The source spelling `Sarakar` and topic `Computation Intelligence` remain uncorrected pending organiser confirmation.
- The injected footer uses SCORE, omits the 2024 brochure and NOC links, retains links to `sponsorship.html` and `icetite20.html`, and has the required VIT, ranking, contact, directory, and date content.
- Old 2024 CMT submission links and the old brochure remain in the existing home/call-for-papers body content for the later content steps; `index.html` also still has the old TechNext link. They are not present in the injected header/footer.
- 2020 event details in `icetite20.html` and references to the SITE acronym in historical affiliation/source data are intentional context. The old `ic-ETITE '26` page titles have been corrected to `ic-ETITE'28`.
- External link reachability and embedded image text have not been exhaustively checked.

## Step 2-3 Browser Checks

- Fee renderer: 7 rows displayed from `data/fees.js` on `registration.html`.
- Committee renderer: 20 groups and 79 people displayed from `data/committee.js` on `committees.html`; the previous fictional placeholder names are gone.
- All ten canonical pages were checked at 360, 768, and 1280 px. Header and footer mounts rendered, page titles contained ic-ETITE'28, images loaded, and no horizontal overflow was observed.
- Mobile hamburger opens and exposes its expanded state; keyboard Enter opens dropdowns. CSS/JS diagnostics and whitespace checks passed.

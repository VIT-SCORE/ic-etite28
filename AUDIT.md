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
- `assets/js/main.js`: scroll behavior, hamburger menu, homepage scrollspy, marquee, tabs, copy-email, back-to-top, hero entrance animation/video gating, and contact form.
- `js/layout.js`: shared responsive navigation and footer, dropdown/touch/keyboard behavior, active-page indication, and footer facts from `CONF`.
- `js/render.js`: safe DOM rendering for registration fees and organizing committee groups.
- `data/conference.js`: `window.CONF` event identity, dates, organiser, location, links, and address.
- `data/dates.js`, `data/fees.js`, `data/topics.js`, `data/committee.js`, `data/advisory.js`, `data/contacts.js`, `data/speakers.js`, and `data/editions.js`: their corresponding source-derived globals. The speakers array is empty because no 2028 speakers are named in the source.
- Shared marks: `assets/12Asset 1.svg` is a resolution-independent conference logo; `assets/vit-white-logo.png` renders at 177×44 in the wide header. The top bar uses a locally optimized IEEE ITS emblem and the SCORE seal.
- Downloaded local Step 4 images: conference dais/auditorium, VIT campus, SCORE labs, IEEE ITS workshop, and the 2020/2024 inaugural photos. Each optimized JPEG is under 90 KB; the seal SVG is about 71 KB and ITS emblem about 3 KB. `assets/Video/videoplayback-2abc.mp4` is 2,642,844 bytes.
- No approved IEEE Madras Section logo exists in the repo, and the attempted official site URL returned 404. The sponsor name remains visible with an explicit logo TODO.
- `STYLE.md` documents the shared design tokens. `assets/images/` now holds the homepage media; `ic-ETITE24/` was empty in the initial tree.

## Content Flags and Remaining Stale Text

- Step 2 corrected the PDF submission-date typo to 05 October 2027 and records the organiser confirmation note in the data. Dr. Vijayan R's designation differs between the committee and contact sources. Dr. M. P. Rajan's affiliation still carries the PDF conflict and needs confirmation. The source spelling `Sarakar` and topic `Computation Intelligence` remain uncorrected pending organiser confirmation.
- The injected footer uses SCORE, omits the 2024 brochure and NOC links, retains links to `sponsorship.html` and `icetite20.html`, and has the required VIT, ranking, contact, directory, and date content.
- The homepage no longer links to the old CMT portal, 2024 brochure, or `TECHNEXT 24`. Historical ic-ETITE'24 facts appear intentionally in the previous-editions card, using the PDF figures. `call-for-papers.html` now uses EasyChair and current 2027/2028 deadlines; unsupported template, presentation, and PDF eXpress items are marked TODO.
- 2020 event details in `icetite20.html` and references to the SITE acronym in historical affiliation/source data are intentional context. The old `ic-ETITE '26` page titles have been corrected to `ic-ETITE'28`.
- External link reachability and embedded image text have not been exhaustively checked.

## Step 2-3 Browser Checks

- Fee renderer: 7 rows displayed from `data/fees.js` on `registration.html`.
- Committee renderer: 20 groups and 79 people displayed from `data/committee.js` on `committees.html`; the previous fictional placeholder names are gone.
- All ten canonical pages were checked at 360, 768, and 1280 px. Header and footer mounts rendered, page titles contained ic-ETITE'28, images loaded, and no horizontal overflow was observed.
- Mobile hamburger opens and exposes its expanded state; keyboard Enter opens dropdowns. CSS/JS diagnostics and whitespace checks passed.

## Step 4 Homepage Status

All 15 requested homepage sections are present:

1. Hero with poster-backed video, organizer, date, and four correctly ordered actions.
2. Badge strip for SCORE/VIT, IEEE ITS, NAAC, and NIRF.
3. Four key-fact items.
4. About ic-ETITE'28 with two conference photos.
5. Conference theme.
6. About VIT with two campus/lab photos, official link, and PDF ranking claims.
7. About SCORE with programme list, portal link, and seal.
8. About IEEE ITS VIT with chapter link and workshop photo.
9. Previous editions with data-rendered ic-ETITE'24 and ic-ETITE'20 stats, Xplore links, and history links.
10. Technical co-sponsor/support and organizing-school row.
11. Scopus publication note.
12. Call for Papers block with EasyChair CTA and manuscript compliance rules.
13. Important-dates timeline rendered from `data/dates.js`.
14. Keynote teaser with speakers-to-be-announced state.
15. Shared footer.

The hero video uses `muted`, `loop`, `playsinline`, `preload="metadata"`, and the local VIT JPEG poster. The MP4 is loaded only for motion-allowed viewports at least 768px wide; below 768px and under reduced motion, the static poster is shown instead.

The 360/768/1280 browser pass found no page/header overflow or broken images. At 360px the hamburger opens; touch-like click opens dropdowns; Tab reaches Events, Enter opens it, and Escape closes it. The VIT header image is 177×44 at desktop width.

### Open TODOs

- Supply the official 2028 conference brochure.
- Supply an approved IEEE Madras Section logo.
- Confirm and provide the 2028 IEEE paper template.
- Confirm presentation format and requirements for 2028.
- Confirm whether IEEE PDF eXpress instructions apply to the 2028 proceedings.
- Confirm the corrected 05 October 2027 submission date with organizers; the PDF says “05 October 207”.
- Resolve Dr. Vijayan R's Associate Professor / Professor designation discrepancy.
- Confirm Dr. M. P. Rajan's affiliation; the PDF includes both IIIT Kottayam and “Delhi”.
- Confirm the spellings “Sarakar” and “Computation Intelligence” with organizers.
- Name 2028 keynote speakers when confirmed; none are provided in the source.
- Provide the remaining eight target pages listed above in their later implementation steps.

# Repository Audit

## Project Shape

- Static multi-page HTML, CSS, and vanilla JavaScript. There is no framework, package manifest, dependency install, or build step; pages work from disk or a static host.
- Shared header and footer are now injected by `js/layout.js` into `#site-header` and `#site-footer`. Each page includes a no-script navigation fallback.
- Changeable conference facts are in classic-script globals under `data/`; there is no `fetch()` dependency.

## Canonical Pages

| File | Current content |
|---|---|
| `index.html` | Home page |
| `about.html` | Conference, theme, host, organizing school, society, and previous editions |
| `call-for-papers.html` | Renamed from `authors.html`; author guidance and dates |
| `tracks.html` | Research topics rendered from `data/topics.js` |
| `important-dates.html` | Conference timeline rendered from `data/dates.js` and `data/conference.js` |
| `registration.html` | Renamed from `registrations.html`; fees and registration steps |
| `committees.html` | Renamed from `committee.html`; renders organizing rosters from data |
| `advisory.html` | Thin entry page to the shared committee tabs, initially on International Advisory |
| `sponsorship.html` | Sponsorship information; retained outside the target sitemap |
| `icetite20.html` | Historical ic-ETITE'20 page; retained outside the target sitemap |
| `visa.html` | Visa information |
| `venue.html` | Renamed from `hotel.html`; accommodation and travel information |
| `keynote-speakers.html` | Renamed from `speakers.html`; keynote content |
| `events.html` | Conference and co-located event directory |
| `hackathon.html` | BOLT 3.0 coordinators and BOLT 2.0 history |
| `technext.html` | TechNext '28 Expo committee and booking TODO |
| `team.html` | IEEE ITS website team TODO roster |
| `contact.html` | Contact information and client-side email form |

Redirect stubs remain at `authors.html`, `registrations.html`, `committee.html`, `hotel.html`, and `speakers.html`.

## Target Sitemap Status

The live target has 18 canonical routes, including all seven pages that were deferred in the earlier build stage. Five legacy filenames remain as redirect stubs. Shared navigation destinations now resolve to real pages.

## Styles, Scripts, and Data

- `assets/css/style.css`: shared color palette, typography, layout, components, responsive rules, reduced-motion behavior, and token-based styles for the injected header/footer.
- `assets/js/main.js`: scroll behavior, hamburger menu, homepage scrollspy, marquee, tabs, copy-email, back-to-top, hero entrance animation, and contact form.
- `js/layout.js`: shared responsive navigation and footer, dropdown/touch/keyboard behavior, active-page indication, and footer facts from `CONF`.
- `js/render.js`: DOM rendering for registration fees, committee groups, dates, research tracks, edition highlights, event coordinators, speakers, and the web team.
- `data/conference.js`: `window.CONF` event identity, dates, organiser, location, links, and address.
- `data/dates.js`, `data/fees.js`, `data/topics.js`, `data/committee.js`, `data/advisory.js`, `data/contacts.js`, `data/speakers.js`, and `data/editions.js`: their corresponding source-derived globals. The speakers array is empty because no 2028 speakers are named in the source.
- Shared marks: `assets/12Asset 1.svg` is a resolution-independent conference logo; `assets/vit-white-logo.png` renders at 177×44 in the wide header. The top bar uses a locally optimized IEEE ITS emblem and the SCORE seal.
- Downloaded local images: conference dais/auditorium, VIT campus, SCORE labs, IEEE ITS workshop, and the 2020/2024 inaugural photos. Each optimized JPEG is under 90 KB; the seal SVG is about 71 KB and ITS emblem about 3 KB. The VIT campus JPEG is the static homepage hero background.
- No approved IEEE Madras Section logo exists in the repo, and the attempted official site URL returned 404. The sponsor name remains visible with an explicit logo TODO.
- `STYLE.md` documents the shared design tokens. `assets/images/` now holds the homepage media; `ic-ETITE24/` was empty in the initial tree.

## Content Flags and Remaining Stale Text

- Step 2 corrected the PDF submission-date typo to 05 October 2027 and records the organizer confirmation note in the data. The Publication Chair uses Associate Professor, SCORE consistently; its source conflict TODO is recorded once in `data/contacts.js`. Dr. M. P. Rajan's affiliation still carries the PDF conflict and needs confirmation. The source spelling `Sarakar` and topic `Computation Intelligence` remain uncorrected pending organizer confirmation.
- The injected footer uses SCORE, omits the 2024 brochure and NOC links, retains links to `sponsorship.html` and `icetite20.html`, and has the required VIT, ranking, contact, directory, and date content.
- The homepage no longer links to the old CMT portal, 2024 brochure, or `TECHNEXT 24`. Historical ic-ETITE'24 facts appear intentionally in the previous-editions card, using the PDF figures. `call-for-papers.html` now uses EasyChair and current 2027/2028 deadlines; unsupported template, presentation, and PDF eXpress items are marked TODO.
- Historical 2020/2024 details remain in `about.html`, `hackathon.html`, `data/editions.js`, and the edition renderer in `js/render.js`. The source brief retains PDF wording that names the former SITE school and the conflicting Publication Chair listing; active committee data uses SCORE.
- All active NIRF mentions include 14th University, 14th Research, and 16th Engineering: `index.html:53,62,113`, `about.html:72`, and the shared footer in `js/layout.js:88`. No active `#10`, over-1,000-delegate, or Double-Blind claim remains; the speaker-announcement wording is limited to the keynote placeholder.
- The cleanup request called the stale conference-year count eight but listed ten locations. All ten listed instances were corrected: `contact.html`, `registration.html`, `sponsorship.html`, `visa.html` (two), `venue.html`, `call-for-papers.html` (two), and `keynote-speakers.html` (two). The post-fix conference-name grep returns zero matches.
- Group 5 grep manifest (PDF binary excluded): `2024` remains intentionally in `about.html:7`, `hackathon.html:19`, `data/editions.js:5`, `js/render.js:395-454`, this audit's history notes, and the preserved source brief (`icetite28_agent_prompt_html.md:32,84,86,90,99,122,126-127,140,166,182,443`). Exact uppercase `SITE` remains only in this audit and the preserved source brief (`icetite28_agent_prompt_html.md:32,140,150,281,302`) as historical/source wording; active school and committee records use SCORE. `cmt3` occurs only in the source brief's search instructions (`:32,140`), not in live links. `Expo'24` occurs only in the source brief's old navigation/reference notes (`:32,72,140,436`). `ic-ETITE_24` has no remaining matches. The conference-name/2026 grep is clear.
- External links checked in the Group 6 review include VIT and the IEEE ITS chapter site. The two registration buttons still use the old ICETITE 2024 portal path; the 2028 destinations are unknown and require organizer confirmation. Other endpoints that did not respond to the checker are listed as unverified rather than labelled broken.

## Step 2-3 and 7 Browser Checks

- Fee renderer: 7 rows displayed from `data/fees.js` on `registration.html`.
- Committee renderer: 20 groups and 79 people displayed from `data/committee.js` on `committees.html`; the previous fictional placeholder names are gone.
- The shared accessible tab component on `committees.html` and `advisory.html` renders 79 organizing members, 41 international advisors, 47 national advisors, and 24 technical committee members. The international and national data are deduplicated with no repeated names. Dr. M. P. Rajan's unresolved affiliation remains flagged in both visible data and a source comment.
- Tabs expose tab/tablist/tabpanel roles, update hashes (`#organizing`, `#international`, `#national`, `#technical`), support touch/click and arrow/Home/End keyboard activation, and filter names with live “Showing n of total” counts. `advisory.html` uses the same renderer and opens `#international`; it duplicates no roster data.
- Search check: “raija” filters the international tab to Dr. Raija Halonen and reports “Showing 1 of 41”. All four full roster counts match source expectations.
- Both `committees.html` and `advisory.html` were checked at 360, 768, and 1280 px; neither has document overflow. The tab strip scrolls horizontally at 360 px. Roster tab arrow/End/Enter and touch-like click activation update focus, selection, and URL hash.
- All ten canonical pages were checked at 360, 768, and 1280 px. Header and footer mounts rendered, page titles contained ic-ETITE'28, images loaded, and no horizontal overflow was observed.
- Mobile hamburger opens and exposes its expanded state; keyboard Enter opens dropdowns. CSS/JS diagnostics and whitespace checks passed.

## Step 4 Homepage Status

All 16 requested homepage sections are present:

1. Hero with the static `assets/VIT.jpeg` background, dark text-contrast overlay, organizer, date, and four correctly ordered actions.
2. Quick Resources grid directly below the hero, with five amber buttons per desktop row and visibly disabled TODO states for unavailable 2028 downloads/guidelines.
3. About ic-ETITE'28 directly below Quick Resources, with conference purpose and the single `assets/images/conference-dais.jpg` image from the Step 4 media inventory; the two-photo item is satisfied with one conference image.
4. Badge strip for SCORE/VIT, IEEE ITS, NAAC, and NIRF.
5. Four key-fact items.
6. Conference theme.
7. About VIT with two campus/lab photos, official link, and PDF ranking claims.
8. About SCORE with programme list, portal link, and seal.
9. About IEEE ITS VIT with chapter link and workshop photo.
10. Previous editions with data-rendered ic-ETITE'24 and ic-ETITE'20 stats, Xplore links, and history links.
11. Technical co-sponsor/support and organizing-school row.
12. Scopus publication note.
13. Call for Papers block with EasyChair CTA and manuscript compliance rules.
14. Important-dates timeline rendered from `data/dates.js`.
15. Keynote teaser with speakers-to-be-announced state.
16. Shared footer.

The hero uses `assets/VIT.jpeg` as a CSS background. A dark gradient overlay preserves text contrast at every viewport; the hero contains no video markup or playback logic. The MP4 asset, if retained in the repository, is unused by the live page.

The 360/768/1280 browser pass found no page/header overflow or broken images. At 360px the hamburger opens; touch-like click opens dropdowns; Tab reaches Events, Enter opens it, and Escape closes it. The VIT header image is 177×44 at desktop width.

### Open TODOs

- Supply the official 2028 conference brochure.
- Supply an approved IEEE Madras Section logo.
- Confirm and provide the 2028 IEEE paper template.
- Confirm presentation format and requirements for 2028.
- Confirm whether IEEE PDF eXpress instructions apply to the 2028 proceedings.
- Confirm the corrected 05 October 2027 submission date with organizers; the PDF says “05 October 207”.
- Confirm Dr. M. P. Rajan's affiliation; the PDF includes both IIIT Kottayam and “Delhi”.
- Confirm the spellings “Sarakar” and “Computation Intelligence” with organizers.
- Name 2028 keynote speakers when confirmed; none are provided in the source.
- Replace the canonical and Open Graph URL placeholder after the official domain is confirmed.
- Add confirmed BOLT 3.0 dates, rules, prizes, and registration details in `hackathon.html`.
- Add the TechNext '28 registration/stall-booking destination in `technext.html`.
- Add confirmed website team names in `data/team.js`.
- Replace the two 2024 portal destinations on `registration.html` after organizers provide 2028 registration URLs.
- The common canonical/Open Graph TODO occurs on every HTML page (23 files); the matching domain TODO also occurs in `robots.txt` and `sitemap.xml`.

Final verification: the hero JPEG and overlay were checked in Edge at 1280px, 360px, and with reduced-motion emulation; each rendered the same static background and all four actions/date remained present. The hero DOM has zero video elements. A cache-busted stylesheet load was needed because the local browser initially held an earlier CSS response. The VIT logo is visible at 128Ã—32 on mobile and 177Ã—44 on desktop. W3C Nu reported zero errors on all 23 HTML files. The sitewide browser sweep confirmed one H1 and no horizontal overflow at 360/768/1280px.

# Repository Audit

## Project Shape

- Static multi-page HTML, CSS, and vanilla JavaScript; no framework, package manifest, dependency install, or build step.
- Opens directly from disk or can be served from the repository root. Content is written into each page rather than loaded from data files.
- The shared header and footer are copied into each HTML file, not injected by JavaScript.

## Existing Pages

| File | Current content |
|---|---|
| `index.html` | Home, conference overview, theme, history, VIT/SCORE/IEEE, submission, footer |
| `authors.html` | Author guidance, dates, old submission links |
| `registrations.html` | Fees and registration steps |
| `speakers.html` | Keynote content |
| `committee.html` | Organizing, advisory, and technical committee listings |
| `sponsorship.html` | Sponsorship tiers |
| `icetite20.html` | Historical ic-ETITE'20 content |
| `visa.html` | Visa information |
| `contact.html` | Contact details and client-side email form |
| `hotel.html` | Accommodation and travel information |

The target sitemap at `https://ic-etite28.vercel.app/` has 16 pages. Existing files match `index.html`, `visa.html`, and `contact.html` exactly. Missing target pages are `about.html`, `committees.html`, `advisory.html`, `call-for-papers.html`, `tracks.html`, `important-dates.html`, `registration.html`, `venue.html`, `events.html`, `hackathon.html`, `technext.html`, `keynote-speakers.html`, and `team.html`. Related but differently named pages include `committee.html`, `authors.html`, `registrations.html`, `hotel.html`, and `speakers.html`. `sponsorship.html` and `icetite20.html` are extra pages outside the target sitemap. All 16 target URLs were opened and returned HTTP 200 with page headings; the deployed framework implementation is not part of this static repository.

## CSS, JavaScript, and Media

- `assets/css/style.css`: shared palette and layout; navigation, hero, sections, cards, tables, forms, footer, responsive rules, and reduced-motion handling.
- `assets/js/main.js`: navbar scroll behavior, mobile menu, conference dropdown, home scrollspy, partner marquee, tabs, email-copy control, back-to-top button, hero entrance animation, and client-side contact form.
- Media inventory: `assets/12Asset 1.svg` (126,068 bytes), `assets/vit-white-logo.png` (94,971 bytes), `assets/VIT.jpeg` (171,683 bytes), and `assets/Video/videoplayback-2abc.mp4` (2,642,844 bytes).
- No `images/` directory exists; the initial tree contains an empty `ic-ETITE24/` directory. No filenames under `assets/` contain `2020`, `2024`, `20`, or `24`.
- Other root files: `AUDIT.md`, `STYLE.md`, `icetite28_agent_prompt_html.md`, and `writeup_updated_Sept22.pdf`.

## Stale and Historical Content

- `2024` and `cmt3`: old CMT submission links appear in `index.html` and `authors.html`. The old `ic-ETITE_24.pdf` brochure link appears in `authors.html`, `committee.html`, `contact.html`, `hotel.html`, `icetite20.html`, `index.html`, `registrations.html`, `speakers.html`, `sponsorship.html`, and `visa.html`; `index.html` also links it from the hero/resources. `index.html` links to `TECHNEXT 24`. Do not reuse these for 2028 without confirmation.
- `2020`: historical date/content is in `icetite20.html`, with links to that page in each shared navigation. These are archive material.
- `SITE`: occurs in the historical SCORE description on `index.html` and the repeated footer affiliation on all ten pages.
- Exact `Expo'24` wording was not found. The broad string `24` also matches CSS measurements and SVG viewBox values, not only year references.
- `index.html` is titled ic-ETITE '28. The other nine pages currently have ic-ETITE '26 titles, except that `icetite20.html` identifies the 2020 archive in its title.
- Local HTML paths and images resolved in the browser. This audit did not verify external URL reachability or OCR text embedded in images.

## Browser Check

All ten current HTML pages opened directly from disk. Referenced images loaded and no missing local references were detected. The home page had no horizontal overflow at 360, 768, or 1280 px; no overflow was observed on the other pages at the checked viewport. The home page still contains known stale 2024 content/links pending the content migration.

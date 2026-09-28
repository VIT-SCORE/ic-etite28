# Repository Audit

## Framework and Run Setup

- This repository is a static multi-page website built with HTML, CSS, and vanilla JavaScript. It is not a Next.js project; no framework or framework version is declared.
- There is no `package.json`, lockfile, Next.js configuration, application source directory, or dependency manifest. `npm install` and `npm run dev` therefore do not apply and were not run.
- Local equivalent for development: `python -m http.server 8000` from the repository root. The local server check is recorded below.

## Styling and Behavior

- Styling is centralized in `assets/css/style.css`, with CSS custom properties and shared page/navigation styles.
- Shared browser behavior is in `assets/js/main.js` (mobile navigation, dropdown, scroll behavior, tabs, email form, and other small interactions).
- There is no component framework or templating layer. Header, footer, and page content are repeated in individual HTML files.
- No `data/` or `content/` directory exists. The pages' content is authored directly in HTML; the partner marquee's labels are hard-coded in `assets/js/main.js`.

## Current Pages and Content Sources

| Page | Content source |
|---|---|
| `/` (`index.html`) | Hero, conference overview, theme, previous-edition highlights, VIT/SCORE/IEEE information, submission details, and footer. |
| `/authors` (`authors.html`) | Author guidelines, submission dates, and template/instructions links. |
| `/registrations` (`registrations.html`) | Registration categories, fees, and registration steps. |
| `/speakers` (`speakers.html`) | Keynote lineup and speaker notification content. |
| `/committee` (`committee.html`) | Organizing, advisory, and technical committee listings. |
| `/sponsorship` (`sponsorship.html`) | Sponsorship information and tiers. |
| `/icetite20` (`icetite20.html`) | Historical ic-ETITE'20 highlights. |
| `/visa` (`visa.html`) | Visa assistance and invitation-letter information. |
| `/contact` (`contact.html`) | Contact information and client-side email form. |
| `/hotel` (`hotel.html`) | Accommodation and travel information; this is an additional page not in the requested reference route list. |

Pages are linked as `.html` files. The reference route list also includes `/bolt`, which has no corresponding page. `/icetite24` and `/technext` are also absent and are requested later in the prompt.

## Reference Comparison

The requested reference route list is `/`, `/authors`, `/registrations`, `/speakers`, `/committee`, `/sponsorship`, `/icetite20`, `/bolt`, `/visa`, and `/contact`. The repository has matching HTML files for all except `/bolt`; URLs are file-based rather than clean routes. The repository additionally has `hotel.html`.

The reference homepage is an ic-ETITE'24 page. Its 2024 CMT submission, brochure, and NOC links are edition-specific and must not be carried forward as 2028 links without validation.

## 2020/2024 Strings and Assets

- Historical ic-ETITE'20 content is present in `icetite20.html` and referenced by the shared navigation on the other pages. The references are intentional archive/navigation content.
- Explicit `2024` matches occur in `index.html` and `authors.html`; the homepage includes prior-edition content and the authors page contains 2024-specific guidance/links that need review before reuse.
- The home page title says `ic-ETITE '28`, while titles on `authors.html`, `committee.html`, `contact.html`, `hotel.html`, `registrations.html`, `speakers.html`, `sponsorship.html`, and `visa.html` say `ic-ETITE '26`. The archive title identifies `ic-ETITE'20`.
- No asset filenames under `assets/` contain `2020`, `2024`, `20`, or `24`. The current asset tree includes logos, a VIT image, an SVG, and a video; references and image contents have not been independently checked for embedded edition text.

## Development Check

- `npm install` and `npm run dev`: not run because the repository has no Node project manifest or Next.js app.
- The site was opened directly from `file://` in the integrated browser; no server or build step is required.
- All ten existing HTML pages loaded. Their referenced local images loaded, and the local-reference scan found no missing files. No horizontal overflow was observed at the tested browser width; the home page was also checked at 360, 768, and 1280 px with no horizontal overflow.

## File Inventory

- Pages: `index.html`, `authors.html`, `registrations.html`, `speakers.html`, `committee.html`, `sponsorship.html`, `icetite20.html`, `visa.html`, `contact.html`, and `hotel.html`.
- Project/reference documents: `icetite28_agent_prompt_html.md`, `writeup_updated_Sept22.pdf`, and this `AUDIT.md`.
- Stylesheet: `assets/css/style.css` contains shared site styling, responsive breakpoints, navigation, page sections, and component styles.
- JavaScript: `assets/js/main.js` contains shared vanilla-JS navigation, scroll, tabs, email, and small page interactions.
- Media: `assets/12Asset 1.svg` (SVG logo/graphic, 126,068 bytes); `assets/vit-white-logo.png` (PNG, 94,971 bytes); `assets/VIT.jpeg` (JPEG, 171,683 bytes); `assets/Video/videoplayback-2abc.mp4` (MP4, 2,642,844 bytes).
- There is no `images/` directory. The empty `ic-ETITE24/` directory is present in the initial repository layout.
- The header and footer markup is copied into each of the ten HTML pages; it is not injected by JavaScript.

## Target Page Comparison

The requested page set is `index.html`, `authors.html`, `registrations.html`, `speakers.html`, `committee.html`, `sponsorship.html`, `icetite24.html`, `icetite20.html`, `bolt.html`, `technext.html`, `visa.html`, and `contact.html`. Existing files cover all except `icetite24.html`, `bolt.html`, and `technext.html`. `hotel.html` is an additional existing page. Navigation uses `.html` file links.

## Legacy-Term Scan

The requested search terms were checked in the HTML, CSS, and JavaScript sources:

- `2024`, `cmt3`, and the 2024 submission URL occur in `index.html` (submission links at lines 80 and 189) and `authors.html` (CMT link at line 145).
- The 2024 brochure URL (`ic-ETITE_24.pdf`) is in the repeated footer resources on all ten HTML pages. `index.html` also links it from the hero and accommodation resource links. These must not be reused for 2028.
- A `TECHNEXT 24` link remains on `index.html` at line 89. The exact `Expo'24` label is not present in the current site files.
- `2020` and the event's `24-25 February 2020` date appear in `icetite20.html`; its shared navigation link is copied into all ten pages. This is intentional historical content.
- `SITE` occurs in the SCORE description on `index.html` and the repeated footer affiliation on all ten pages (`formerly School of Information Technology and Engineering (SITE)`).
- A broad search for `24` also matches ordinary CSS dimensions/spacing and SVG `viewBox` values; those numeric matches are not edition references. No filenames in `assets/` include `2020`, `2024`, `20`, or `24`.

## Local Browser Check

- Opened `index.html` directly from disk and checked every existing HTML page in the integrated browser.
- All referenced images reported loaded (`naturalWidth > 0`) on each page; no broken local targets were found by the file-path scan.
- No horizontal document overflow was observed on the pages checked. The home page also had no overflow at widths 360, 768, or 1280 px.
- The live content still has stale 2026 titles on nine pages, and old 2024 external links noted above. This audit did not validate whether external URLs remain reachable.

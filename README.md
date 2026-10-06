# ic-ETITE'28 website

This is a static multi-page website built with HTML, CSS, and browser JavaScript. It has no package install, bundler, or build step. The repository root is the publish directory.

## Folder structure

- `*.html`: conference pages and legacy redirect pages.
- `assets/css/style.css`: shared styles and responsive layouts.
- `assets/js/main.js`: navigation, tabs, form behavior, and small page interactions.
- `assets/images/`: local conference, campus, and organization images.
- `assets/`: logos and other shared media.
- `data/`: editable conference facts, dates, fees, tracks, committees, speakers, and edition history.
- `js/layout.js`: shared header and footer.
- `js/render.js`: renders data-driven page content.
- `STYLE.md`: shared design tokens.
- `AUDIT.md`: build decisions, checks, and remaining content flags.
- `robots.txt` and `sitemap.xml`: SEO files. Their domain is a reserved TODO until the official domain is confirmed.

## Run locally

Serve the repository root with any static HTTP server. For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`. Opening `index.html` directly also works, though a local server is needed to check navigation and metadata as a hosted site would.

## Edit conference data

Edit the appropriate file under `data/`. These files assign browser globals such as `window.CONF`, `window.COMMITTEES`, and `window.TOPICS`; pages include them as ordinary scripts. Keep content shared between pages in the data files and render it through `js/render.js` or `js/layout.js` rather than copying facts into multiple pages.

Use `data/conference.js` for shared conference identity, dates, organizer, location, and URLs. Dates displayed from `CONF` update across pages automatically. Committee, advisory, contact, speaker, track, fee, event, and history content belongs in its corresponding data file.

## Add a page

1. Add a root-level HTML file with a unique title, description, canonical and Open Graph URL, and favicon.
2. Include the shared stylesheet and the page's needed data scripts, then `js/layout.js`, `js/render.js`, and `assets/js/main.js` in the same order used by a similar page.
3. Add `#site-header` and `#site-footer` mounts, a single page-level `<h1>`, and a no-script navigation fallback.
4. Use existing classes and tokens documented in `STYLE.md`. Add the URL to `sitemap.xml` once the official site domain is known.
5. Check the page at 360, 768, and 1280 pixels, and verify internal links from a local server.

## Deploy with Vercel

Import this repository in Vercel and set the project root to the repository root. Leave the framework preset as **Other** and leave the build and output directory fields empty; Vercel serves the static files directly. Alternatively, use the Vercel CLI from this directory:

```powershell
npx vercel
npx vercel --prod
```

After the official domain is confirmed, replace `TODO.invalid` in every page's canonical and Open Graph URLs, `robots.txt`, and `sitemap.xml`, then add the production domain in Vercel.

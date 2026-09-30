# Agent Prompt: Build the ic-ETITE'28 Website (Plain HTML, CSS, JavaScript)

Paste this whole document into your coding agent (Claude Code, Cursor, Copilot Agent, etc.) from the root of the cloned repo. Ask it to work **one step at a time** and stop for your review after each step.

---

## 0. Role and Goal

You are a senior front-end developer. Update the existing **ic-ETITE'24** website into the **ic-ETITE'28** website.

- **Repo to work in:** https://github.com/VIT-SCORE/ic-etite28.git (plain HTML/CSS/JS, no framework)
- **Reference site (look and page structure to preserve):** https://icetite.vercel.app/
- **Content source:** the attached `writeup_updated_Sept22.pdf`. Its content is reproduced in Appendix A of this document, so you do not need to open the PDF.

Keep the same page layout, navigation and visual style as the reference site. Change the content and year, add what is new, and fix the issues in Step 9.

## Ground rules

1. **No frameworks and no build step.** Do not add React, Next.js, Tailwind, npm packages or a bundler. Use only HTML, CSS and vanilla JavaScript. The site must work when `index.html` is opened directly or served by any static host.
2. Inspect the repo first. Follow the existing folder layout, file names, CSS class naming and coding style. Do not restructure things that already work.
3. Keep changeable content (dates, fees, committees, topics) in data files, not hard-coded into every page (see Step 2).
4. Never invent facts, names, links or numbers. If something is missing, insert a visible `TODO:` placeholder in a comment and list it in the final report.
5. Use semantic HTML (`header`, `nav`, `main`, `section`, `footer`), and write mobile-first, responsive CSS.
6. Test in the browser after each step by opening the page, or run `npx serve .` or `python3 -m http.server` for a local server.
7. Make one commit per step with a clear message, e.g. `step-3: update home page for ic-ETITE'28`.

---

## Step 1: Audit the repository

1. List every file. Note the pages, the CSS files (one shared file or several), the JS files, the `images/` or `assets/` folders, and how the header and footer are shared (copied into each page, or injected by JS).
2. Write `AUDIT.md` with: page list, CSS and JS files and what each does, image inventory, and every place that still says 2024 or 2020 (search for `2024`, `24`, `SITE`, `cmt3`, `Expo'24`).
3. Compare the pages against the reference site. The target pages are: `index.html`, `authors.html`, `registrations.html`, `speakers.html`, `committee.html`, `sponsorship.html`, `icetite24.html`, `icetite20.html`, `bolt.html`, `technext.html`, `visa.html`, `contact.html`. Use the repo's existing naming if it differs (for example `pages/authors.html`).
4. Open the site locally and note any broken layout, broken links or missing images.

**Done when:** `AUDIT.md` exists. Stop and report.

---

## Step 2: Centralise the data

Create a `data/` folder with plain JavaScript files that define global objects. Do not use `fetch()` on JSON files, because that breaks when the page is opened from disk.

- `data/conference.js`:
  ```js
  window.CONF = {
    name: "ic-ETITE'28",
    edition: "Third",
    fullTitle: "Third IEEE International Conference on Emerging Trends in Information Technology and Engineering",
    dates: "10–11 February 2028",
    venue: "Vellore Institute of Technology (VIT), Vellore, India",
    cosponsor: "IEEE Madras Section",
    supportedBy: ["ACM India Council", "IEEE Information Theory Society, VIT"],
    email: "icetiteconference@vit.ac.in",
    submissionUrl: "https://easychair.org/conferences/?conf=icetite28",
    address: "School of Computer Science Engineering and Information Systems, Vellore Institute of Technology, Vellore, Tamil Nadu, India 632014"
  };
  ```
- `data/dates.js` (important dates), `data/fees.js` (registration table), `data/topics.js` (four groups), `data/committee.js` (one array per group; each person is `{ name, role, affiliation }`), `data/contacts.js`.
- Fill them from Appendix A.

Then write a small `js/render.js` with functions that build tables and lists from these objects and insert them into placeholder elements, e.g. `<div id="fees-table"></div>` and `<div id="committee"></div>`. Load the data files before `render.js` on each page that needs them.

**Done when:** dates, fees and committees exist in one place only and pages render them from the data files.

---

## Step 3: Shared header and footer

1. If the repo copies the header and footer into every page, keep doing that but update all pages consistently. If it uses a JS include, update the include.
2. If there is no shared mechanism, create `js/layout.js` that injects the header and footer into `<div id="site-header">` and `<div id="site-footer">`, so navigation changes need only one edit.
3. **Header nav:** Home, Conference (dropdown: Authors, Registrations, Speakers, Committee, Sponsorships, ic-ETITE'24, ic-ETITE'20), Technext'28, Visa, Contact. Keep the BOLT logo linking to the BOLT page. Remove "Expo'24".
4. The dropdown must work with hover, keyboard focus and touch, and a mobile hamburger menu must work below 768px.
5. **Footer:** Technical Co-sponsor (IEEE Madras) and Supported By logos (ACM and others that already exist in the repo), social icons, the new address from `CONF.address`, and the email. Keep the existing Instagram, Facebook and LinkedIn links only if still valid; otherwise add `TODO:` placeholders.
6. Update `<title>`, meta description and Open Graph tags on every page to "ic-ETITE'28".

---

## Step 4: Home page (`index.html`)

Keep the hero and section order. Update:

1. **Hero:** "Welcome to ic-ETITE'28", "Third International Conference on Emerging Trends in Information Technology and Engineering (ic-ETITE'28)", "Technically co-sponsored by IEEE Madras Section", "10–11 February 2028 at VIT Vellore, India".
2. **Buttons:** "PAPER SUBMISSION" links to the EasyChair URL. Hide "Download Brochure" unless a 2028 brochure exists. Do not link the 2024 Google Drive file.
3. **Sections, in order:** About ic-ETITE'28, Theme of the Conference, Highlights of the Second ic-ETITE'24, Highlights of the First ic-ETITE'20, About VIT, Ranking & Accreditation, About SCORE, About IEEE Information Theory Society VIT, Manuscript Submission, Technical Co-sponsor and Supported By logos, Social links, Address.
4. The 2024 site says "School of Information Technology and Engineering". Replace it with the School of Computer Science Engineering and Information Systems (SCORE).
5. The Manuscript Submission text must state: plagiarism check, no embedded links, scanned images, headers or footers, and no email submissions.
6. Add an "Important Dates" block using `data/dates.js`.

**Done when:** no "2024" remains on the home page except inside the "Highlights of ic-ETITE'24" section.

---

## Step 5: Authors and Registrations pages

**`authors.html`**
- The paper submission button (EasyChair) is the main call to action.
- Submission rules, including the plagiarism check and manuscript restrictions.
- The 2024 site linked an IEEE final template, PDF eXpress guidelines and the IEEE copyright eCF. Keep those links only if still valid for 2028; otherwise leave `TODO:` placeholders.
- Note that extended versions of selected papers will be recommended to Scopus-indexed journals with impact factor.
- Important Dates table (rendered from `data/dates.js`).
- Topics in four groups (Information Technology, Communication Engineering, Computer Engineering, Electronics Engineering) from `data/topics.js`. Use `<details>` elements or a multi-column layout so the page is not one long list.

**`registrations.html`**
- Fee table from `data/fees.js` with columns Category, Indian Authors and Delegates (INR), Foreign Authors and Delegates (USD).
- Note that IEEE-member rates need a valid member number.
- Keep any existing registration or payment links. Do not invent payment details. Add `TODO:` for missing ones.

---

## Step 6: Committee page (`committee.html`)

1. Render every group from `data/committee.js`: Chief Patron, Patrons, Organizing Chair, Organizing Co-chair, Conference Chair, Publication Chair and Co-chairs, Finance Chair and Co-chair, Technical Programme Chairs, Publication, Sponsorship, Publicity and Media, Registration, BOLT 3.0 Hackathon, Technext'28 Expo, Event Management, Guest Care, Conference Coordinating, Executive Advisory, International Advisory, National Advisory, Technical Committee.
2. **Deduplicate** using the list in Step 9.
3. Layout: group headings with a responsive CSS grid of cards or a clean list. Add a small vanilla-JS search box that filters names.
4. Show a contact block at the top for the Conference Chair, Publication Chair and Finance Chair from `data/contacts.js`.

---

## Step 7: Remaining pages

- **`speakers.html`:** no 2028 speakers are named in the source, so show "Speakers to be announced". Keep the 2024 layout and make it data-driven from `data/speakers.js` (empty array for now).
- **`sponsorship.html`:** keep the structure. Add a `TODO:` for the 2028 sponsorship brochure. Optionally list Intel, Cisco, Yellow.ai, Java Capital and Seed VC Innovation under "Previous sponsors".
- **`bolt.html`:** rebrand to BOLT 3.0 and list the coordinators (Dr. J. Karthikeyan, Dr. Brijendra Singh, Dr. Krishnamoorthy N). Keep BOLT 2.0 stats (683 registrations) as history. Do not invent 2028 prizes or dates.
- **`technext.html`:** new simple page for Technext'28 (industrial expo and project competition) listing the Expo committee. Keep it minimal.
- **`icetite24.html`:** new page built from the 2024 highlights (Appendix A), modelled on the existing `icetite20.html`.
- **`visa.html`:** keep the content. Do not link the 2024 NOC file. Add a `TODO:` for a 2028 one.
- **`contact.html`:** email, the three chair contacts, and the address.
- **`icetite20.html`:** leave as is, apart from fixing broken links.

---

## Step 8: Quality pass

1. **Responsive:** check 360px, 768px and 1280px widths. No horizontal scrolling. Tables scroll inside a wrapper on small screens.
2. **Accessibility:** alt text on all images, correct heading order, visible focus states, WCAG AA colour contrast, keyboard-usable menu.
3. **SEO:** unique `<title>` and meta description per page, `sitemap.xml`, `robots.txt`, favicon.
4. **Performance:** compress images over 300 KB, add `loading="lazy"` to images below the fold, set `width` and `height` on images, and remove unused CSS and JS.
5. **Links:** check every internal link and image path. List any broken external links in the report.
6. **Stale content:** search again for `2024`, `cmt3`, `SITE`, `Expo'24` and confirm each remaining hit is intentional.
7. **Validation:** the HTML should pass the W3C validator with no errors.

---

## Step 9: Data problems in the source PDF (resolve, do not copy blindly)

List your decisions for each in the final report:

1. **Submission date typo:** the PDF says "05 October 207" while the other dates are 2027. Use **05 October 2027** and flag it for the organisers to confirm.
2. **Publication Chair inconsistency:** Dr. Vijayan R is "Associate Professor" in the contact table and "Professor, SITE" in the committee list. Use one value and flag it.
3. **International Advisory Committee duplicates:** Raija Halonen, Victor Chang, Hector Jose Garcia-Ramirez, Mahasweta Sarakar, Mahesh Banavar, Seamus Ross, Hemin Barzan Abdalla, Deepak Puthal, Suvendu Mohapatra, Li Zhang, Carl Gustaf Jansson, Olabiyisi, Subbu Kumarappan, Antonella Tucci, Niket Tandon, Sathish Gopalakrishnan, Sujatha Krishnamoorthy, Rajinikumar Ramalingam, Chockalingam Letchumanan, Adhavan Ramasamy and V. Murugesh each appear twice. Keep one entry each.
4. **National Advisory Committee duplicates:** P. Sakthivel, P. Subramanian, H. R. Mohan, K. V. S. Hari, S. V. Kulkarni, Arun D (Mahindrakar), Pabitra Mitra, Rajat Subhra Chakraborty, Dhiman Mallick, Nandakumar Nambath, Subhananda Chakrabarti, Chandan Kumar Sarkar, M. Nabi, Sougata Mukherjea and Shabbir Merchant are repeated. Keep one entry each, using the fuller name and title.
5. **Possible affiliation error:** "Dr. M. P. Rajan, Indian Institute of Information Technology, Kottayam, Delhi". Flag it and do not guess.
6. **Typos to fix without changing meaning:** "ViceChancellors" (Vice-Chancellors), "ACMMadras" (ACM Madras), "Dr.V.Murugesh" spacing, "Rs. 1,00, 000" (Rs. 1,00,000). Confirm "Sarakar" and "Computation Intelligence" with the organisers.
7. **Rank claims:** copy the QS, ARWU and NIRF figures exactly as given in Appendix A.

---

## Step 10: Deployment and handover

1. Test every page once more from a local server.
2. Deploy as a static site (Vercel, Netlify or GitHub Pages) and share the preview URL. No build command is needed; the publish directory is the repo root (or the folder that holds `index.html`).
3. Write or update `README.md`: folder structure, how to edit dates, fees, committees and speakers in `data/`, how to add a new page, and how to deploy.
4. Write the final report: what changed per step, all `TODO:` items, all flagged issues from Step 9, and any broken links.

**Definition of done:** every page works on mobile and desktop, there is no unintended 2024 content, the preview site is live, and every `TODO:` is listed in the report.

---

# Appendix A: Content from the PDF

## Event

- **Name:** Third IEEE International Conference on Emerging Trends in Information Technology and Engineering (ic-ETITE'28)
- **Sponsorship:** officially co-sponsored by IEEE Madras Section; supported by ACM India Council
- **Dates and venue:** 10–11 February 2028, VIT Vellore, India
- **About:** an international platform for researchers, academicians, engineers, industry professionals and students to present and exchange research in Information Technology, Computer Engineering, Communication Engineering, Electronics Engineering and related areas. It aims to foster knowledge sharing, interdisciplinary collaboration, industry-academia interaction and future research partnerships. Original, unpublished papers are invited.
- **Theme:** advancing research and innovation in Information Technology and Engineering, fostering international collaboration, interdisciplinary research and global research networks for joint initiatives and academic partnerships.

## Highlights of the Second ic-ETITE'24

- Organised by SCORE, VIT Vellore, 22-23 February 2024
- Technically co-sponsored by IEEE Madras Section, supported by ACM
- 1,688 papers received from 19 countries
- 32 technical sessions
- 22 keynote sessions by international academicians, Vice-Chancellors, IIT professors and industry experts from Microsoft, Amazon and others
- Expert panel discussions with speakers from academia, IEEE and industry
- 1,088 participants
- BOLT 2.0 International Hackathon: 683 registrations
- Technext'24: industrial expo and project competition
- Chief Guests: Dr. Zvi Galil (Georgia Institute of Technology, USA) and Shri S. Krishnan, IAS (Secretary, MeitY, Government of India)
- Industry collaborations and sponsorships: Intel, Cisco, Yellow.ai, Java Capital, Seed VC Innovation
- IEEE Xplore proceedings: https://ieeexplore.ieee.org/xpl/conhome/10493200/proceeding

## Highlights of the First ic-ETITE'20

- Held 24-25 February 2020
- Technically co-sponsored by IEEE Computer Society Madras Chapter and IEEE Communications Society Madras Chapter; supported by ACM Madras Chapter
- All presented papers were published in IEEE Xplore: https://ieeexplore.ieee.org/xpl/conhome/9070069/proceeding
- Electronic ISBN 978-1-7281-4142-8; USB ISBN 978-1-7281-4141-1
- 21 technical and 17 keynote sessions
- BOLT ("Breakthrough on Locked Technology") hackathon: 500+ participants, Rs. 1,00,000 prize money

## About VIT

Established in 1984 as Vellore Engineering College. Granted university status by the Government of India in 2001 under Section 3 of the UGC Act, 1956. Founded by Dr. G. Viswanathan. Committed to quality higher education, research and innovation, with a cosmopolitan academic environment, international collaborations, student and faculty exchanges and joint research. Vision: "Transforming life through excellence in education and research."

## Ranking and Accreditation (as stated in the PDF)

- QS World University Rankings by Subject 2026: 119th globally in Engineering & Technology; 86th in Computer Science & Information Systems; 87th in Electrical & Electronic Engineering; several other disciplines in the global top 200
- QS Sustainability Rankings 2026: 352nd globally, 7th among Indian institutions
- Shanghai Ranking (ARWU) 2025: 501-600 band globally, 1-2 band among Indian institutions
- NAAC: A++ grade, CGPA 3.66 on a four-point scale
- NIRF 2025: 14th in University, 14th in Research, 16th in Engineering

## About SCORE

The School of Computer Science Engineering and Information Systems at VIT Vellore covers Computer Science, Information Technology, Artificial Intelligence, Data Engineering, Cyber Security, Software Engineering and Computer Applications. Programmes: B.Tech IT; B.Tech CSE (AI and Data Engineering); B.Tech CSE (Cyber Security); BCA; B.Sc Computer Science; M.Tech CSE (Cybersecurity); M.Tech Software Engineering; MCA; M.Sc AI and Machine Learning; M.Tech by Research; Ph.D. It emphasises interdisciplinary research, industry collaboration, consultancy, industry-supported laboratories, Centres of Excellence, seminars, workshops, expert talks, symposia and conferences.

## About IEEE Information Theory Society, VIT

A student chapter that explores advances in information theory and applies them to current technological challenges, through technical events, workshops, seminars and collaborations with academia and industry, to help students build innovative solutions and technical expertise.

## Manuscript Submission

- Submit through https://easychair.org/conferences/?conf=icetite28
- All papers go through a plagiarism check
- No embedded links, scanned images, headers or footers in the manuscript
- Email submissions are not accepted
- Queries: icetiteconference@vit.ac.in
- Extended versions of selected papers will be recommended for Scopus-indexed journals with impact factor

## Important Dates

| Milestone | Date |
|---|---|
| Full paper submission | 05 October 207 [sic; likely 2027] |
| Notification of acceptance | 04 November 2027 |
| Camera-ready paper with registration | 12 December 2027 |
| Conference | 10 and 11 February 2028 |

## Registration Fees

| Category | Indian authors and delegates | Foreign authors and delegates |
|---|---|---|
| Industry professionals | Rs. 15,000 | US$ 400 |
| Faculty / Academicians | Rs. 14,000 | US$ 350 |
| Faculty / Academicians (IEEE members) | Rs. 12,000 | US$ 325 |
| Research scholars, UG and PG students | Rs. 10,000 | US$ 300 |
| Research scholars, UG and PG students (IEEE members) | Rs. 8,000 | US$ 275 |
| VIT (internal) | Rs. 10,000 | - |
| Co-authors / participants (non-authors) | Rs. 5,000 | US$ 200 |

## Contacts

| Role | Name | Designation | Email | Phone |
|---|---|---|---|---|
| Conference Chair | Dr. John Singh K | Professor | johnsingh.k@vit.ac.in | +91 94424 51035 |
| Publication Chair | Dr. Vijayan R | Associate Professor | rvijayan@vit.ac.in | +91 98423 50596 |
| Finance Chair | Dr. Priya M | Associate Professor | priya.m@vit.ac.in | +91 99946 28305 |

## Topics

**Information Technology:** Information Systems; Information Retrieval; Cloud Computing; Cloud Security; Knowledge Management; Molecular Information Systems; Data Management & Visualization; Cyber-Physical Systems; Digital Society; Big Data Analytics; Data Mining and Sentiment Analysis; Social Network Analytics; Data Sources and Integration; Distributed, Pervasive and Embedded Systems Security; Multimedia and Internet Security; Image and Video Retrieval; Web-based Application and Service Security; Cyber Security; Network Security and Information Security; Digital Forensics; Biometric Security; Quantum Cryptography; Malware Analysis and Detection; Secure IoT; Web Ontology; Web Intelligence; Search Engines; Innovative Information Security; Deep Learning; E-learning

**Communication Engineering:** Wireless & Sensor Systems; Social Networking; Communication Signal Processing; Wireless Communications; Mobile Communication; Communication Theory and Techniques; Ad-Hoc Networks; Innovative Networking and Communication Techniques; Data Communication; TV and Sound Broadcasting; Communication IC Design; Communication Protocols; Optical Communications; Telecommunication Networks; Radio and Satellite Communications; Radar, Sonar and Navigation Systems; Space Technologies; Zigbee Technology; Human Area Network; Next Generation Protocols; Software Defined Network; GPRS; HSPA; Quantum Communication; Fibre Optic Communication; Modelling and Simulation; Sensor & Micro-Machines; Wireless Video; Intelligent Control Systems; Internetworking of WLAN & Cellular Networks; 4G & 5G; Antenna & EMC/EMI; Aerospace Applications; Speech Processing

**Computer Engineering:** Computer Architecture; Computing for Development; Cognitive Analysis; Fuzzy Systems; Granular Computing; Modern Operating Systems; Rough Sets; Storage Techniques; User Interfaces; Next Generation Computing Technologies; Virtualization; Pervasive Computing; Quantum Computing; Human Computer Interaction & Accessible Technology; Machine Learning; Computation Intelligence; Natural Language Processing; Programming Languages & Software Engineering; Systems & Networking; Theory of Computation; Ubiquitous Computing; Artificial Intelligence; Augmented & Virtual Reality; Computer Graphics, Vision, Animation & Game Science

**Electronics Engineering:** Fabrication; Robotics; Digital Image/Signal Processing; VLSI/Embedded Systems; Microprocessor Based Technologies; Applied Electromagnetics and RF Circuits; Control Systems; MEMS and Microsystems; Optics and Photonics; Plasma Science and Engineering; Power and Energy; Quantum Science and Technology; Solid-State Devices and Nanotechnology; Antenna and Wave Propagation; Intelligent Systems Architectures and Applications; Microelectronics; Nano-electronics; Power Electronics; Signal and System Theory; Solar Technology; Network Theory; Modulation Techniques; Source and Channel Coding; Switching Theory and Techniques; Microwave Theory and Techniques; Wave Propagation; Measurement and Instrumentation; Circuit Design; Simulation and CAD; Microwaves, Antennas and Radio Propagation; Optoelectronics; Electromagnetic Compatibility; Digital Governance

## Organizing Committee

**Chief Patron:** Dr. G. Viswanathan, Chancellor, VIT

**Patrons:** Dr. Sankar Viswanathan (VP, VIT); Dr. Sekar Viswanathan (VP, VIT); Dr. G.V. Selvam (VP, VIT); Dr. Sandhya Pentareddy (Executive Director); Ms. Kadhambari S Viswanathan (Assistant VP); Dr. V. S. Kanchana Bhaaskaran (Vice-Chancellor, VIT); Dr. Partha Sharathi Mallick (Pro-Vice Chancellor, VIT Vellore); Dr. Jayabarathi T (Registrar, VIT)

**Organizing Chair:** Dr. Daphne Lopez, Professor & Dean (i/c), SCORE
**Organizing Co-chair:** Dr. Jeyanthi N, Professor & Associate Dean, SCORE
**Conference Chair:** Dr. John Singh K, Professor, SCORE
**Publication Chair:** Dr. Vijayan R, Professor, SITE
**Publication Co-chairs:** Dr. Brindha K; Dr. Deepa M (Professors, SCORE)
**Finance Chair:** Dr. Priya M, Associate Professor, SCORE
**Finance Co-chair:** Dr. Rajkumar M, Associate Professor, SCORE

**Technical Programme Chairs:** Dr. Priya V (Professor); Dr. Krithika L B (Assoc. Prof.); Dr. Senthil Kumar T (Assoc. Prof.); Dr. Tamil Priya D (Asst. Prof.), all SCORE

**Publication Committee (SCORE):** Dr. Angulakshmi M; Dr. Parvathi R; Dr. Padmakumari P; Dr. Gayathri A (Assoc. Profs.); Dr. Benjula Anbu Malar M B; Dr. Jagannathan J; Dr. Bhuvaneswari M S; Dr. Karthikeyan D; Dr. Anbarasa Kumar A; Dr. Yogaraja C A; Dr. Ayeswarya S (Asst. Profs.)

**Sponsorship Committee (SCORE):** Dr. Vivekananda G N; Dr. Praveen Kumar Reddy (Assoc. Profs.); Dr. Mohanraj G (Asst. Prof.)

**Publicity and Media Committee (SCORE):** Dr. Sumangali K; Dr. Asha N (Assoc. Profs.)

**Registration Committee (SCORE):** Dr. Santhi K; Dr. Seetha R; Dr. Bhuvana S (Assoc. Profs.); Dr. Sivashankari R; Dr. Jenila Vincent M (Asst. Profs.)

**BOLT 3.0 Hackathon (SCORE):** Dr. J. Karthikeyan (Professor); Dr. Brijendra Singh; Dr. Krishnamoorthy N (Assoc. Profs.)

**Technext'28 Expo Committee (SCORE):** Dr. Raghavan R (Assoc. Prof.); Dr. Balaji E; Dr. Balasubramani M; Dr. Arun Kumar A (Asst. Profs.)

**Event Management Committee (SCORE):** Dr. Srinivas Koppu; Dr. Vanmathi C; Dr. Mangayarkarasi R; Dr. Sudha M (Professors); Dr. Gundala Swathi; Dr. Chemmalar Selvi G (Assoc. Profs.)

**Guest Care Committee:** Dr. Dharmendra Singh Rajput (Professor, SCORE); Dr. Srinivasan P (Professor, SCORE); Dr. Magesh G (Asst. Prof., SITE)

**Conference Coordinating Committee (SCORE):** Dr. Hemalatha S; Dr. Anitha A; Dr. Pounambal M; Dr. Usha Devi G; Dr. Jagadeesh G (Professors); Dr. Kamalakannan J; Dr. Jayaram Reddy A; Dr. Mala Serene I; Dr. Nirmala M; Dr. Mythili N (Assoc. Profs.)

**Executive Advisory Committee (SCORE):** Dr. Arivuselvan K (HOD/IT); Dr. Thanapal P (HOD/SSE); Dr. Selvarani B (HOD/CSIS); Dr. Senthilkumar N (HOD/CA); Dr. Sumathy S; Dr. Dinesh Babu L D; Dr. Valarmathi B; Dr. Nadesh R K; Dr. Sujatha R; Dr. Chiranji Lal Chowdhary (Professors); Dr. Ramya G (Assoc. Prof.)

## International Advisory Committee (deduplicated)

- Dr. Dave Cliff, University of Bristol, UK
- Dr. Rafidah Md Noor, Universiti Malaya, Malaysia
- Dr. Mohamad Nizam Ayub, Universiti Malaya, Malaysia
- Dr. Saaidal Razalli, University of Warwick, UK
- Dr. Rossella Suma, University of Warwick, UK
- Dr. Joemon Jose, University of Glasgow, UK
- Dr. Sung-Bae Cho, Yonsei University, Korea
- Dr. Rajkumar Buyya, The University of Melbourne, Australia
- Dr. Elena Troubitsyna, KTH Royal Institute of Technology, Sweden
- Dr. Zvi Galil, Georgia Institute of Technology, USA
- Dr. Aravinda Prasad Sistla, University of Illinois Chicago, USA
- Dr. Shamkant Navathe, Georgia Institute of Technology, USA
- Dr. V. N. Venkatakrishnan, University of Illinois at Chicago, USA
- Dr. Mark Zwolinski, University of Southampton, UK
- Dr. David Stotts, University of North Carolina, USA
- Dr. Mahendra Piraveenan, The University of Sydney, Australia
- Dr. Sophia Ananiadou, The University of Manchester, UK
- Dr. P. N. Suganthan, Nanyang Technological University, Singapore
- Dr. Femilda Josephin Joseph Shobana Bai, Istinye University, Istanbul, Turkey
- Dr. Kasper Rasmussen, University of Oxford, UK
- Dr. Raija Halonen, University of Oulu, Finland
- Dr. Victor Chang, University of Liverpool, UK
- Dr. Hector Jose Garcia-Ramirez, University of Michigan, USA
- Dr. Mahasweta Sarakar, San Diego State University, USA
- Dr. Mahesh Banavar, Clarkson University, USA
- Dr. Seamus Ross, University of Toronto, Canada
- Dr. Hemin Barzan Abdalla, Neusoft Institute Guangdong, China
- Dr. Deepak Puthal, University of Technology, Sydney, Australia
- Dr. Suvendu Mohapatra, Volktek Corporation, Taiwan
- Dr. Li Zhang, The Chinese University of Hong Kong
- Dr. Carl Gustaf Jansson, KTH Royal Institute of Technology, Sweden
- Dr. Olabiyisi (Stephen Olatunde), Ladoke Akintola University of Technology, Nigeria
- Dr. Subbu Kumarappan, Ohio State University, USA
- Dr. Antonella Tucci, Centro Veramico-Bologna, Italy
- Dr. Niket Tandon, Allen Institute for Artificial Intelligence, USA
- Dr. Sathish Gopalakrishnan, University of British Columbia, Canada
- Dr. Sujatha Krishnamoorthy, Wenzhou Kean University, China
- Dr. Rajinikumar Ramalingam, Karlsruhe Institute of Technology, Germany
- Dr. Chockalingam Letchumanan, Quest International University, Perak, Malaysia
- Dr. Adhavan Ramasamy, Verizon Enterprise Solutions, USA
- Dr. V. Murugesh, Cihan University, Erbil, Iraq

## National Advisory Committee (deduplicated)

- Dr. P. Sakthivel, Chairman, IEEE Madras Section (also listed as Chairman, IEEE Computer Society Madras Chapter)
- Dr. S. Radha, Secretary, IEEE Madras Section
- Dr. Brindha Saminathan, Treasurer, IEEE Madras Section
- Mr. P. Subramanian, Chairman, IEEE Communication Society, Madras Chapter
- Mr. H. R. Mohan, Chairman, ACM India
- Dr. K. Vijayakumar, Chairman, ISTE Kerala Section
- Dr. Tarun Kanti Bhattacharya, ECE, IIT Kharagpur
- Dr. Rajat Subhra Chakraborty, CSE, IIT Kharagpur
- Dr. K. Sreenivasa Rao, CSE, IIT Kharagpur
- Dr. Ashutosh Modi, CSE, IIT Kharagpur
- Dr. Pabitra Mitra, CSE, IIT Kharagpur
- Dr. Srinivas Talabattula, ECE, IISc Bangalore
- Dr. Y. N. Srikant, ECE, IISc Bangalore
- Dr. K. V. S. Hari, ECE, IISc Bangalore
- Dr. Urbi Chatterjee, CSE, IIT Kanpur
- Dr. Kalidas Yeturu, CSE, IIT Tirupati
- Dr. Tharun Kumar Reddy Bollu, ECE, IIT Roorkee
- Dr. Abhishek Tewari, IIT Roorkee
- Dr. Saravana Kumar M, ECE, IIT Roorkee
- Dr. Dharmendra Singh, ECE, IIT Roorkee
- Dr. Sateesh Kumar Peddoju, CSE, IIT Roorkee
- Dr. Subhasis Bhattacharjee, CSE, IIT Jammu
- Dr. Narendra Chaudhari, IIT Indore
- Dr. Ayan Mondal, CSE, IIT Indore
- Dr. Puneet Gupta, CSE, IIT Indore
- Dr. Surya Prakash, CSE, IIT Indore
- Dr. Sameer Kulkarni, CSE, IIT Gandhinagar
- Dr. Jimson Mathew, CSE, IIT Patna
- Dr. Suman Kumar Maji, CSE, IIT Patna
- Dr. Srikant Srinivasan, School of Computing and Electrical Engineering, IIT Mandi
- Dr. Dileep A. D, IIT Mandi
- Dr. G. Shrikanth Reddy, IIT Mandi
- Dr. Anirban Sarkar, IIT Mandi
- Dr. Narendra Kumar Dhar, IIT Mandi
- Dr. Pratim Kundu, IIT Mandi
- Dr. Srinivas Pinisetty, Electrical Sciences, IIT Bhubaneswar
- Dr. Angshuman Paul, CSE, IIT Jodhpur
- Dr. Shivashankar B, CSE, IIT Guwahati
- Dr. S. V. Kulkarni, INAE Chair Professor, EE, IIT Bombay
- Dr. Subhananda Chakrabarti, EE, IIT Bombay
- Dr. Shabbir Merchant, EE, IIT Bombay
- Dr. Arun D. Mahindrakar, EE, IIT Madras
- Dr. Dhiman Mallick, EE, IIT Delhi
- Dr. M. Nabi, EE, IIT Delhi
- Dr. Nandakumar Nambath, EE, IIT Goa
- Dr. Chandan Kumar Sarkar, ETCE, Jadavpur University, Kolkata
- Dr. Sougata Mukherjea, Program Director, Cloud Center of Excellence, IBM GTS Technology Services, India

## Technical Committee

- Dr. R. Manimegalai, Professor, CSE, PSG Institute of Technology and Applied Research, Coimbatore
- Dr. V. Balamurugan, Professor, CSE, Manonmaniam Sundaranar University, Tirunelveli
- Dr. E. Sivasankar, CSE, NIT Trichy
- Dr. R. Malathi, Professor, EIE, Annamalai University, Tamil Nadu
- Dr. S. A. Khaparde, Professor, EE, IIT Bombay
- Prof. M. Arun, Executive Committee Member, IEEE Madras Section
- Mr. Jeeva S. Chelladhurai, CEO, Cosmorin, Bangalore
- Dr. Anasuya Threse Innocent, Director, BiniWorld Innovations, Bangalore
- Dr. G. Zayaraz, Professor, CSE, Pondicherry Engineering College, Puducherry
- Dr. P. K. Das, Professor, CSE, IIT Guwahati
- Dr. K. A. Abdul Nazeer, Professor, CSE, NIT Calicut
- Dr. S. D. Madhu Kumar, Professor, CSE, NIT Calicut
- Dr. Manju Khari, Professor, Ambedkar Institute of Advanced Communication Technologies and Research, Delhi
- Dr. M. P. Rajan, Professor and Dean, IIIT Kottayam [affiliation needs confirmation; the PDF also says "Delhi"]
- Dr. Shajin Nargunam, Director, Academic Affairs, Noorul Islam University, Kumaracoil
- Dr. P. Kumar, Centre for Information Technology & Engineering, Manonmaniam Sundaranar University, Tirunelveli
- Dr. P. Eswaran, Alagappa University, Karaikudi
- Dr. M. Marikkannan, CSE, Government College of Engineering, Erode
- Dr. Wilson Jeberson, Professor, CS & IT, Sam Higginbottom University of Agriculture, Technology and Sciences, Allahabad
- Dr. Asha Joseph, Professor, Amal Jyothi College of Engineering, Kerala
- Dr. Kunal Gagneja, SRM University, Delhi
- Dr. Vaishali R. Thakare, Cloud Security Architect (Microsoft BU), Tech Mahindra, Bangalore
- Dr. R. Jayanthi, VIT Chennai
- Dr. Suchitra, Professor, CSE, JAIN University, Bangalore

---


---

# Appendix B: Reference site notes (from https://icetite.vercel.app/)

- Header: ic-ETITE logo, BOLT logo linking to the BOLT page, nav items Home, Conference (dropdown), Expo'24, Visa, Contact. IEEE Madras and VIT logos sit in the top bar.
- Conference dropdown: Authors, Registrations, Speakers, Committee, Sponsorships, ic-ETITE'20.
- Home hero: full-width VIT background image, title, subtitle, "Technically co-sponsored by IEEE Madras Section", date and venue, Download Brochure button.
- Below the hero: a paper submission button plus a link list (final paper template, general information for registered authors, presentation instructions, IEEE PDF eXpress, IEEE copyright eCF, camera-ready submission, registration links for Indian and foreign authors).
- Content sections alternate text and image: About, Theme, Highlights of previous edition, About VIT, Ranking & Accreditation, About the School, About IEEE Information Theory Society.
- Footer: Technical Co-sponsor logo (IEEE Madras), Supported By logos (ACM, IEEE ITS, IEEE CS, IEEE Madras), social icons (Instagram, LinkedIn, Facebook, email), address, and brochure and NOC download buttons.
- The reference site is built with a framework, but this repo is plain HTML/CSS. Copy the look and layout only, not the technology.
- The existing 2024 links (CMT submission, Google Drive brochures, NOC) are 2024-specific. Do not reuse them for 2028.

# Agent Prompt: Build the ic-ETITE'28 Conference Website

Paste this whole document into your coding agent (Claude Code, Cursor, Copilot Agent, etc.) from the root of the cloned repo. Ask it to work **one step at a time** and stop for your review after each step.

---

## 0. Role and Goal

You are a senior front-end engineer. Upgrade the existing **ic-ETITE'24** website into the **ic-ETITE'28** website.

- **Repo to work in:** https://github.com/VIT-SCORE/ic-etite28.git
- **Reference site (structure and look to preserve):** https://icetite.vercel.app/
- **Content source:** the attached `writeup_updated_Sept22.pdf` (the content is reproduced in Appendix A of this document, so you do not need to open the PDF).

The reference site is a Next.js app (pages router, `next/image`, deployed on Vercel). Keep the same stack, layout, navigation and visual style. Change the **content and year**, add what is new, and fix the issues listed in Step 9.

## Ground rules

1. Inspect the repo first. Do not assume a folder layout, CSS approach or data format. Follow whatever is already there.
2. Do not add new dependencies unless you have to. If you do, say why.
3. Keep all changeable content (dates, fees, committees, topics) in data files under `data/` or `content/`, not hard-coded into JSX.
4. Never invent facts, names, links or numbers. If something is missing, insert a clearly marked `TODO:` placeholder and list it in the final report.
5. After each step, run `npm run build` (or the repo's equivalent) and confirm it passes before moving on.
6. Make one commit per step with a clear message, e.g. `step-3: rebrand home page to ic-ETITE'28`.

---

## Step 1: Audit the repository

1. Read `package.json`, `next.config.js`, the `pages/` (or `app/`) directory, `components/`, `public/` and any `data/` files.
2. Write `AUDIT.md` with: framework and version, styling method, the list of routes, where each page gets its content, and which strings and assets still say 2024 or 2020.
3. Compare the routes against the reference site. It should have: `/`, `/authors`, `/registrations`, `/speakers`, `/committee`, `/sponsorship`, `/icetite20`, `/bolt`, `/visa`, `/contact`.
4. Run `npm install` and `npm run dev`. Note any warnings.

**Done when:** `AUDIT.md` exists and the dev server runs. Stop and report.

---

## Step 2: Centralise conference data

Create `data/conference.js` (or `.json` or `.ts`, matching the repo) with:

```
name: "ic-ETITE'28"
edition: "Third"
fullTitle: "Third IEEE International Conference on Emerging Trends in Information Technology and Engineering"
dates: "10-11 February 2028"
venue: "Vellore Institute of Technology (VIT), Vellore, India"
cosponsor: "IEEE Madras Section"
supportedBy: ["ACM India Council", "IEEE Information Theory Society, VIT"]
organiser: "School of Computer Science Engineering and Information Systems (SCORE), VIT"
email: "icetiteconference@vit.ac.in"
submissionUrl: "https://easychair.org/conferences/?conf=icetite28"
```

Also add data files for: important dates, registration fees, topics, committees, previous editions (2020, 2024), and contacts. Use the values in Appendix A.

**Done when:** no page defines conference facts on its own; every page imports them from `data/`.

---

## Step 3: Home page (`/`)

Keep the existing hero and section order. Update:

1. **Hero:** "Welcome to ic-ETITE'28", subtitle "Third International Conference on Emerging Trends in Information Technology and Engineering", "Technically co-sponsored by IEEE Madras Section", "10-11 February 2028 at VIT Vellore, India".
2. **Buttons:** "PAPER SUBMISSION" links to the EasyChair URL. Keep "Download Brochure" but hide it if no brochure URL exists (do not link to the 2024 Google Drive file).
3. **Sections, in order:** About ic-ETITE'28, Theme of the Conference, Highlights of the Second ic-ETITE'24, Highlights of the First ic-ETITE'20, About VIT, Ranking & Accreditation, About SCORE, About IEEE Information Theory Society VIT, Manuscript Submission, Technical Co-sponsor and Supported By logos, Social links, Address.
4. **Address:** School of Computer Science Engineering and Information Systems, Vellore Institute of Technology, Vellore, Tamil Nadu, India 632014. The 2024 site says "School of Information Technology and Engineering", so replace it.
5. **Manuscript Submission text:** must mention plagiarism checking, no embedded links, scanned images, headers or footers, and that email submissions are not accepted.
6. Replace the 2024 "Important Dates" content (if present on the page) with the new dates from Step 2.
7. Remove the "Expo'24" nav item and add "Technext'28".

**Done when:** no "2024" remains on the home page except inside the "Highlights of ic-ETITE'24" section.

---

## Step 4: Navigation and site-wide changes

1. Update `<title>`, meta description and Open Graph tags to "ic-ETITE'28".
2. Header nav: Home, Conference (dropdown: Authors, Registrations, Speakers, Committee, Sponsorships, ic-ETITE'24, ic-ETITE'20), Technext'28, Visa, Contact, and the BOLT logo linking to `/bolt`.
3. Add a new route `/icetite24` using the 2024 highlights (Appendix A), modelled on the existing `/icetite20` page.
4. Footer: update the address, the email, and the social links. Keep the existing Instagram and Facebook links only if they are still valid; otherwise add `TODO:` placeholders.
5. Add a small "Important dates" strip on every page (or the home page only, if that matches the existing design).
6. Keep the site responsive at 360px, 768px and 1280px widths.

---

## Step 5: Authors and Registrations pages

**`/authors`**
- Paper submission link (EasyChair) as the primary call to action.
- Submission rules, including the plagiarism check and the formatting restrictions.
- The 2024 site linked to an IEEE final template, PDF eXpress guidelines and the IEEE copyright eCF. Keep these links only if they are valid for 2028. Otherwise leave `TODO:` placeholders.
- Note that extended versions of selected papers will be recommended to Scopus-indexed journals with impact factor.
- Render the **Important Dates** table:

| Milestone | Date |
|---|---|
| Full paper submission | 05 October 2027 (see Step 9) |
| Notification of acceptance | 04 November 2027 |
| Camera-ready paper with registration | 12 December 2027 |
| Conference | 10-11 February 2028 |

- Render **Topics** in four groups (Information Technology, Communication Engineering, Computer Engineering, Electronics Engineering) using the lists in Appendix A. Use a collapsible or multi-column layout so the page does not become one very long list.

**`/registrations`**
- Render the fee table from Appendix A with columns Category, Indian Authors and Delegates (INR), Foreign Authors and Delegates (USD).
- Add a note that IEEE-member rates require the member number to be shown.
- If the repo has registration links or payment instructions, keep them. Do not invent payment details. Add `TODO:` for missing ones.

---

## Step 6: Committee page (`/committee`)

Build this from data, not hand-written JSX.

1. Create `data/committee.js` with one array per group: Chief Patron, Patrons, Organizing Chair, Organizing Co-chair, Conference Chair, Publication Chair, Publication Co-chairs, Finance Chair, Finance Co-chair, Technical Programme Chairs, Publication Committee, Sponsorship Committee, Publicity and Media Committee, Registration Committee, BOLT 3.0 Hackathon, Technext'28 Expo Committee, Event Management Committee, Guest Care Committee, Conference Coordinating Committee, Executive Advisory Committee, International Advisory Committee, National Advisory Committee, Technical Committee.
2. Each person: `{ name, role, affiliation }`.
3. Use Appendix A as the source, but **deduplicate** (Step 9 lists the known repeats).
4. UI: group headings, a responsive card or list grid, and an optional client-side search box.
5. Show a "Contact" block near the top with the Conference Chair, Publication Chair and Finance Chair (names, emails, phone numbers from Appendix A).

---

## Step 7: Remaining pages

- **`/speakers`:** no 2028 speakers are named in the source. Show a "Speakers to be announced" state. Keep the 2024 layout so it can be filled from `data/speakers.js` later.
- **`/sponsorship`:** keep the existing structure. Add a `TODO:` for the 2028 sponsorship brochure. Optionally list 2024 partners (Intel, Cisco, Yellow.ai, Java Capital, Seed VC Innovation) under "Previous sponsors".
- **`/bolt`:** rebrand to BOLT 3.0 and list the coordinators from the source (Dr. J. Karthikeyan, Dr. Brijendra Singh, Dr. Krishnamoorthy N.). Keep 2024 stats (683 registrations for BOLT 2.0) as history. Do not invent 2028 prize or schedule details.
- **`/technext`:** create a simple page for Technext'28 (industrial expo and project competition). List the Expo committee from the source. Keep it minimal if there is no other information.
- **`/visa`:** keep the existing content. Do not link the 2024 NOC document. Add a `TODO:` for a 2028 one.
- **`/contact`:** email `icetiteconference@vit.ac.in`, the three chair contacts, and the address.
- **`/icetite20`:** leave as is, apart from fixing broken links.

---

## Step 8: Quality pass

1. **Accessibility:** every image has alt text, headings are in order, links are distinguishable, colour contrast is at least WCAG AA, and the dropdown menu works with a keyboard.
2. **SEO:** per-page titles and descriptions, `sitemap.xml`, `robots.txt`, canonical URLs.
3. **Performance:** use `next/image` with sizes, lazy-load below-the-fold images, and compress anything over 300 KB.
4. **Links:** run a link check. Every external link must resolve. List failures in the final report.
5. **Search for stale content:** `grep -ri "2024\|cmt3\|SITE\b"` and confirm each remaining hit is intentional.
6. **Lint and types:** run lint (and `tsc` if TypeScript is used) with zero errors.

---

## Step 9: Data problems in the source PDF (resolve, do not copy blindly)

Handle these explicitly and list your decisions in the final report:

1. **Submission date typo:** the PDF says "05 October 207" and other dates say 2027. Use **05 October 2027** and flag it for the organisers to confirm. Today (28 Sep 2026) is more than a year before that, so double-check that this is not meant to be a 2026 or a later 2027 date.
2. **Edition numbering:** the page title says "Third", the highlights sections say "Second ic-ETITE'24" and "First ic-ETITE'20". This is consistent, so use "Third" for 2028.
3. **Publication Chair inconsistency:** the contact table says Dr. Vijayan R is an Associate Professor, and the committee list says Professor, SITE. Use one value and flag it.
4. **Duplicate entries in the International Advisory Committee:** Raija Halonen, Victor Chang, Hector Jose Garcia-Ramirez, Mahasweta Sarakar, Mahesh Banavar, Seamus Ross, Hemin Barzan Abdalla, Deepak Puthal, Suvendu Mohapatra, Li Zhang, Carl Gustaf Jansson, Olabiyisi, Subbu Kumarappan, Antonella Tucci, Niket Tandon, Sathish Gopalakrishnan, Sujatha Krishnamoorthy, Rajinikumar Ramalingam, Chockalingam Letchumanan, Adhavan Ramasamy and V. Murugesh all appear twice. Keep one entry each.
5. **Duplicate entries in the National Advisory Committee:** P. Sakthivel, P. Subramanian, H. R. Mohan, K. V. S. Hari, S. V. Kulkarni, Arun D (Mahindrakar), Pabitra Mitra, Rajat Subhra Chakraborty, Dhiman Mallick, Nandakumar Nambath, Subhananda Chakrabarti, Chandan Kumar Sarkar, M. Nabi, Sougata Mukherjea and Shabbir Merchant are repeated. Keep one entry each and use the fuller version of the name and title.
6. **Possible affiliation error:** "Dr. M. P. Rajan, Indian Institute of Information Technology, Kottayam, Delhi". Flag it. Do not guess the correction.
7. **Other typos to fix without changing meaning:** "ViceChancellors" (Vice-Chancellors), "ACMMadras" (ACM Madras), "Dr.V.Murugesh" spacing, "Rs. 1,00, 000" (Rs. 1,00,000), "Sarakar" (confirm spelling), "Computation Intelligence" (probably "Computational Intelligence"; confirm).
8. **Rank claims:** copy the QS, ARWU and NIRF figures exactly as given in Appendix A. Do not update or embellish them.

---

## Step 10: Deployment and handover

1. Confirm `npm run build` and `npm start` work.
2. Deploy a Vercel preview and share the URL.
3. Write `README.md` covering: how to run the site, where to edit dates, fees and committees, how to add speakers, and how to deploy.
4. Write the final report: what changed per step, all `TODO:` items, all flagged data issues from Step 9, and any broken links.

**Definition of done:** the build passes, the preview is live, there is no unintended 2024 content, and every `TODO:` is listed in the report.

---

# Appendix A: Content from the PDF

## Event

- **Name:** Third IEEE International Conference on Emerging Trends in Information Technology and Engineering (ic-ETITE'28)
- **Sponsorship:** officially co-sponsored by IEEE Madras Section; supported by ACM India Council
- **Dates and venue:** 10-11 February 2028, VIT Vellore, India
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

# Appendix B: Reference site notes (from https://icetite.vercel.app/)

- Next.js pages-router app using `next/image` and hashed static media (e.g. `icetite.*.png`, `bolt.*.svg`, `downarrow.*.svg`).
- Header: ic-ETITE logo, BOLT logo linking to `/bolt`, and nav items Home, Conference (dropdown), Expo'24, Visa, Contact. IEEE Madras and VIT logos appear in the top bar.
- Conference dropdown: Authors, Registrations, Speakers, Committee, Sponsorships, ic-ETITE'20.
- Home hero: full-width VIT background image, title, subtitle, "Technically co-sponsored by IEEE Madras Section", date and venue, Download Brochure button.
- Below the hero: a paper submission button plus a link list (final paper template, general information for registered authors, presentation instructions, IEEE PDF eXpress, IEEE copyright eCF, camera-ready submission, registration links for Indian and foreign authors).
- Content sections alternate text and image: About, Theme, Highlights of previous edition, About VIT, Ranking & Accreditation, About the School, About IEEE Information Theory Society.
- Footer: Technical Co-sponsor logo (IEEE Madras), Supported By logos (ACM, IEEE ITS, IEEE CS, IEEE Madras), social icons (Instagram, LinkedIn, Facebook, email), address, and brochure and NOC download buttons.
- The existing 2024 links (CMT submission, Google Drive brochures, NOC) are **2024-specific**. Do not reuse them for 2028.

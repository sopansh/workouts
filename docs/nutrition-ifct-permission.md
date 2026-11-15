# IFCT 2017: how to ask ICMR-NIN for permission, and what to do if that fails

Status: **working pack for the owner. Nothing has been sent, nobody has been contacted, and no IFCT value is stored anywhere in this repo** (checked: no match for "IFCT" under `src/`, 2026-11-15). Part of the nutrition section, which is still a plan ([`nutrition-plan.md`](./nutrition-plan.md)). The home tile stays "Coming soon".

Written by the nutrition-coach agent, an AI assistant. **This is not legal advice.** I am not a lawyer and I have not checked Indian copyright law. Where the pack says what a sentence "means", it is a plain-words reading to help you write a clear request, not a legal opinion. If NIN's reply is long, conditional or asks you to sign an agreement, get a legal view before you sign.

All pages below were opened on **2026-11-15**. Each is listed with what I did and did not read in [section 8](#8-what-i-read-and-what-i-did-not-verify).

Contents

1. [What IFCT 2017 is and what its front matter says](#1-what-ifct-2017-is-and-what-its-front-matter-says)
2. [What the site needs, and why it is a "store electronically" question](#2-what-the-site-needs-and-why-it-is-a-store-electronically-question)
3. [Who to contact](#3-who-to-contact)
4. [Step-by-step procedure](#4-step-by-step-procedure)
5. [Draft permission-request letter](#5-draft-permission-request-letter)
6. [Fallbacks if permission is refused or never answered](#6-fallbacks-if-permission-is-refused-or-never-answered)
7. [Decision table for the owner](#7-decision-table-for-the-owner)
8. [What I read, and what I did not verify](#8-what-i-read-and-what-i-did-not-verify)

**The short version.** The IFCT 2017 book says you may use and share its data, and may copy it for personal use with acknowledgement, but may not store or reproduce any part of it "in any electronic format for creating a product" without NIN's prior written permission. Typing IFCT values into this site's data files, in a public Git repository, is storing them electronically and, in effect, publishing them to anyone. So we need written permission before any IFCT number goes into the repo. If NIN says no, or does not answer, the site can still ship Japanese food values (the Japanese ministry says no permission is needed), general foods from USDA FoodData Central (public domain, CC0), and Indian food content that has no numbers on it. India-specific food values wait.

---

## 1. What IFCT 2017 is and what its front matter says

### 1.1 What it is

- **Title:** *Indian Food Composition Tables 2017*. Authors: T. Longvah, R. Ananthan, K. Bhaskarachary, K. Venkaiah.
- **Publisher:** National Institute of Nutrition (NIN), Hyderabad, which is part of the Indian Council of Medical Research (ICMR), Department of Health Research, Ministry of Health and Family Welfare, Government of India. Often written ICMR-NIN.
- **Citation the book asks for** (PDF page 3): "Longvah, T., Ananthan, R., Bhaskarachary, K. and Venkaiah, K. (2017). Indian Food Composition Tables 2017, National Institute of Nutrition, Indian Council of Medical Research, Hyderabad, Telangana, India."
- **Content, from the book's own pages:** 528 foods and 151 food components (Preface, printed page i; the Table of Contents lists twelve tables, for example proximate principles and fibre, water-soluble vitamins, fat-soluble vitamins, minerals, fatty acids, amino acids). Values are per 100 g edible portion, mean with standard deviation, and "all data except for poultry and egg pertains to raw food" (General information, printed page xx; the Preface says "except for eggs", a small difference in the book). Each food has a "unique four character alphanumeric identification code" (printed page xx).
- **Where the public copy is:** the NIN-hosted PDF, `https://www.nin.res.in/ebooks/IFCT2017_16122024.pdf` (585 PDF pages; file name carries 16 December 2024, and the PDF's own modified date is 16 December 2024). It is linked from the NIN home page under "IFCT - 2017 / Download PDF Copy". The NIN home page also links a "Concise Copy" and a "Full Copy" of "IFCT, NVIF-2017" that are viewers of a document hosted elsewhere; I did not open those documents.
- **Not to be linked:** `www.ifct2017.com`, the web address printed in the book, redirected to an unrelated site (`animeupdate.nl`) when I tested on 2026-11-15. A NIN page (`analytical.html`) still links to it. Never link it from this site.

### 1.2 The permission statement, verbatim

Location: **PDF page 3 of `IFCT2017_16122024.pdf`**. This is the unnumbered copyright page, after a blank PDF page 1 and the title page. It sits under "Copyright © 2017 by National Institute of Nutrition, Indian Council of Medical Research", above the editor credit. I read the PDF text directly, not a summary.

> The use and dissemination of the data in this book is encouraged. This publication can be reproduced for personal use with full acknowledgment of the source. However, no part of this publication can be stored or reproduced in any electronic format for creating a product without the prior written permission of the National Institute of Nutrition, Hyderabad.

The same page carries a disclaimer: "The National Institute of Nutrition (NIN) has exercised great care and diligence to ensure that the data provided in the food composition tables is as correct and accurate as possible. NIN makes no warranty of the data and in no event shall be held liable for any incidental or consequential event arising from the use of the data."

I searched the front matter (PDF pages 1 to 45) for "permission", "copyright", "licence", "electronic", "reproduce", "software" and "database". The only other relevant sentence is on printed page xxiii (PDF page 30): "The region specific database is available in the electronic version at the National Institute of Nutrition (NIN)... individuals seeking local specific nutrient data are encouraged to obtain region specific data from NIN." That tells us NIN holds an electronic version and invites enquiries about it. The book gives no licence name, no fee, no application form and no procedure for asking permission.

### 1.3 What the statement does and does not forbid, in plain words

| Question | Plain reading | Certainty |
|---|---|---|
| Is using the data encouraged? | Yes. "Use and dissemination of the data ... is encouraged." | Clear |
| May I copy it for myself? | Yes, "for personal use with full acknowledgment of the source". | Clear |
| May I keep a downloaded copy of the PDF on my computer to read? | That is personal use, so yes on the wording. | Reasonably clear |
| May I put values into data files, a database or a website, which is "a product"? | Not without **prior written** permission from NIN. | Clear for storing in files for a product |
| Is a public website "a product"? Is a free hobby site "a product"? | The book does not define "product", "electronic format" or "personal use". A free, non-commercial site may or may not count. The cautious reading is that it does. | **Unclear. A legal question** |
| Is quoting one number in a sentence, with a citation, a breach? | The book does not say. Quoting is also a question of Indian copyright law (for example whether a short quotation is allowed), which I have not researched. | **Unclear. A legal question** |
| Does the statement give anyone a licence like CC BY? | No. There is no open licence. Everything beyond personal use is "ask first". | Clear |
| Does "prior" matter? | Yes. Permission must come **before** the values are stored. A later "that's fine" does not undo a storage that has already happened. Do not assume silence means yes. | Clear on the wording |
| Does the disclaimer limit NIN's liability? | Yes, NIN gives no warranty. It does not give us any right to use the data. | Clear |

---

## 2. What the site needs, and why it is a "store electronically" question

### 2.1 The use, stated exactly

This is the scope the request should describe. It is deliberately small. Change the bracketed numbers only if you decide on a different scope, and change the letter to match.

| Element | The request |
|---|---|
| Site | workouts.theroningamer.com, a free educational site about training and nutrition for healthy adults. Hobby project, **[owner to confirm: no advertising, no sales, no affiliate links, no paid tier]**. `CONTEXT.md` calls it a hobby/personal project and the nutrition plan forbids affiliate links and endorsements, but I did not find a written statement that the site carries no advertising, so confirm it before you say so to NIN |
| Data used | Mean values per 100 g edible portion, **rounded**, for **up to [60] foods** (the plan's first scope is about 40 Indian foods, so 60 leaves room to swap foods). **Up to [12] nutrients**: energy, protein, fat, carbohydrate, fibre, and a short list of minerals and vitamins that the nutrient pages discuss. Not the full tables, not amino acids or fatty acids, not the bioactive tables |
| Identification kept | Food name, IFCT food code, state (raw, as the book gives it), edition (2017) |
| Derived use | Meal and day totals computed from those values for example menus, labelled as computed from IFCT 2017 |
| Where it appears | Public pages on the site, each with the citation above and a link to the NIN-hosted PDF. Not the full table on any page |
| Where it is stored | Values typed into YAML data files inside the site's **public GitHub repository** (`github.com/sopansh/workouts`), which Astro turns into static pages at build time |
| What is **not** requested | Bulk or complete reproduction, a downloadable dataset, an API, an app, a calculator that exposes the data, sale or paid use, or any suggestion that NIN endorses the site |

### 2.2 Why this is a "store electronically ... for creating a product" question

- Typing a value into a `.yml` file stores it in an electronic format. That file is the raw material of the website, which is the "product".
- The statement's "personal use" exception does not fit a public website, because the pages are for readers and not for the owner alone.
- Citing the book in a sentence of prose is a separate and weaker question (section 1.3, last rows).

### 2.3 Be honest about the public repository

**Putting values in a public Git repository is effectively redistribution.** Anyone can read, copy, clone or mirror the repo, and the history keeps every earlier version, so deleting a value later does not make it disappear. The repo has no `LICENSE` file (checked 2026-11-15), so I cannot point NIN to a licence that limits what others do with the repo's contents. **The request must say this plainly**, and ask NIN to say whether storing in a public repository is covered. The draft letter does.

If NIN will allow display on the site but not redistribution, that is a workable partial answer, handled in step 12 and in the decision table (private data store, a platform decision for the executive; I have not checked how the Netlify build could read private data).

### 2.4 Form of permission to request

Ask for a **written reply**, either a signed letter or an email from an identifiable NIN officer, that says all of the following. If any item is missing in the reply, ask again for it.

1. **Who grants it:** NIN (ICMR-NIN), and the officer's role.
2. **Who receives it:** the site and its owner, named in the letter.
3. **What is permitted:** the scope in section 2.1, in the reply's own words or by reference to your letter.
4. **Whether storing in a public repository is permitted**, yes or no.
5. **Attribution wording** NIN wants, if any.
6. **Conditions**, fees (none is the request), term (open-ended or a date), and whether it can be withdrawn and how.
7. **Which edition:** IFCT 2017 only, or later editions as well.
8. **Anything the reply expects from us** (a link, a copy of the page, a report of use).

---

## 3. Who to contact

I found these on NIN's own pages. I did not write to anyone, so **I cannot say which address is read or who handles permissions.** No page I read names a copyright or permissions desk for IFCT.

### 3.1 Current official contact details (NIN contact page, read 2026-11-15)

Source: `https://www.nin.res.in/contactus.html` (ICMR - National Institute of Nutrition).

| Item | As shown on the page |
|---|---|
| Postal address | ICMR - National Institute of Nutrition, Beside Tarnaka Metro Station, Jamai-Osmania PO, Hyderabad-500 007, India |
| General email | The visible text reads `nin@nic.in`, but the link behind it points to `nin@ap.nic.in`. **The page contradicts itself.** The book (2017) printed `nin@ap.nic.in` |
| Director's office email | `director.nin@icmr.gov.in` (a role address on the page) |
| Enquiry phone | +91-40-27197200 |
| Publications phone | +91-40-27197345 |
| Fax | +91-40-27019074 |

### 3.2 Printed in the book (2017), not confirmed as current

- Email `nin@ap.nic.in` (matches the link on the current page) and `ifct2017@gmail.com`. The second address is **not on any current NIN page I read**, and I cannot confirm it is monitored. Do not rely on it. At most, copy it.
- Telephone +91 40 27197334 and website `www.ninindia.org`. I did not test these.
- `www.ifct2017.com` is dead for our purpose (section 1.1).

### 3.3 Other routes I found, and what they are not

- The ICMR headquarters contact page (`https://www.icmr.gov.in/contact-us`, New Delhi) lists a single informatics and data-centre contact for the ICMR website. It is **not** an NIN or copyright desk. Use it only as an escalation if NIN never answers, and say why you are writing. Its "Term & Conditions" and "Website Policies" links are about the ICMR website, not the IFCT book; I did not open them.
- NIN's Right to Information page is for requests for official information, not permission. I did not use it.
- The NIN home page carries a warning about "fake emails/calls requesting payment ... in the name of ICMR-NIN" and says to verify announcements at `https://www.nin.res.in/`. **Use only contact details from nin.res.in, and do not pay anyone for "permission" without confirming by phone on the number above.**

### 3.4 Recommended route

1. **Phone the Enquiry or Publications number first** (+91-40-27197200 or +91-40-27197345) to ask: "Who handles requests for permission to use data from the Indian Food Composition Tables 2017, and which email address should I write to?" Note the date, time and what they said. Office hours are not stated on the page I read; India Standard Time is UTC+5:30.
2. **Email the address they give you.** If they give none, email `nin@ap.nic.in` (the link target on the current page and the 2017 printed address), and copy `nin@nic.in` (the visible text) and `director.nin@icmr.gov.in`. A bounce costs nothing.
3. **Address the letter to "The Director, ICMR-National Institute of Nutrition"**, because the book says permission comes from "the National Institute of Nutrition, Hyderabad". If the phone call names a person or desk, address that instead.
4. **Posting a signed paper copy** to the postal address is a slower but valid back-up if email gets no reply.

---

## 4. Step-by-step procedure

For someone who has never done this. Do the steps in order. "Record" steps go in a **private** place (a folder or mailbox of your own), not in this repo.

### Prepare

1. **Decide the scope.** Read section 2.1 and confirm or change the bracketed numbers (foods, nutrients). Confirm the site has no advertising, sales or affiliate links, because the letter says so.
2. **Make the food list (Annex A of the letter).** Open the NIN PDF (`https://www.nin.res.in/ebooks/IFCT2017_16122024.pdf`). Use the index (printed page 501) and the Table of Contents to find each food. For each, write the **IFCT food code and food name exactly as printed**. Do **not** copy any nutrient value. The plan's first-pass Indian food list (names only) is in `nutrition-plan.md` section 6.4. Start there. Stop at the number you decided in step 1. (Reading the PDF to pick names is personal use.)
3. **Make the nutrient list (Annex B).** Pick the nutrients and the tables (Table 1, 2, 3 or 5 in the Table of Contents) they come from. Check each is in the tables.
4. **Check the site facts the letter states:** the site address, that the repo is public, and that the repo has no `LICENSE` file. If you add a licence to the repo before writing, say so in the letter.
5. **Prepare your private details** for the letter's placeholders (name, organisation if any, postal address, email, phone). Keep the completed letter **outside the repo**.

### Send

6. **Phone** (section 3.4, step 1). Record the date, time, the number you called, and what you were told. Ask whether they want a letter by post, by email, or both.
7. **Complete the draft letter in section 5** in a private copy. Replace every bracket. Check that nothing in the letter is a personal or medical detail beyond what is needed to contact you. Attach Annex A and Annex B. Convert to PDF if you wish.
8. **Send it** by the route from step 6 (section 3.4, steps 2 to 4). Put "Request for permission to use IFCT 2017 data" in the subject. Ask for a read receipt if your mail program offers one. **Keep a copy of exactly what you sent, with the date and the addresses used.**

### Wait and follow up

NIN publishes no response time that I could find, so the intervals below are **my suggestion, not a rule**:

9. **After 14 days with no reply:** send a short polite follow-up to the same addresses, quoting the first email's date and subject.
10. **After 28 days:** phone the Enquiry or Publications number, say you sent a request on [date] and ask who has it. Note the answer. Ask if it should be re-sent to a named person.
11. **After about 90 days with no reply** after the follow-ups: treat it as **no answer**. Do **not** treat silence as permission. Follow section 6 (fallbacks) and set a date to revisit (section 7). You may, once, write to the ICMR headquarters contact (section 3.3) with a short note and your first letter attached.

### Handle the reply

12. **Read the reply against the checklist in section 2.4.** Then act as follows. Whatever the answer, **store no IFCT value until the permission is in your hands in writing.**

| What NIN says | What you do |
|---|---|
| **Full permission** for the scope in the letter, including the public repo | Save the reply privately. Record it (steps 14 and 15). Tell the executive and the nutrition coach, who can then start the India food data under the plan's phase 4, inside the stated scope and wording |
| **Permission to display on the site, but no redistribution, so not in a public repo** | This is a partial permission. Do not put values in the public repo. Ask the executive whether the site can be built from a private data store (a platform question I cannot answer). If it cannot, treat it as "not granted" for now and keep the request on file |
| **Permission for fewer foods or fewer nutrients** | Accept only that scope. Record the exact list. The guardrail at the end of this section would check it. You may ask once for more later |
| **Permission with conditions** (attribution wording, a link, a disclaimer, a review of pages) | Add them to the permission record. Pass them to the nutrition coach, who will build them into the page text. Check they can be met |
| **A fee, or an agreement or form to sign** | Do not pay or sign yet. A fee or a contract is a new commitment and needs the owner's decision, and probably a legal view. Ask NIN for the terms in writing |
| **A pointer to an official electronic file or a different route** | Ask what its terms are. An official file would be better than retyping from the PDF (fewer transcription errors), but the same permission questions apply |
| **A refusal** | Thank them, save the reply, record "refused" with the date. Go to section 6. You may ask once what use *would* be acceptable (for example links only) |
| **A reply that is unclear** | Write back with the specific question: "Does this cover storing the values in a public GitHub repository, yes or no?" |

13. **Reply with thanks** and confirm in a sentence what you understand the permission to be. This closes any gap in wording.

### Record

14. **Private record (kept by the owner, outside the repo):** the letter as sent, the reply as received, the phone-call notes, the dates, and the addresses used. This is the **reference the owner holds privately**.
15. **Public record in the repo (no personal details).** Suggested: create `docs/nutrition-data-permissions.md` when there is something to record, with one row per data source:

    | Source id | Status | Asked on | Reply on | Scope granted, in plain words | Conditions and attribution wording | Review date | Reference |
    |---|---|---|---|---|---|---|---|
    | `ifct-2017` | not asked / asked / granted / partial / refused / no reply | date | date | for example "up to N foods, the listed nutrients, display on the site and storage in the public repo" | text to print | date | "held privately by the owner" |

    **Do not record** in the repo: your name, email, address or phone; the names, emails or phone numbers of NIN staff; the letter or the reply text; or any signature. The `docs/` folder is not published on the site but **it is in a public GitHub repo, so anyone can read it**. Only the date, the scope, the conditions you must follow, and the words "held privately" belong there.

16. **Field on the source entry (needs the executive).** Once the `database` source type exists (plan section 5.3), the IFCT entry in `src/content/sources.yml` would carry a block such as:

    ```yaml
    permission:
      status: granted        # not-needed | not-asked | asked | granted | granted-partial | refused | no-reply
      on: 2027-01-20         # date of the written permission
      scope: "up to 60 foods; listed nutrients; display on the site and storage in the public repository"
      conditions: "attribution wording in docs/nutrition-data-permissions.md"
      reference: "held privately by the owner"
    ```

    Dates and wording are examples only. **That field does not exist yet.** The source schema (`src/content.config.ts`) and the validator are executive-owned, so this is a request, not something I added.

### Guardrail to build later

A validator rule (executive-owned): fail the build if any food record whose `database` source has `permission.status` other than `granted` or `granted-partial` is present, or if the number of IFCT foods exceeds the granted scope. This stops values going in before permission exists. Listed under Requests in my report.

---

## 5. Draft permission-request letter

Fill a **private** copy. Square brackets are placeholders. Keep it to about one page plus the two annexes. British spelling. No personal or medical details.

---

**[Date]**

To
The Director
ICMR-National Institute of Nutrition
Jamai-Osmania PO, Hyderabad - 500 007, India

By email to: [address(es) used] **and** [by post, if sent]

**Subject: Request for permission to use limited data from the Indian Food Composition Tables 2017 on an educational website**

Dear Sir or Madam,

I write to ask for the National Institute of Nutrition's written permission to use a small, defined set of values from *Indian Food Composition Tables 2017* (Longvah T, Ananthan R, Bhaskarachary K, Venkaiah K; NIN, ICMR, Hyderabad), as set out below.

**Who I am.** [Full name], [an individual / on behalf of organisation name], [postal address], [email], [phone]. I run workouts.theroningamer.com, a free educational website about strength training and general nutrition for healthy adults. It is a [personal, non-commercial] project. It carries [no advertising, no paid content and no affiliate links]. It does not give medical advice, and its pages say so.

**What I would like to do.** The site plans a section on food and nutrition for people in India. I would like to show a limited set of IFCT 2017 values for Indian foods, with full acknowledgement, so that readers can see the protein, energy and other nutrient content of everyday foods such as cereals, millets, pulses, dairy and vegetables, and so that sample menus have traceable numbers. The values would be shown only as follows:

- **Foods:** up to [60] foods, listed in Annex A by IFCT food code and name.
- **Nutrients:** up to [12] nutrients per food, listed in Annex B, as mean values per 100 g edible portion, rounded. I would not reproduce the full tables, amino acid, fatty acid, polyphenol or other bioactive data.
- **Calculations:** totals for sample meals, calculated from those values and labelled as calculated.
- **Citation:** every page that shows a value would cite the book in the form your copyright page asks for, name the 2017 edition, say that foods are raw as the tables state, and link to the PDF hosted on nin.res.in. [I will use any acknowledgement wording you prefer.]
- **No endorsement:** the site would not suggest that NIN or ICMR endorses it or reviewed it.

**Why I am asking.** Your copyright page says that no part of the book "can be stored or reproduced in any electronic format for creating a product without the prior written permission of the National Institute of Nutrition, Hyderabad." Entering values into the site's data files stores them in an electronic format, so I am asking before I do so.

**One point I want to state clearly.** The site's data files are kept in a **public** code repository (github.com/sopansh/workouts). Anyone can therefore read and copy the stored values, so storing them there is in effect publishing them. I want you to know this before you decide. I would ask you to tell me whether storing the values in that public repository is acceptable. If it is not, but display on the website is, please say so, and I will keep the values out of the public repository.

**What I would be grateful if you could tell me, in writing:**

1. Whether NIN permits the use described above, in full or in part, and for which foods and nutrients.
2. Whether storing the values in a public repository is permitted.
3. Any wording of acknowledgement you require, and any other conditions or fee. I am not asking for any exclusive right.
4. Whether the permission covers only the 2017 edition or also later editions.
5. Whether NIN can supply the electronic version mentioned on page xxiii of the book, and on what terms, as that would let me avoid retyping errors.

I will not use any IFCT value on the site or in its repository until I have your written reply. If you decline, or if the scope has to be smaller, I will follow your decision. If NIN later asks me to remove any value, I will do so promptly.

[Optional courtesy note: the website address printed in the book, www.ifct2017.com, redirects to an unrelated site when I tried it on [date], and your Analytical Services page still links to it. I mention it in case it is useful to your team.]

Thank you for your time and for making the tables publicly available. I would be glad to send a draft page showing exactly how the values would appear.

Yours faithfully,

[Full name]
[Role or "owner, workouts.theroningamer.com"]
[Email] · [Phone] · [Postal address]
Site: https://workouts.theroningamer.com

**Annex A: Foods requested** (IFCT food code and food name exactly as printed in the book; no values)

| IFCT food code | Food name as printed |
|---|---|
| [code] | [name] |
| [add rows up to the number requested] | |

**Annex B: Nutrients requested** (with the IFCT table that lists each)

| Nutrient | IFCT table |
|---|---|
| Energy, protein, fat, carbohydrate, dietary fibre | Table 1 |
| [minerals, for example calcium, iron, zinc, magnesium, sodium, potassium] | Table 5 |
| [vitamins, if requested] | Table 2 or 3 |

---

Notes on the letter, for the owner (delete before sending):

- The only facts it states about NIN's book are quoted from PDF page 3 and page xxiii of the NIN-hosted PDF. Re-read them against the PDF before you send.
- The courtesy note about the dead web address is optional and true as of 2026-11-15. Re-test the address before you send it.
- Do not add anything about health claims, diets, medical conditions or yourself beyond contact details.

---

## 6. Fallbacks if permission is refused or never answered

What each alternative **allows**, from the terms I opened on 2026-11-15. Anything I could not confirm is marked **unverified**.

### 6.1 The alternatives

| Source | What I read | What it allows | Limits and unverified points |
|---|---|---|---|
| **MEXT, Standard Tables of Food Composition in Japan** (8th revised edition 2020, Supplement 2023, errata 27 March 2026) | Index page `https://www.mext.go.jp/a_menu/syokuhinseibun/` (Japanese), the MEXT Q&A PDF dated March 2026 (令和8年3月, `https://www.mext.go.jp/content/20230428-mxt_kagsei-index_020.pdf`), the food-database help page (`https://fooddb.mext.go.jp/help.html`), and the tables page (`mext_00001.html`) | The index page says the tables are a council report published openly and that the food composition data **"can be used freely"** (「食品成分データは、ご自由に利用して頂けます」). For secondary use in papers, books and apps, state the source as 「日本食品標準成分表（八訂）増補2023年から引用（又は出典）」. Q&A 1-11 asks whether permission is needed to make books or apps from the tables and answers that MEXT does **not** require any permission or licensing procedure for using part or all of them, and asks users to make the source name ("八訂成分表") clear to readers. The ministry offers the data as Excel files | The reading is mine (translation, not legal). It is a ministry statement, **not a formal open licence** such as CC BY, so it does not say whether a public Git repository is covered; I would still keep to a limited, cited set. The online database at `fooddb.mext.go.jp` is a trial release; cite the MEXT publication, not the database. I did **not** open the Excel files, the 2020 book's front matter, or MEXT's website-wide terms. Contact is email only (`kagseis@mext.go.jp`, from the database contact page) |
| **USDA FoodData Central** (Foundation Foods and Branded, October 2026; SR Legacy, April 2018; FNDDS 2021 to 2023) | The FoodData Central home page and API guide, "Licensing" block (`https://fdc.nal.usda.gov/`), the FAQ and the download page | "USDA FoodData Central data are in the public domain and they are not copyrighted. They are published under CC0 1.0 Universal (CC0 1.0). No permission is needed for their use, but we request that users list FoodData Central as the source ... and, when possible, notify us of the product that uses the data." A suggested citation is given on the page | The FAQ describes SR Legacy as the primary food composition data type **for the United States**, so values describe US foods, not Indian varieties or home cooking. My spot check on 2026-11-15, nine search terms in SR Legacy and Foundation only, using the public demo key, found pigeon peas (red gram), chickpeas, chickpea flour (besan), lentils, sorghum and "Butter, Clarified butter (ghee)", found "millet" entries without a finger-millet (ragi) or pearl-millet label, and found **no paneer**. That is not a coverage audit. I did not check Branded or FNDDS for these, and I did not check whether any one data type carries extra terms. Do not put an API key in the repo: the API guide says keys found in a code repository are deactivated. Use the download files, which need no key |
| **UK Composition of Foods Integrated Dataset (CoFID)**, 2021 update, Public Health England | The gov.uk page (`https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid`), last updated 19 March 2021 | The page footer says "All content is available under the Open Government Licence v3.0, except where otherwise stated". The INDB paper says it filled gaps from UK tables, which "include a large range of Indian foods" | I did not open the OGL text or the dataset files, so I cannot state the attribution wording. I did not check which Indian foods it holds (the INDB statement is theirs). It is a UK food-supply dataset |
| **Indian Nutrient Databank (INDB)**: Vijayakumar et al. 2024, doi:10.1016/j.cdnut.2024.103790, Curr Dev Nutr (Crossref-checked 2026-11-15, title matches; **a 2025 corrigendum exists**, doi:10.1016/j.cdnut.2025.107450, whose content I did not read) | The paper's full text on Europe PMC (PMC11277795) and the GitHub repository `lindsayjaacks/Indian-Nutrient-Databank-INDB-` (API and README) | The **article** is CC BY 4.0, and the data statement says the analysis code and files are "publicly and freely available on GitHub". That is the only licence I found | **It does not solve the NIN question.** The paper says its food data are "primarily derived" from IFCT 2017. The repo has **no licence file** (GitHub API: no licence; `LICENSE` returns 404). Its README says IFCT 2017 and 2004 "must be requested from the original source", so the raw NIN tables are not included, but the repo's `INDB.xlsx` holds recipe values built from them. I did not open `INDB.xlsx`. I cannot say whether the INDB authors obtained NIN permission. CC BY on a paper does not license a dataset in the repo. **Treat INDB as unusable for values** until the repo states a licence and a lawyer or NIN says IFCT-derived values are covered. You may ask the corresponding author, named in the paper, what the data licence is |
| **Open Food Facts** (label-style data on packaged foods) | `https://world.openfoodfacts.org/terms-of-use` | Three licences: the Open Database Licence (database), the Database Contents Licence (contents), and CC BY-SA (images). It says these allow use and reproduction for all purposes, including commercial, under conditions, "especially the attribution and the sharing under the same condition of derivative works" | **Share-alike** may bind a database we build from it. Entries are contributed by the public; I did not assess accuracy. The site's own rule is no brands. **Not recommended**; listed so the option is on record |
| **Values copied from a pack label** | Not researched | **Unverified.** I did not look up whether copying a manufacturer's label values onto a public page is allowed, nor what Indian labelling rules say about reuse | Packs are brands, and the site has a no-brand rule. The plan allows a label value only if flagged `valueTier: label` and as a generic category. Treat as a last resort, and ask a lawyer first |
| **Other NIN publications** (RDA and EAR 2020 brief note, Dietary Guidelines for Indians 2024, NVIF) | The six-page RDA brief note: no reuse statement in it | **Unverified** for the full RDA report, the Dietary Guidelines and NVIF, whose front matter I did not read | The same permission question **may** apply when we store NIN reference-intake numbers. Check each document's front matter before storing a number from it |

### 6.2 What can ship without IFCT

| Can ship, no IFCT value needed | Notes |
|---|---|
| Nutrition hub, scope, safety and referral pages, tracking and the plate method | No food values. As in the plan, phases 2 and 3 |
| Goal pages and diet-pattern pages (omnivore, vegetarian, vegan and others, with cultural respect) | Qualitative, with graded claims from the evidence table |
| Indian foods **by name and role** (for example "pulses and dairy as vegetarian protein sources") with **no numbers**, plus qualitative guidance on oil, ghee and portion building | Do not copy phrases or findings from IFCT. Where a statement rests on the book, cite it and say no value is shown. Whether even that needs permission is a legal question (section 1.3) |
| **Japanese foods with values** from the MEXT tables, cited as the ministry asks | See 6.1. Open and read the tables and the 2020 front matter first |
| General foods and some Indian staples from **USDA FoodData Central** (CC0), cited with the dataset type and identifier | Labelled "US food data", never as Indian values. Do not mix with MEXT inside one meal without a visible note (plan section 5.4) |
| Vitamins, minerals and supplement pages | Their numbers come from EFSA, NIH and the Japan DRI, not from food tables. Their licences are a separate check I have not done |

| Must wait | Why |
|---|---|
| Indian food values (energy, protein, micronutrients) from IFCT 2017 | The permission statement |
| Indian recipe and dish totals built from IFCT | Same, and INDB is not a clean substitute |
| Any statement of the form "100 g of X has N g of protein" for an Indian food, taken from IFCT or INDB | Same |
| Any use of IFCT-derived numbers from third-party sites or apps | They may be copies of the same data, with no permission trail |

---

## 7. Decision table for the owner

You have already decided: ask NIN; if that is not possible, skip it and keep it for later. This table sets out the timing choices and what each does to the phases in [`nutrition-plan.md`](./nutrition-plan.md) section 7. I have **not** edited the plan; changes shown here are proposals.

| Option | What it means | Effect on the phases | Risk |
|---|---|---|---|
| **A. Ask now, and carry on with everything else (my recommendation)** | Send the letter this month. Phases 1 to 3 and 5 to 7 proceed without waiting. Phase 4 is split in a proposal: **4a Japan** (MEXT, can proceed once its tables and front matter are read) and **4b India** (waits for NIN) | Phase 1 (research completion) includes the licence item, so this closes it. Phases 2, 3, 5, 6 and 7 use no food values and are unaffected. Phase 4a is unblocked; 4b is blocked until a written answer. Phase 8 (tile live) does not need India values, but the India food page would say "values to follow" | A request made with no live pages to show is slightly weaker, but costs nothing. NIN may take long or never reply |
| **B. Ask now, and hold all of phase 4 until NIN replies** | Same letter, but do not start Japan data either | Delays Japan values with no gain, since MEXT does not depend on NIN | Wasted time. Not recommended |
| **C. Skip IFCT for now and ship without India values** | Do not write; record "not asked" with a revisit date | Phases 1 to 3, 4a and 5 to 8 proceed. India foods stay by name only, as in section 6.2, or use USDA values labelled as US data | India section is thinner and may feel incomplete next to Japan. The permission question stays open and costs time later |
| **D. Wait until some pages are live, then ask** | The request can show real pages and how values would appear | Same as C for now; phase 4b starts later | Pages that show IFCT values must not go live before permission, so this only delays |
| **E. Use USDA, CoFID or INDB for Indian values instead** | Replace IFCT in the plan | Needs a plan change: the plan names IFCT as the primary Indian database. Needs the owner's approval | USDA and CoFID values are not Indian samples. INDB is not clean (section 6.1). Mixing databases needs a visible note on every meal |

**If you choose C or D, or the answer is refused or silent, revisit when any of these happens:** you have live pages to show NIN; about six to twelve months pass (my suggestion); NIN publishes a data-licence or terms page; a new IFCT edition appears; or a lawyer says a small, cited set of rounded values is acceptable without permission. Record the revisit date in `docs/nutrition-data-permissions.md`.

**Never** publish IFCT values while the answer is pending or unknown.

---

## 8. What I read, and what I did not verify

### 8.1 Sources opened (all on 2026-11-15)

| Source | URL | What I read |
|---|---|---|
| IFCT 2017 PDF, NIN-hosted | `https://www.nin.res.in/ebooks/IFCT2017_16122024.pdf` | PDF pages 1 to 8 as text; a keyword search of PDF pages 1 to 45; printed pages xx to xxiii; the verbatim permission statement (PDF page 3) |
| NIN contact page | `https://www.nin.res.in/contactus.html` | Address, phones and both email addresses, including the self-contradiction in section 3.1 |
| NIN home page, publications page, IFCT viewer pages, `analytical.html`, `downloads.html`, `library.html` and others | `https://www.nin.res.in/` and sub-pages | Link lists and text for IFCT, the fake-email warning, the dead `ifct2017.com` link. No page gives a copyright or permissions procedure |
| `www.ifct2017.com` | as printed in the book | Redirected to an unrelated site |
| ICMR headquarters contact page | `https://www.icmr.gov.in/contact-us` | Page text (an IT contact; footer links named but not opened). My fetch tool showed only a "Bad Request" message, but `curl` returned the full page and I read the contact block from that |
| MEXT food tables index, tables page, Q&A PDF, food-database pages | URLs in 6.1 | Japanese text on use and citation, Q&A 1-11, database contact page |
| USDA FoodData Central | `https://fdc.nal.usda.gov/`, `/api-guide/`, `/faq/`, `/download-datasets` | Licensing block (CC0 1.0), API key and rate-limit text, nine-term spot search through the public API demo key |
| gov.uk CoFID page | URL in 6.1 | Title, dates and site-wide licence footer |
| INDB paper and repository | PMC11277795; GitHub `lindsayjaacks/Indian-Nutrient-Databank-INDB-` | Licence and data-availability text; README; file list; licence check |
| Open Food Facts terms | `https://world.openfoodfacts.org/terms-of-use` | The licence section |
| NIN RDA brief note | `https://www.nin.res.in/rdabook/brief_note.pdf` | Searched six pages for reuse terms; none |

**Crossref:** the only paper cited, Vijayakumar et al. (doi:10.1016/j.cdnut.2024.103790), resolves, the title and year match (issued July 2024), the article is flagged as CC BY and **has one corrigendum** (doi:10.1016/j.cdnut.2025.107450, issued May 2025). The IFCT book, the MEXT tables and the USDA data are not papers and have no DOI. Abstract and full text of the INDB paper were read on Europe PMC (open access).

### 8.2 Not verified

- **No lawyer's view.** I did not check Indian copyright law, what counts as "a product", or whether a short quotation is permitted.
- **No contact was made.** I do not know which NIN address is monitored, who handles permissions, how long NIN takes, or whether NIN grants requests like this. The follow-up intervals are my suggestion.
- The contradiction on the NIN contact page (visible `nin@nic.in`, link `nin@ap.nic.in`) is not resolved. `ifct2017@gmail.com` and the 2017 phone number were not tested.
- The two NIN viewer pages for the "Concise" and "Full" copies point to a document hosted on a third-party drive; I did not open it and it may carry its own text.
- MEXT: my Japanese reading is a translation by an AI assistant; the Excel files, the 2020 edition's front matter and MEXT's website-wide terms were not opened.
- USDA: no data type was checked for separate terms; the Indian-food spot check was nine searches and is not a coverage audit.
- CoFID: the OGL text and the data files were not opened; which Indian foods it holds is unchecked.
- INDB: the `INDB.xlsx` file and the 2025 corrigendum were not read; its authors were not asked.
- Label data, the full RDA report, the Dietary Guidelines for Indians 2024 and NVIF: reuse terms **unverified**.
- The Netlify or Git setup for a private data store (partial permission) was not examined.
- Whether the site is entirely free of advertising and sales: not stated in the repo files I read. The owner must confirm it before using the letter.

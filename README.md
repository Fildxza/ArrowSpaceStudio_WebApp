# Arrow Space Studio — Website

Single-page marketing site for a mural painting studio: hero, services, portfolio
("The Exhibition") with filters and a lightbox, process, company profile and a
WhatsApp-first enquiry flow.

> **Status: preview build.** Company details, contact information and all artwork
> are **samples**. Nothing on the site is a verified company fact. See
> [Owner checklist](#owner-checklist-before-launch).

---

## Creative direction — "Workshop Editorial"

Three directions were considered:

|          | A. Immersive gallery                 | B. Architecture-studio editorial             | C. Bold artistic studio                            |
| -------- | ------------------------------------ | -------------------------------------------- | -------------------------------------------------- |
| Feel     | Dark, cinematic, artwork full-bleed  | Ivory, restrained, lots of whitespace        | Loud colour, experimental layouts                  |
| Strength | Artwork is the hero                  | Premium, trustworthy                         | Memorable, energetic                               |
| Risk     | Can feel cold; weak for service info | Can feel soft/generic; little "maker" energy | Competes with the murals; harder to read on mobile |

**Chosen: a hybrid we call _Workshop Editorial_** — the confidence of A, the
typographic discipline of B, and a controlled dose of C's character, framed by
the language of a working mural crew:

- **Palette ("Cosmic Violet", chosen for Arrow Space Studio's galaxy and neon work):** deep-space ink
  `#07081E` and charcoal `#161A34`, ivory `#F5F1E9` and stone `#D7D0C4` as the "gallery wall",
  nebula violet `#8F63F6` as the accent (`#6231BA` behind ivory text, `#CAACFF` for small text on ink)
  and star-gold `#F7C243` for tiny details. Every pair passes WCAG AA (lowest 5.0:1). Colours live only
  in the tokens at the top of `src/styles.css`, so changing the palette never touches layout.
- **Type:** Fraunces (expressive editorial serif) for display, Manrope for
  reading, IBM Plex Mono for small "technical" annotations (figure numbers,
  labels) — like notes on a site drawing.
- **Graphic language from the trade:** tape-measure ruler ticks, crop /
  registration marks around artwork, outlined stencil numerals, a hand-painted
  brush stroke, and terracotta paint drips running off the marquee band.
- **Rhythm:** dark hero → violet marquee → ivory reading sections → dark
  gallery → stone process → ivory profile → violet enquiry → dark footer.
- **Motion:** short hero entrance (staggered lines, image mask, brush stroke
  drawing in), scroll reveals, gentle parallax, gallery hover/lightbox
  transitions. All of it is skipped with `prefers-reduced-motion`, and content is
  never hidden if JavaScript fails.

The result reads as artistic and confident (the "masculine", hands-on studio
identity requested) without competing with the artwork.

---

## Tech stack

- **React 19 + TypeScript**, **TanStack Start / Router** (file routes in `src/routes`)
- **Vite 8**, **Tailwind CSS 4** (tokens in `src/styles.css`)
- **lucide-react** icons — no animation library (CSS + IntersectionObserver)
- **Vitest + Testing Library** for tests
- **sharp** (dev only) to generate responsive WebP images

The page is **pre-rendered to static HTML** at build time — no server is needed.

## Live preview in VS Code (code on the left, site on the right)

This is a React/Vite app, so it must be previewed through its **dev server**.
Do **not** use the _Live Server_ / _Live Preview_ ("Go Live") extensions — they
only serve plain HTML files and will show a blank page or 404 here.

**Two shortcuts (already added to your VS Code user keybindings):**

| Keys         | What it does                                            |
| ------------ | ------------------------------------------------------- |
| `Ctrl+Alt+S` | Starts the dev server (`npm run dev`, hot reload)       |
| `Ctrl+Alt+P` | Opens the site in a Simple Browser **beside** your code |

1. Open the folder in VS Code and press **Ctrl+Alt+S**. Wait for the terminal to
   show `Local: http://localhost:5173/`.
2. Press **Ctrl+Alt+P** — the site appears in a panel on the right. Every time
   you save a file the preview updates by itself.

No shortcut? `Ctrl+Shift+P` → **Simple Browser: Show** → `http://localhost:5173`,
then drag the tab to the right side. To recreate the shortcuts on another
machine, add this to _Preferences: Open Keyboard Shortcuts (JSON)_:

```json
[
  {
    "key": "ctrl+alt+p",
    "command": "simpleBrowser.api.open",
    "args": ["http://localhost:5173", { "viewColumn": -2, "preserveFocus": true }]
  },
  {
    "key": "ctrl+alt+s",
    "command": "workbench.action.tasks.runTask",
    "args": "Dev server (live preview)"
  }
]
```

Other options: **F5** → _Live preview — inside VS Code_ (Microsoft Edge Tools
extension) or _Live preview — Edge window_ (supports breakpoints).
If the preview shows a different site, another project is already using port
5173 — stop it (the dev server is pinned to 5173 and will refuse to start).
Settings live in `.vscode/` (`tasks.json`, `launch.json`, `settings.json`).

## Commands

```sh
npm install          # Node 20+ (22 recommended)
npm run dev          # http://localhost:5173 (hot reload)
npm run build        # static site -> dist/client
npm run preview      # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint + prettier
npm test             # vitest
npm run check        # all of the above
npm run images       # regenerate responsive images after adding photos
```

## Project structure

```
src/
  config/
    business.ts     <- company details, WhatsApp, SEO, demo/live switch   (OWNER)
    content.ts      <- nav, services, process, about copy                 (OWNER)
    portfolio.ts    <- portfolio projects                                 (OWNER)
    social-proof.ts <- testimonials + client logos                        (OWNER)
    images.ts       <- image registry (reads src/assets/web/manifest.json)
  assets/           <- master photos (.jpg/.png)
  assets/web/       <- generated WebP variants + manifest (do not edit by hand)
  components/site/  <- page sections (Hero, Services, Work, Lightbox, Process,
                       About, Contact, EnquiryForm, Footer, Nav, Graphics, Motion)
  lib/              <- whatsapp.ts, portfolio.ts, motion.ts, enquiry.ts
  routes/           <- __root.tsx (document head), index.tsx (the page)
  styles.css        <- design tokens, buttons, graphic details, motion
  test/             <- unit + component tests
public/             <- favicon, og-image, robots.txt
scripts/            <- optimize-images.mjs
netlify.toml        <- Netlify build settings
```

---

## Language: Bahasa Melayu / English

The whole site is bilingual (BM | EN toggle in the header top bar and the mobile menu).

- **Which language shows first:** the visitor's saved choice, otherwise their browser
  language (`ms*` → Bahasa Melayu, anything else → English). To force one for first-time
  visitors set `DEFAULT_LANGUAGE` in `src/i18n/index.ts` (`"ms"`, `"en"` or `"auto"`).
- **Fixed UI text** (buttons, labels, form, chat panel, error pages, WhatsApp messages):
  `src/i18n/copy.ts`. Both languages live side by side and Bahasa Melayu is typed against
  English, so a missing key is a compile error (and a test fails).
- **Owner-editable content** (services, portfolio titles, process, About, testimonials,
  image descriptions) is stored as `{ en: "…", ms: "…" }` pairs in `src/config/*.ts`.
  A plain string is used for both languages.
- WhatsApp messages are sent in the language the visitor is browsing in.
- `<html lang>` and the tab title follow the language. The prerendered HTML is English,
  so search engines index the English version.

## Updating content (owner guide)

### Company details — `src/config/business.ts`

Fill in the fields marked `[OWNER]` (already confirmed: `name`, `whatsappNumber`, `leadArtist`, `socials`): `name`, `tagline`, `description`,
`whatsappNumber`, `phoneNumber`, `email`, `address` (only if there is a public
studio), `serviceAreas`, `openingHours`, `mapUrl`, `mapEmbedUrl`, `socials`,
`established`, `leadArtist`.

- Empty fields are **hidden** in live mode. In demo mode they fall back to the
  obviously fake values in `demoDetails` (e.g. "Jalan Contoh",
  `hello@muralstudio.example`) and are never clickable.
- **Sample markers are switched off** (`showSampleLabels: false`) so the draft looks finished.
  Set `showSampleLabels: true` to draw the "Sample / Proposed / Preview" tags again next to every
  stand-in detail, testimonial and client logo (useful when handing the draft to the owner).
- When everything is confirmed, set `contentStatus: "live"`. This removes all stand-in details
  (and therefore every marker); the testimonials section hides until real quotes are added.
- **Mobile service without a studio?** Leave `address` empty and list
  `serviceAreas` — the site will show coverage instead of implying a premises.

### Follow section (TikTok / Instagram / Facebook)

A "Follow" section after About lists every profile in `business.socials` with the handle.
It is hidden automatically when `socials` is empty.

### WhatsApp

Set `whatsappNumber` to the international number, digits only, e.g. `"60123456789"`.

- Until a valid number is set, every WhatsApp button is **disabled** (service
  links scroll to the enquiry form instead). Visitors are never sent to a
  made-up number.
- Messages are generated by `src/lib/whatsapp.ts` and correctly URL-encoded.
  Service links include the service name; the brief builder includes project
  type, location, wall size, timeline and notes.

### WhatsApp quick-chat

Every WhatsApp button (top bar, mobile menu, mobile bar, dock, services,
contact section) opens a small chat panel instead of jumping straight to
WhatsApp:

- The studio greets the visitor ("Hi, how can I help you today?") and a
  message is **already prepared** — the visitor can press **Send on WhatsApp**
  immediately, or tap a different quick reply first (quotation, one per
  service, "I have a question") and optionally add details such as location
  and wall size.
- WhatsApp then opens with the message prefilled; the visitor only presses send.
- Opened from a service link, the panel preselects that service.
- Without a configured number the panel still opens, but **Send is disabled**
  and explains why ("Copy message" still works). Nothing opens a wrong number.
- With a number set, the buttons are also normal `wa.me` links, so they keep
  working with ctrl/cmd-click and without JavaScript.

Edit the greeting and quick replies in `src/config/content.ts` → `chat`.

### Call button

Set `phoneNumber` (digits, international format) for voice calls. Left empty, it
**reuses `whatsappNumber`** — so right now the Call buttons dial the WhatsApp number
(`tel:+60132512588`). If the owner does not want calls, tell the developer to hide them. Until one of them is valid, every "Call"
button (top bar, mobile menu, mobile bar, contact dock, contact list, location)
is disabled.

### Social media (Instagram / Facebook / TikTok)

```ts
socials: [
  { platform: "instagram", href: "https://www.instagram.com/yourstudio", handle: "@yourstudio" },
  { platform: "facebook", href: "https://www.facebook.com/yourstudio" },
  { platform: "tiktok", href: "https://www.tiktok.com/@yourstudio" },
],
```

Icons appear in the header top bar, the mobile menu and the footer. In demo
mode (with the list empty) they are shown as non-clickable samples.

### Where visitors can contact you

| Place                    | What it does                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Header top bar (desktop) | WhatsApp, phone, email, opening hours, social icons — collapses on scroll            |
| Mobile menu              | WhatsApp + Call buttons and social icons under the links                             |
| Mobile bar (phones)      | Sticky "Have a wall in mind?" bar after the hero (+ Call icon once a number is set)  |
| Contact dock (desktop)   | Round button bottom-right that fans out into WhatsApp / Call / Email / Build a brief |
| Services                 | "Enquire about …" link per service (opens the quick-chat with that service selected) |
| Contact section          | Channel list (WhatsApp / Call / Email / Studio) + brief builder                      |
| Location section         | Address, hours, phone, service areas, directions, map                                |

The floating bar and dock hide over the hero, the contact section, the
location section and the footer so they never cover the forms.

### Services, process, About copy — `src/config/content.ts`

Edit or remove items in `services`, `process`, `philosophy`, `about`.
Set `servicesConfirmed = true` and `about.placeholder = false` once approved.

### Portfolio photos and their status

Every project in `src/config/portfolio.ts` has a `status`:

| Status | Meaning | Label shown |
|---|---|---|
| `demo` | AI-generated sample (never real work) | none |
| `social` | Real photo of the studio's work, pending the owner's original file | none (shown like finished work; `credit` is kept in the data for provenance only) |
| `verified` | Owner-approved original with confirmed details | none |

The 26 current projects are `social`: real work of the studio taken from its public Instagram grid and
Facebook page, plus 18 photos the owner attached from the studio's social pages (provenance, crops and
redactions in `src/assets/SOURCES.md`). Duplicates were removed (the best version of each wall is kept),
and decorative frames added by social apps were cropped off. Categories describe what is visible
(Galaxy, Characters, Portraits, Colour & Street, Behind the Scenes) — client type, location and year are
not known, so none are shown. The gallery shows three tiles per row on desktop, two on tablets and one
on phones.

**Image quality (AI-enhanced previews).** The studio's social-media photos are only 360–2048 px, so every
one of them was upscaled with **Real-ESRGAN** (`realesrgan-x4plus`, ncnn-Vulkan v0.2.5.0; 4× for the
smallest, 2× for the larger ones) to roughly 1440–4100 px,
which removes compression blocks and gives clean edges (checked side by side against a plain enlargement).
Be aware of what this is: the extra sharpness is *reconstructed*, not captured — fine detail such as brush
texture is plausible rather than real. So these are "good-looking previews", not true 4K photographs.
The unmodified originals are kept in `src/assets/source-previews/`. For the final site, ask the owner for
the **original photos** (phone gallery, Google Drive, or WhatsApp sent as *Document* so it is not
compressed); modern phones shoot 3000–4000 px natively. Responsive WebP sizes up to 2048 px are generated
by `npm run images`, and the browser downloads only the size the screen needs.

**Before/after transitions:** the drag-to-compare slider from the Process section works for any pair of
images. Give a project a `before` photo (and optional `beforeLabel` / `afterLabel`) in
`src/config/portfolio.ts` and its lightbox becomes the same slider; the Process section itself is
configured in `comparison` in `src/config/content.ts`. Every gallery image already gets the mask reveal
and hover zoom automatically.

**To replace a preview with an approved original:**

1. Put the high-resolution photo in `src/assets/` (e.g. `src/assets/galaxy-ceiling.jpg`, ≥1600px wide).
2. Run `npm run images` (creates WebP sizes + updates the manifest).
3. In `src/config/portfolio.ts` point the item at it with `getImage("galaxy-ceiling", { en: "…", ms: "…" })`,
   fill in the confirmed `title`, `description`, optional `location` / `year`.
4. Set `status: "verified"` and delete the `credit` line (this removes the label).
5. Optional: `layout` (`"wide" | "tall" | "square"`) and `focal` (e.g. `"50% 30%"`).

The hero, About and service photos are set with the same `getImage()` call (`Hero.tsx`, `About.tsx`,
`src/config/content.ts`). Only the Process before/after slider still uses AI demo images (no label shown),
kept on purpose until a real before/after pair is available.
`public/og-image.jpg` (social preview) is composed from the real spaceship-room photo; replace it with a
high-resolution photo before launch.

### Testimonials & client logos — `src/config/social-proof.ts`

Add only quotes a client has **approved in writing**, and only logos you have
permission to show:

```ts
export const testimonials = [
  {
    quote: "Exact approved words…",
    name: "Name",
    role: "Owner, Company",
    projectId: "botanical-feature-wall",
  },
];
export const clientLogos = [{ name: "Company", logo: "/clients/company.svg", href: "https://…" }];
```

While both lists are empty, demo mode shows stand-in testimonials (initials only) and generic logos
(tagged "Sample" only when `showSampleLabels` is on) and live mode hides the section entirely.
Put logo files in `public/clients/` (SVG or transparent PNG — they are shown as
white silhouettes on the dark background).

### Mobile enquiry bar

On phones a sticky "Have a wall in mind?" bar appears after the hero and steps
aside over the contact section and footer. It opens WhatsApp once
`whatsappNumber` is set; until then it scrolls to the brief builder. It lives in
`src/components/site/MobileCTA.tsx`.

### Logo

The studio's real logo is used: the supplied file is `src/assets/brand/arrow-logo.jpg`; the symbol is cropped
to `src/assets/brand/arrow-logo-mark.webp` (header, footer, chat panel), `public/favicon.png` and
`public/apple-touch-icon.png`; `public/og-image.jpg` carries it too. It is a 1002 px JPEG with a starfield
background — if the owner has a **transparent SVG/PNG** of the symbol, swap those files for a crisper result.

### Map & address (Location section)

The address is confirmed, so the Location section shows the **real Google Map immediately** (no click needed;
the browser lazy-loads it as the section nears the screen). If `mapEmbedUrl` is empty it falls back to an
illustrated sample map with the dummy address (no Google request).

Fields:

- `address` — shown in the Location and Contact sections; "Get directions" opens Google Maps.
- `mapUrl` — optional link to your Google Maps business listing (used instead of the address search).
- `mapEmbedUrl` — Google Maps → Share → **Embed a map** → copy only the `src="…"` value
  (the current value uses the keyless `maps.google.com/maps?q=…&output=embed` form).

### Before / after slider ("From sketch to wall")

At the end of the Process section. Configure `comparison` in
`src/config/content.ts`: add a real _before_ photo and the _finished_ photo of
the same wall to `src/assets/`, run `npm run images`, point `before` / `after`
at them with `getImage()` and adjust the labels.
The current sketch was generated from the demo image.

### Going public (SEO)

1. Set `seo.siteUrl` to the final domain (enables canonical URL and Open Graph image).
2. Set `seo.indexable = true` (removes `noindex`).
3. Replace `public/robots.txt` with the "launch" version described inside it.
4. Optionally add a `public/sitemap.xml` listing the home page.

---

## Deploying to Netlify

`netlify.toml` already contains the settings, verified against a local build:

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Publish directory | `dist/client`   |
| Node version      | 22              |

Steps: push this repository to GitHub → Netlify → **Add new site → Import an
existing project** → choose the repo → confirm the settings above → Deploy.
No environment variables or Netlify Functions are needed. (Custom domain and
DNS are configured later in Netlify → Domain management.)

---

## Status

**A. Implemented and verified** (build, type-check, lint, unit/component tests,
and a real-browser check with Microsoft Edge via Playwright at 320–1920px)

- Static pre-rendered build; no console errors or failed requests.
- No horizontal overflow at 320, 375, 414, 768, 820, 1024, 1280, 1440, 1920px.
- Navigation anchors land 80px below the top (header is 72–77px); active-section highlight.
- Mobile enquiry bar: hidden over the hero, shown mid-page, steps aside at Contact/footer.
- Testimonial/logo section: placeholder mode in demo, hidden in live until real content.
- Contact dock (desktop) opens/closes (button, Escape, click outside); unconfigured channels disabled.
- Before/after slider responds to mouse drag and arrow keys.
- WhatsApp quick-chat: opens from every button, focus moves in and returns on close, Escape closes,
  service links preselect their topic, Send disabled without a number, and with a harmless test
  number produces the correct `wa.me` URL with the encoded message (window.open intercepted — WhatsApp itself was not opened).
- Location section: dummy address + illustrated map; no Google request until a real embed is set.
- Mobile menu (shown below 1024px): opens, focuses first link, closes on Escape / link / resize.
- Bahasa Melayu / English: browser-language detection, toggle, persistence after reload, `html lang`, tab title,
  no leftover English in BM mode, no horizontal overflow in either language at 320–1920px.
- Portfolio filters (counts, `aria-pressed`, live announcement).
- Lightbox: keyboard ←/→, Escape, visible close button, focus trap, focus
  returns to the tile, page scroll locked while open, swipe on touch.
- WhatsApp helper (encoding, invalid/empty numbers → no link).
- Reduced-motion and no-JavaScript rendering keep all content visible.

**B. Implemented, not fully tested**

- Real-device testing on iOS Safari / Android Chrome (only emulated viewports were used).
- Screen-reader walkthrough (semantics were checked in code and tests, not with NVDA/VoiceOver).
- Lighthouse / Core Web Vitals were **not** measured.

**C. Waiting for real company information**

- Logo (a placeholder "F" monogram is used), tagline/description, email, address or
  service areas, opening hours, year established, lead artist, real About copy.
- **Confirmed so far:** company name `Arrow Space Studio`; address (33-01-49 Menara Keck Seng, 203 Jalan
  Bukit Bintang, 55100 Kuala Lumpur) and "Always open" hours from the studio's Facebook page; lead artist
  `Fathil Ahmad`; WhatsApp `60132512588` (kept as Fathil's number, approved by the project owner); company
  accounts Instagram `@arrowspacestudio`, Facebook `Fathil The Muralist` and TikTok `@fathil_art`. The artist's
  personal Instagram/Facebook are credited in the About section only.
- **Still to confirm:** a **working business email** (the Facebook page lists `enquiry@arrowspacebyfathil.com`,
  but that domain does not exist, so it was NOT published); whether the studio serves Malaysia *and*
  Singapore (its Instagram name shows both flags — currently listed as service areas); whether "Always open"
  is right for the hours; whether to show the artist's full name (the Facebook page writes
  "Ahmad Fathil Zakaria", the site uses "Fathil Ahmad" as given by the owner); whether "four brothers"
  should appear (quoted from the bio); the studio logo file; approval of each photo.
- Confirmation of the service list and process steps.
- Approved client testimonials and permission to show client logos.
- Phone number, opening hours, social profile URLs, Google Maps link/embed.
- Real before/after photos for the comparison slider.
- Approved original project photographs (current ones are 360–640 px Instagram previews) + verified project details.
- Final domain.

**D. Requires an external service**

- Email-based form submission (currently the brief is sent via WhatsApp or
  copied). If wanted, connect a form provider such as Netlify Forms or
  Formspree — no fake submission is implemented.
- Google Maps embed (owner provides the embed URL).
- Analytics (none installed).

**E. Recommended next steps**

- Individual project pages (`/work/<slug>`) once real case studies exist.
- Self-host fonts for slightly faster first paint and no third-party request.
- Add a Bahasa Melayu version if the audience needs it.

---

## Panduan ringkas (BM)

- **Maklumat syarikat**: edit `src/config/business.ts`. Selepas semua betul, tukar `contentStatus` kepada `"live"`.
- **Nombor WhatsApp**: isi `whatsappNumber` (contoh `"60123456789"`). Selagi kosong, butang WhatsApp tidak aktif.
- **Gambar projek sebenar**: letak gambar dalam `src/assets/`, jalankan `npm run images`, kemudian kemas kini `src/config/portfolio.ts` dan set `verified: true`.
- **Servis & teks About**: edit `src/config/content.ts`.
- **Deploy**: Netlify → import repo GitHub → build `npm run build`, publish `dist/client`.

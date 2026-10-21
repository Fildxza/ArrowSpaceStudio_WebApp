# Mural Studio — Website

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

- **Palette:** ink `#121212` and charcoal `#20201E` for weight, ivory `#F5F1E9` and
  stone `#D9D2C6` for breathing room, terracotta `#B96345` as the single accent
  (a deeper variant is used behind ivory text so it passes contrast).
- **Type:** Fraunces (expressive editorial serif) for display, Manrope for
  reading, IBM Plex Mono for small "technical" annotations (figure numbers,
  labels) — like notes on a site drawing.
- **Graphic language from the trade:** tape-measure ruler ticks, crop /
  registration marks around artwork, outlined stencil numerals, a hand-painted
  brush stroke, and terracotta paint drips running off the marquee band.
- **Rhythm:** dark hero → terracotta marquee → ivory reading sections → dark
  gallery → stone process → ivory profile → terracotta enquiry → dark footer.
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

## Live preview in VS Code

1. Open the project folder in VS Code (`File → Open Folder…`) and accept the
   prompt to **allow automatic tasks** — the dev server then starts by itself.
   (Or run `npm run dev` in a terminal.) The site is served at
   **http://localhost:5173** and hot-reloads on every save.
2. **See it inside VS Code:** `Ctrl+Shift+P` → **Simple Browser: Show** →
   paste `http://localhost:5173`. Or press **F5** and choose
   **Live preview — inside VS Code** (needs the recommended *Microsoft Edge
   Tools* extension; VS Code offers to install it).
3. **See it in a browser window:** press **F5** → **Live preview — Edge window**
   (or Chrome). Breakpoints in `src/` work in this mode.

If the preview shows a different site, another project is already using that
port — stop it, or change `server.port` in `vite.config.ts`.
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

## Updating content (owner guide)

### Company details — `src/config/business.ts`

Fill in the fields marked `[OWNER]`: `name`, `tagline`, `description`,
`whatsappNumber`, `phoneNumber`, `email`, `address` (only if there is a public
studio), `serviceAreas`, `openingHours`, `mapUrl`, `mapEmbedUrl`, `socials`,
`established`, `leadArtist`.

- Empty fields are **hidden** in live mode. In demo mode they fall back to the
  obviously fake values in `demoDetails` (e.g. "Jalan Contoh",
  `hello@muralstudio.example`) and are labelled **Sample** — these are never
  clickable.
- When everything is confirmed, set `contentStatus: "live"`. This removes all
  "Sample / Proposed / Placeholder" markers.
- **Mobile service without a studio?** Leave `address` empty and list
  `serviceAreas` — the site will show coverage instead of implying a premises.

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

Set `phoneNumber` (digits, international format) for voice calls. Leave it
empty to reuse `whatsappNumber`. Until one of them is valid, every "Call"
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

| Place | What it does |
|---|---|
| Header top bar (desktop) | WhatsApp, phone, email, opening hours, social icons — collapses on scroll |
| Mobile menu | WhatsApp + Call buttons and social icons under the links |
| Mobile bar (phones) | Sticky "Have a wall in mind?" bar after the hero (+ Call icon once a number is set) |
| Contact dock (desktop) | Round button bottom-right that fans out into WhatsApp / Call / Email / Build a brief |
| Services | "Enquire about …" link per service (opens the quick-chat with that service selected) |
| Contact section | Channel list (WhatsApp / Call / Email / Studio) + brief builder |
| Location section | Address, hours, phone, service areas, directions, map |

The floating bar and dock hide over the hero, the contact section, the
location section and the footer so they never cover the forms.

### Services, process, About copy — `src/config/content.ts`

Edit or remove items in `services`, `process`, `philosophy`, `about`.
Set `servicesConfirmed = true` and `about.placeholder = false` once approved.

### Replacing demo artwork with real photos

1. Put the approved photo in `src/assets/` (e.g. `src/assets/lobby-wall.jpg`, ideally ≥1600px wide).
2. Run `npm run images` (creates WebP sizes + updates the manifest).
3. In `src/config/portfolio.ts`, point an item at it:
   ```ts
   image: getImage("lobby-wall", "Describe what the artwork shows"),
   ```
4. Fill in the verified `title`, `description`, optional `location` / `year`,
   and set `verified: true` (removes the "Sample" badge for that item).
5. Optional: `layout` (`"wide" | "tall" | "square"`) and `focal` (e.g. `"50% 30%"`).

Hero / About images are set at the top of `Hero.tsx` and `About.tsx` with the
same `getImage()` call. Replace `public/og-image.jpg` (1200×630) with a real
project photo for social sharing.

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

While both lists are empty, demo mode shows a labelled placeholder layout
(bracketed text, "Client Logo" slots) and live mode hides the section entirely.
Put logo files in `public/clients/` (SVG or transparent PNG — they are shown as
white silhouettes on the dark background).

### Mobile enquiry bar

On phones a sticky "Have a wall in mind?" bar appears after the hero and steps
aside over the contact section and footer. It opens WhatsApp once
`whatsappNumber` is set; until then it scrolls to the brief builder. It lives in
`src/components/site/MobileCTA.tsx`.

### Logo

`LogoMark` in `src/components/site/Graphics.tsx` and `public/favicon.svg` are a
placeholder monogram. Replace both with the real logo (SVG preferred) and
regenerate `public/apple-touch-icon.png` (180×180).

### Map & address (Location section)

Until a real address is confirmed the Location section shows the dummy address
and an **illustrated sample map** (no Google request, no real-world pin).

Once confirmed:

- `address` — shown in the Location and Contact sections; "Get directions" opens Google Maps.
- `mapUrl` — optional link to your Google Maps business listing (used instead of the address search).
- `mapEmbedUrl` — Google Maps → Share → **Embed a map** → copy only the `src="…"` value.
  The map is shown behind a "Load interactive map" button, so Google is only
  contacted when the visitor asks for it.

### Before / after slider ("From sketch to wall")

At the end of the Process section. Configure `comparison` in
`src/config/content.ts`: add a real *before* photo and the *finished* photo of
the same wall to `src/assets/`, run `npm run images`, point `before` / `after`
at them with `getImage()`, adjust the labels and set `verified: true`.
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
- Mobile menu: opens, focuses first link, closes on Escape / link / resize.
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

- Company name, logo, tagline/description, WhatsApp number, email, address or
  service areas, social links, year established, lead artist, real About copy.
- Confirmation of the service list and process steps.
- Approved client testimonials and permission to show client logos.
- Phone number, opening hours, social profile URLs, Google Maps link/embed.
- Real before/after photos for the comparison slider.
- Approved project photographs + verified project details.
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

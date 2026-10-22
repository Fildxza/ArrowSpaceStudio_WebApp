# Project status

_Last reviewed: 2026-10-22. This is a development build; it has not been deployed or handed over._

## A. Implemented and checked

Checked with the automated suite (79 tests, `npm run check`) and with manual checks in Microsoft Edge
driven by Playwright against the dev server at 320–1920 px wide.

- Static pre-rendered build; no console errors during the browser checks.
- No horizontal overflow at 320, 375, 768, 1024, 1440 and 1920 px in English and Bahasa Melayu.
- Header anchors land below the fixed header; the active section is highlighted.
- Mobile enquiry bar: hidden over the hero, shown mid-page, steps aside at Contact and the footer.
- Contact dock (desktop) opens and closes (button, Escape, click outside); channels without a value are disabled.
- Before/after slider responds to mouse drag and arrow keys.
- WhatsApp quick-chat: opens from every WhatsApp button, focus moves in and returns on close, Escape closes,
  service links preselect their topic, and the generated `wa.me` URL carries the encoded message. The check
  intercepted `window.open`; no WhatsApp message was sent.
- Location section: real address with an embedded Google Map that loads without a click.
- Mobile menu (below 1024 px): opens, focuses the first link, closes on Escape, link click and resize.
- Bahasa Melayu / English: browser-language detection, toggle, persistence after reload, `html lang`, tab
  title, parity of all interface strings (enforced by tests).
- Portfolio filters (counts, `aria-pressed`, live announcement) and the project viewer (keyboard ←/→,
  Escape, close button, focus returns to the tile, page scroll locked while open, swipe on touch).
- WhatsApp helper (encoding; invalid or empty numbers produce no link).
- Reduced-motion and no-JavaScript rendering keep all content visible.

## B. Implemented, not fully tested

- Real-device testing on iOS Safari and Android Chrome (only emulated viewports were used).
- Screen-reader walkthrough (semantics were checked in code and tests, not with NVDA or VoiceOver).
- Lighthouse / Core Web Vitals have **not** been measured.

## C. Waiting for the client

Confirmed so far: company name `Arrow Space Studio`; the Kuala Lumpur address and "Always open" hours as
published on the studio's Facebook page; the studio logo supplied by the project owner; lead artist name as
given by the project owner; an owner-approved WhatsApp number; the studio's Instagram, Facebook and TikTok
accounts. Photographs of the studio's work come from its public social pages and are shown as previews.

Still to confirm or supply:

- A **working business email address** (the Facebook page lists one on a domain that has no DNS record, so it
  was not published; the site currently shows a clearly fake `.example` placeholder).
- Whether the studio serves Malaysia and Singapore (listed as service areas because of the Instagram name).
- Whether "Always open" is the correct opening-hours statement.
- Whether to show the artist's full name (the Facebook page and the project owner use different forms).
- Whether the "four brothers" line quoted from the studio bio may appear.
- The logo as a transparent SVG/PNG (the supplied file is a JPEG with a starfield background).
- **Original, approved portfolio photographs** with project details and permission for any client-identifying content.
- Approved client testimonials and permission to show client logos (the current ones are stand-ins).
- A real before/after photo pair for the Process slider (the current one is AI-generated concept imagery).
- Confirmation of the service list and process steps.
- Final domain name.

## D. Requires an external service

- Email-based form submission (the brief is currently sent through WhatsApp or copied). No fake submission is
  implemented; connect Netlify Forms, Formspree or similar if wanted.
- Analytics (none installed).

## E. Possible next steps

- Individual project pages (`/work/<slug>`) once real case studies exist.
- Self-host the fonts for a slightly faster first paint and no third-party font request.

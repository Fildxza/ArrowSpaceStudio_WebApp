# Screenshots

Genuine screenshots of the running website, used in the main [README](../../README.md). They are not mockups.

- **Captured:** 2026-10-22, from the local dev server (`npm run dev`, `http://localhost:5173`) at commit `7f31b3b`.
- **Browser:** Microsoft Edge driven by Playwright. Desktop 1440 × 900; mobile 390 × 844 at 2× pixel ratio.
- **Method:** each section was scrolled into view with its scroll-reveal animations completed, then the viewport
  was captured and compressed to a palette PNG with `sharp`. Nothing was edited or retouched. The capture script
  is not part of the repository (it needs Playwright, which is not a project dependency).
- **WhatsApp panel:** the chat panel was only opened; no message was sent.

| File                       | Shows                                                           |
| -------------------------- | --------------------------------------------------------------- |
| `homepage-hero.png`        | Homepage hero, English                                          |
| `homepage-hero-bm.png`     | Homepage hero, Bahasa Melayu                                    |
| `services.png`             | Services section                                                |
| `selected-work.png`        | Portfolio gallery with category filters                         |
| `project-viewer.png`       | Project viewer opened from the gallery                          |
| `process.png`              | Process section (the before/after slider below it is not shown) |
| `about.png`                | About section                                                   |
| `contact.png`              | Contact / project enquiry section                               |
| `whatsapp-chat.png`        | WhatsApp quick-chat panel                                       |
| `location.png`             | Location section with the embedded Google Map                   |
| `mobile-home.png`          | Mobile homepage                                                 |
| `mobile-selected-work.png` | Mobile gallery                                                  |

**Content caveat.** The portfolio photographs are the studio's own work shown as previews pending the owner's
approval, and the contact email visible in some shots is a placeholder. The testimonials and client-logo section
is intentionally not captured because its content is placeholder material.

**To refresh them** after the design or content changes, start the dev server, capture the same views at the same
sizes, and replace the files here (keep the filenames so the README links stay valid).

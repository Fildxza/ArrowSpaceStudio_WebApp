# Creative direction

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

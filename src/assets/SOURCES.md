# Image sources

Provenance of the photos used on the website, so they can be replaced with approved originals.
All real photos are **previews**: the owner must approve each one, and original high-resolution files
should replace them (see "Portfolio photos and their status" in the README).

## AI enhancement (applies to every photo below)

The source photos are 360–2048 px. Each was converted to lossless PNG and upscaled with **Real-ESRGAN**
(4× for photos under 900 px, 2× for larger ones)
(`realesrgan-x4plus` model, `realesrgan-ncnn-vulkan` v0.2.5.0 from the official release
https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.2.5.0, run locally on 2026-10-22), then saved as
JPEG (q90) in `src/assets/`. The untouched originals are in `src/assets/source-previews/`.
Result: roughly 1440–4100 px, cleaner edges, no compression blocking. The added sharpness is reconstructed,
not captured, so these remain previews until the owner supplies originals.

## Studio Instagram — https://www.instagram.com/arrowspacestudio/

Taken on 2026-10-22 from the grid shown to logged-out visitors, at the resolution Instagram serves
there (360–640 px). Several are still frames from videos.

| File                        | What it shows                           | Post date*               |
| --------------------------- | --------------------------------------- | ------------------------ |
| `arrow-galaxy-bedroom.jpg`  | Galaxy mural behind a bed               | 2021-10-04 (video still) |
| `arrow-galaxy-ceiling.jpg`  | Galaxy ceiling with rainbow prism       | 2022-04-20               |
| `arrow-moon.jpg`            | Painted full moon                       | 2024-12-04 (video still) |
| `arrow-neon-city.jpg`       | Neon cityscape room                     | 2024-12-08 (video still) |
| `arrow-pastel-leaves.jpg`   | Pastel leaf mural in a bedroom          | 2022-05-19               |
| `arrow-pastel-clouds.jpg`   | Pink and blue cloud wall                | 2022-04-11               |
| `arrow-scaffold-planet.jpg` | Planet mural in progress on scaffolding | 2024-12-15 (video still) |
| `arrow-city-at-work.jpg`    | Artist painting a city skyline          | 2024-12-10 (video still) |

## Studio Facebook page — https://www.facebook.com/FathilTheMuralist

Taken on 2026-10-22 from the page and its About tab as shown to logged-out visitors (590–960 px;
several are video thumbnails).

| File                      | What it shows                                        | Processing                                                             |
| ------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| `arrow-aerospace-lab.jpg` | Room painted as a spaceship cockpit                  | Letterbox bars cropped (960×356)                                       |

## Supplied by the project owner (attachments, 2026-10-22)

The owner attached 27 photos taken from the studio's social pages (Facebook "Fathil The Muralist" and
Instagram); the exact post for each is not known, so all are credited to the Facebook page. 18 were
used after de-duplicating and removing the decorative frames that social apps add (striped, glove-pattern
and blurred borders were cropped off). They replace three lower-resolution photos of the same walls.

| File                             | What it shows                                    | Processing                                               |
| -------------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| `arrow-solar-astronauts.jpg`     | Astronauts and planets, violet LED edge          | **Names on the flag removed** (children's names)         |
| `arrow-wookiee-duo.jpg`          | Furry warrior carrying a small green character   | none                                                     |
| `arrow-battle-royale.jpg`        | Game-inspired soldier in a room                  | black side bars cropped                                  |
| `arrow-mandala.jpg`              | Colour mandala                                   | none                                                     |
| `arrow-studio-vapor.jpg`         | Shopfront wall with neon lettering and a villain | left part cropped (a car number plate was in view)       |
| `arrow-scooter-shopfront.jpg`    | Painted scooter and shopfront                    | none                                                     |
| `arrow-champion.jpg`             | Monochrome boxer portrait with quote             | glove-pattern borders cropped                            |
| `arrow-strength-camo.jpg`        | Weightlifters on a camo wall                     | top panel of a 3-photo collage                           |
| `arrow-corte-fino.jpg`           | Barber-shop portrait behind armchairs            | striped borders cropped                                  |
| `arrow-respect-barber.jpg`       | "Respect your barber" portrait                   | striped borders cropped                                  |
| `arrow-dark-lord.jpg`            | Airbrushed sci-fi villain and space station      | none                                                     |
| `arrow-fairytale-room.jpg`       | Children's storybook room (2-photo composite)    | none                                                     |
| `arrow-nebula-ceiling.jpg`       | Nebula ceiling                                   | blurred side borders and cluttered floor area cropped    |
| `arrow-wave-landscape.jpg`       | Waves, paddy fields, mountains and lighthouse    | starfield frame cropped                                  |
| `arrow-nebula-wip.jpg`           | Artist painting a nebula (replaces the old one)  | none                                                     |
| `arrow-monochrome-wip.jpg`       | Two artists painting a grey-scale portrait       | none                                                     |
| `arrow-astronaut-breakout.jpg`   | Astronaut and comet bursting through a wall      | none                                                     |
| `arrow-asean-skyline.jpg`        | Southeast Asian skyline with flag roundels       | none                                                     |

\*The date of the Instagram post, not the date the mural was painted. Client names, locations and
project dates are unknown and are deliberately not shown.

## Left out on purpose

A collage showing a client's name on a painted sign (and its duplicate); a second photo of the barber wall;
the in-progress shots of walls whose finished photo is already used (skyline, gym, dark-lord); a second
view of the wave mural; a chandelier ceiling photo; photos showing children's faces; dark or
tiny video stills; an edited video collage; a photo of children's names on a flag (only the redacted
version above is used).

## AI-generated demonstration images

`hero.jpg`, `cafe.jpg`, `commercial.jpg`, `detail.jpg`, `exterior.jpg`, `hotel.jpg`,
`residential.jpg`, `artist.jpg`, `sketch-hero.jpg` are AI-generated samples. They are not the
studio's work. Only `hero.jpg` and `sketch-hero.jpg` are still shown (the Process before/after
slider, labelled "Sample"); the rest were moved to `unused-demo/` (kept, but not built into the site).

## Brand

`brand/arrow-logo.jpg` — the studio's logo as supplied by the project owner (matches the Instagram profile
picture). `brand/arrow-logo-mark.webp` is a 256 px crop of the symbol (no lettering) used in the header,
footer and chat panel; `public/favicon.png` and `public/apple-touch-icon.png` are crops of the same.

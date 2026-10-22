/**
 * PORTFOLIO CONTENT
 * ---------------------------------------------------------------------------
 * Each project has a `status`:
 *   - "demo"     AI-generated sample artwork (labelled "Sample"); never real work.
 *   - "social"   a real photo taken from the studio's own public Instagram
 *                (@arrowspacestudio). Shown as a labelled preview until the owner
 *                approves it and supplies the original file and project details.
 *   - "verified" owner-approved photo with confirmed details (no label).
 *
 * Categories describe what is VISIBLE (theme), not who the client was — client
 * type, location and year are not known, so they are left out on purpose.
 *
 * To replace an item with an approved original:
 *   1. Add the photo to `src/assets/` and run `npm run images`.
 *   2. Point `image` at it with `getImage("file-name", { en, ms })`.
 *   3. Fill in the confirmed title / description / location / year.
 *   4. Set `status: "verified"` and remove `credit`.
 * No component needs to change. Provenance of the Instagram photos is recorded in
 * `src/assets/SOURCES.md`.
 */
import type { Localized } from "@/i18n";
import { getImage, type SiteImage } from "./images";

export type ProjectCategory = "Galaxy" | "Neon" | "Pastel" | "Process";

export const projectCategories: readonly ProjectCategory[] = [
  "Galaxy",
  "Neon",
  "Pastel",
  "Process",
];

export type ProjectLayout = "wide" | "tall" | "square";
export type ProjectStatus = "demo" | "social" | "verified";

export interface ProjectCredit {
  label: string;
  href: string;
}

export interface PortfolioProject {
  id: string;
  title: Localized;
  category: ProjectCategory;
  description: Localized;
  image: SiteImage;
  /** Controls the aspect ratio and column span in the gallery. */
  layout: ProjectLayout;
  status: ProjectStatus;
  /** Where the photo came from (shown in the lightbox for non-verified items). */
  credit?: ProjectCredit;
  /** Only add once confirmed with the client. Hidden when empty. */
  location?: string;
  year?: string;
  /** CSS object-position for the gallery crop, e.g. "50% 30%". */
  focal?: string;
}

const instagram: ProjectCredit = {
  label: "@arrowspacestudio",
  href: "https://www.instagram.com/arrowspacestudio/",
};

export const projects: PortfolioProject[] = [
  {
    id: "galaxy-bedroom-wall",
    title: { en: "Galaxy Bedroom Wall", ms: "Dinding Bilik Galaksi" },
    category: "Galaxy",
    description: {
      en: "A deep-space nebula with scattered stars, painted behind a bed.",
      ms: "Nebula angkasa lepas dengan taburan bintang, dilukis di belakang katil.",
    },
    image: getImage("arrow-galaxy-bedroom", {
      en: "Galaxy mural on a bedroom wall, with a large teddy bear lying on the bed in front of it",
      ms: "Mural galaksi pada dinding bilik tidur, dengan sebuah patung beruang besar di atas katil",
    }),
    layout: "wide",
    status: "social",
    credit: instagram,
  },
  {
    id: "galaxy-ceiling-prism",
    title: { en: "Galaxy Ceiling with Prism", ms: "Siling Galaksi dengan Prisma" },
    category: "Galaxy",
    description: {
      en: "A nebula overhead, with a prism and a rainbow beam painted across the ceiling.",
      ms: "Nebula di atas kepala, dengan prisma dan alur pelangi dilukis merentasi siling.",
    },
    image: getImage("arrow-galaxy-ceiling", {
      en: "Galaxy mural covering a ceiling, with a rainbow prism design, a ceiling fan and track lights",
      ms: "Mural galaksi menutupi siling, dengan reka bentuk prisma pelangi, kipas siling dan lampu trek",
    }),
    layout: "square",
    status: "social",
    credit: instagram,
  },
  {
    id: "moon-mural",
    title: { en: "Moon Mural", ms: "Mural Bulan" },
    category: "Galaxy",
    description: {
      en: "A cratered full moon in blues and violets on a dark wall.",
      ms: "Bulan purnama berkawah dalam warna biru dan ungu pada dinding gelap.",
    },
    image: getImage("arrow-moon", {
      en: "Large painted full moon with craters on a deep blue wall",
      ms: "Bulan purnama berkawah yang dilukis besar pada dinding biru tua",
    }),
    layout: "tall",
    status: "social",
    credit: instagram,
    focal: "50% 35%",
  },
  {
    id: "neon-city-room",
    title: { en: "Neon City Room", ms: "Bilik Bandar Neon" },
    category: "Neon",
    description: {
      en: "A glowing neon skyline with a soldier silhouette, wrapping the corner of a room.",
      ms: "Garis langit bandar neon bercahaya dengan siluet askar, melingkari sudut bilik.",
    },
    image: getImage("arrow-neon-city", {
      en: "Neon cityscape mural with a soldier silhouette painted across two walls of a room",
      ms: "Mural pemandangan bandar neon dengan siluet askar dilukis pada dua dinding bilik",
    }),
    layout: "tall",
    status: "social",
    credit: instagram,
    focal: "50% 55%",
  },
  {
    id: "helmet-portrait",
    title: { en: "Helmet Portrait", ms: "Potret Topi Keledar" },
    category: "Neon",
    description: {
      en: "A graphic portrait of a figure in a battle helmet against a blue sky.",
      ms: "Potret grafik seorang figura bertopi keledar tempur berlatarkan langit biru.",
    },
    image: getImage("arrow-helmet", {
      en: "Painted graphic portrait of a figure wearing a grey battle helmet against a blue sky",
      ms: "Potret grafik dilukis seorang figura memakai topi keledar tempur kelabu berlatarkan langit biru",
    }),
    layout: "wide",
    status: "social",
    credit: instagram,
  },
  {
    id: "pastel-botanical-wall",
    title: { en: "Pastel Botanical Wall", ms: "Dinding Botani Pastel" },
    category: "Pastel",
    description: {
      en: "Soft mint and blush leaf shapes drawn across a bedroom wall.",
      ms: "Bentuk daun pudina dan merah jambu lembut dilukis merentasi dinding bilik tidur.",
    },
    image: getImage("arrow-pastel-leaves", {
      en: "Pastel mural of mint green leaves and soft pink shapes on a bedroom wall",
      ms: "Mural pastel daun hijau pudina dan bentuk merah jambu lembut pada dinding bilik tidur",
    }),
    layout: "square",
    status: "social",
    credit: instagram,
  },
  {
    id: "cloud-wall",
    title: { en: "Cloud Wall", ms: "Dinding Awan" },
    category: "Pastel",
    description: {
      en: "Layered pink and blue clouds painted across a wall and into the corner.",
      ms: "Awan berlapis merah jambu dan biru dilukis merentasi dinding hingga ke sudut.",
    },
    image: getImage("arrow-pastel-clouds", {
      en: "Mural of layered pink and blue clouds on a wall beside a window",
      ms: "Mural awan berlapis merah jambu dan biru pada dinding di sebelah tingkap",
    }),
    layout: "square",
    status: "social",
    credit: instagram,
  },
  {
    id: "planet-hall-in-progress",
    title: { en: "Planet Mural in Progress", ms: "Mural Planet Sedang Dilukis" },
    category: "Process",
    description: {
      en: "A large planet mural taking shape from scaffolding in a high-ceilinged hall.",
      ms: "Mural planet besar mula terbentuk dari perancah di dalam dewan bersiling tinggi.",
    },
    image: getImage("arrow-scaffold-planet", {
      en: "Scaffolding in a high-ceilinged hall in front of a large planet mural in progress",
      ms: "Perancah di dalam dewan bersiling tinggi di hadapan mural planet besar yang sedang dilukis",
    }),
    layout: "tall",
    status: "social",
    credit: instagram,
    focal: "50% 30%",
  },
  {
    id: "city-wall-at-work",
    title: { en: "Skyline at Work", ms: "Garis Langit Sedang Dilukis" },
    category: "Process",
    description: {
      en: "An artist detailing a glowing city skyline directly on the wall.",
      ms: "Seorang pelukis memperincikan garis langit bandar bercahaya terus pada dinding.",
    },
    image: getImage("arrow-city-at-work", {
      en: "Artist seen from behind painting a glowing city skyline on a wall",
      ms: "Pelukis dilihat dari belakang melukis garis langit bandar bercahaya pada dinding",
    }),
    layout: "tall",
    status: "social",
    credit: instagram,
    focal: "50% 45%",
  },
];

/** True while any project is not yet an owner-approved original. */
export const hasUnverifiedProjects = projects.some((p) => p.status !== "verified");
/** True while any project is AI-generated sample artwork. */
export const hasDemoProjects = projects.some((p) => p.status === "demo");

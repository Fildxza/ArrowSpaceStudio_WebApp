/**
 * PORTFOLIO CONTENT
 * ---------------------------------------------------------------------------
 * DEMONSTRATION CONTENT: every image below was AI-generated to show the
 * intended design. None of it is work completed by the real company.
 *
 * To replace an item with a real, approved project:
 *   1. Add the photo to `src/assets/` and run `npm run images`.
 *   2. Point `image` at it with `getImage("file-name", "describe the artwork")`.
 *   3. Fill in the verified title / description / location / year.
 *   4. Set `verified: true` (this removes the "Sample" labels for that item).
 * No component needs to change.
 */
import type { Localized } from "@/i18n";
import { getImage, type SiteImage } from "./images";

export type ProjectCategory = "Residential" | "Commercial" | "Hospitality" | "Exterior";

export const projectCategories: readonly ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Exterior",
];

export type ProjectLayout = "wide" | "tall" | "square";

export interface PortfolioProject {
  id: string;
  title: Localized;
  category: ProjectCategory;
  description: Localized;
  image: SiteImage;
  /** Controls the aspect ratio and column span in the gallery. */
  layout: ProjectLayout;
  /** false = demonstration item (labelled "Sample" in the UI). */
  verified: boolean;
  /** Only add once confirmed with the client. Hidden when empty. */
  location?: string;
  year?: string;
  /** CSS object-position for the gallery crop, e.g. "50% 30%". */
  focal?: string;
}

export const projects: PortfolioProject[] = [
  {
    id: "botanical-feature-wall",
    title: { en: "Botanical Feature Wall", ms: "Dinding Hiasan Botani" },
    category: "Commercial",
    description: {
      en: "A sweeping botanical composition for a double-height gallery space.",
      ms: "Gubahan botani yang luas untuk ruang galeri dua tingkat.",
    },
    image: getImage("hero", {
      en: "Large botanical mural in terracotta and olive tones on a gallery wall (demonstration image)",
      ms: "Mural botani besar dalam warna terakota dan zaitun pada dinding galeri (imej demonstrasi)",
    }),
    layout: "wide",
    verified: false,
  },
  {
    id: "contemporary-cafe-mural",
    title: { en: "Contemporary Cafe Mural", ms: "Mural Kafe Kontemporari" },
    category: "Hospitality",
    description: {
      en: "Warm organic forms wrapping a neighbourhood cafe.",
      ms: "Bentuk organik yang hangat membalut sebuah kafe kejiranan.",
    },
    image: getImage("cafe", {
      en: "Contemporary cafe interior with a painted mural (demonstration image)",
      ms: "Dalaman kafe kontemporari dengan mural lukisan (imej demonstrasi)",
    }),
    layout: "tall",
    verified: false,
  },
  {
    id: "quiet-ranges",
    title: { en: "Quiet Ranges", ms: "Banjaran Tenang" },
    category: "Residential",
    description: {
      en: "A layered mountain landscape for a calm living room.",
      ms: "Lanskap gunung berlapis untuk ruang tamu yang tenang.",
    },
    image: getImage("residential", {
      en: "Layered mountain landscape mural in a living room (demonstration image)",
      ms: "Mural lanskap gunung berlapis di ruang tamu (imej demonstrasi)",
    }),
    layout: "tall",
    verified: false,
  },
  {
    id: "golden-hour-facade",
    title: { en: "Golden Hour Facade", ms: "Fasad Waktu Senja" },
    category: "Exterior",
    description: {
      en: "A large-scale portrait and geometry piece on a street-facing wall.",
      ms: "Karya potret dan geometri berskala besar pada dinding yang menghadap jalan.",
    },
    image: getImage("exterior", {
      en: "Large exterior mural on a street-facing building wall (demonstration image)",
      ms: "Mural luaran besar pada dinding bangunan yang menghadap jalan (imej demonstrasi)",
    }),
    layout: "wide",
    verified: false,
  },
  {
    id: "tidal-corridor",
    title: { en: "Tidal Corridor", ms: "Koridor Ombak" },
    category: "Hospitality",
    description: {
      en: "Hand-painted waves guiding guests through a hotel corridor.",
      ms: "Ombak lukisan tangan memandu tetamu melalui koridor hotel.",
    },
    image: getImage("hotel", {
      en: "Hotel corridor with a hand-painted wave mural (demonstration image)",
      ms: "Koridor hotel dengan mural ombak lukisan tangan (imej demonstrasi)",
    }),
    layout: "tall",
    verified: false,
  },
  {
    id: "linework-reception",
    title: { en: "Linework Reception", ms: "Penyambut Tetamu Garisan" },
    category: "Commercial",
    description: {
      en: "Rhythmic linework and a single sun for an office arrival.",
      ms: "Garisan berirama dan sebuah matahari untuk ketibaan di pejabat.",
    },
    image: getImage("commercial", {
      en: "Office reception wall with a rhythmic linework mural (demonstration image)",
      ms: "Dinding penyambut tetamu pejabat dengan mural garisan berirama (imej demonstrasi)",
    }),
    layout: "wide",
    verified: false,
  },
];

export const hasUnverifiedProjects = projects.some((p) => !p.verified);

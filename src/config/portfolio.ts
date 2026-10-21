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
  title: string;
  category: ProjectCategory;
  description: string;
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
    title: "Botanical Feature Wall",
    category: "Commercial",
    description: "A sweeping botanical composition for a double-height gallery space.",
    image: getImage(
      "hero",
      "Large botanical mural in terracotta and olive tones on a gallery wall (demonstration image)",
    ),
    layout: "wide",
    verified: false,
  },
  {
    id: "contemporary-cafe-mural",
    title: "Contemporary Cafe Mural",
    category: "Hospitality",
    description: "Warm organic forms wrapping a neighbourhood cafe.",
    image: getImage(
      "cafe",
      "Contemporary cafe interior with a painted mural (demonstration image)",
    ),
    layout: "tall",
    verified: false,
  },
  {
    id: "quiet-ranges",
    title: "Quiet Ranges",
    category: "Residential",
    description: "A layered mountain landscape for a calm living room.",
    image: getImage(
      "residential",
      "Layered mountain landscape mural in a living room (demonstration image)",
    ),
    layout: "tall",
    verified: false,
  },
  {
    id: "golden-hour-facade",
    title: "Golden Hour Facade",
    category: "Exterior",
    description: "A large-scale portrait and geometry piece on a street-facing wall.",
    image: getImage(
      "exterior",
      "Large exterior mural on a street-facing building wall (demonstration image)",
    ),
    layout: "wide",
    verified: false,
  },
  {
    id: "tidal-corridor",
    title: "Tidal Corridor",
    category: "Hospitality",
    description: "Hand-painted waves guiding guests through a hotel corridor.",
    image: getImage("hotel", "Hotel corridor with a hand-painted wave mural (demonstration image)"),
    layout: "tall",
    verified: false,
  },
  {
    id: "linework-reception",
    title: "Linework Reception",
    category: "Commercial",
    description: "Rhythmic linework and a single sun for an office arrival.",
    image: getImage(
      "commercial",
      "Office reception wall with a rhythmic linework mural (demonstration image)",
    ),
    layout: "wide",
    verified: false,
  },
];

export const hasUnverifiedProjects = projects.some((p) => !p.verified);

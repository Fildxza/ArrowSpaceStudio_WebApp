/**
 * SITE COPY & STRUCTURE
 * ---------------------------------------------------------------------------
 * Services, process, navigation and About copy. All of it is PROPOSED content
 * to be confirmed by the company — nothing here is a verified claim.
 */
import { business, demoDetails, detail, detailList, type Detail } from "./business";
import { getImage, type SiteImage } from "./images";
import type { ProjectCategory } from "./portfolio";

export interface NavEntry {
  label: string;
  href: `#${string}`;
}

export const nav: NavEntry[] = [
  { label: "Services", href: "#services" },
  { label: "Selected Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** Set true once the company has confirmed the service list below. */
export const servicesConfirmed = false;

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  image: SiteImage;
  /** Portfolio category this service relates to, if any. */
  category?: ProjectCategory;
}

// Proposed service categories — confirm with the company.
export const services: ServiceItem[] = [
  {
    id: "residential",
    title: "Residential Murals",
    summary: "Bespoke artwork for homes, feature walls and personal spaces.",
    image: getImage(
      "residential",
      "Mountain landscape mural in a living room (demonstration image)",
    ),
    category: "Residential",
  },
  {
    id: "commercial",
    title: "Commercial Murals",
    summary: "Artistic wall treatments for offices, retail spaces and business environments.",
    image: getImage("commercial", "Linework mural in an office reception (demonstration image)"),
    category: "Commercial",
  },
  {
    id: "hospitality",
    title: "Cafe & Hospitality",
    summary: "Distinctive artwork for cafes, restaurants, hotels and hospitality interiors.",
    image: getImage("cafe", "Organic-shape mural in a cafe interior (demonstration image)"),
    category: "Hospitality",
  },
  {
    id: "exterior",
    title: "Exterior & Building",
    summary: "Large-scale artwork for suitable outdoor walls and building surfaces.",
    image: getImage("exterior", "Large portrait mural on a building facade (demonstration image)"),
    category: "Exterior",
  },
  {
    id: "custom",
    title: "Custom Commissions",
    summary:
      "Original mural concepts developed around your space, requirements and creative direction.",
    image: getImage(
      "detail",
      "Close-up of thick hand-painted brushwork in terracotta, ochre and green (demonstration image)",
    ),
  },
];

export interface ProcessStep {
  n: string;
  title: string;
  text: string;
}

// Proposed workflow — adjust to the company's actual process.
export const process: ProcessStep[] = [
  {
    n: "01",
    title: "Discover",
    text: "Understand the client's space, objectives, references and requirements.",
  },
  { n: "02", title: "Concept", text: "Develop a proposed creative direction and artwork concept." },
  {
    n: "03",
    title: "Plan",
    text: "Confirm the scope, surface requirements, schedule and quotation.",
  },
  { n: "04", title: "Create", text: "Carry out the mural painting according to the agreed plan." },
  { n: "05", title: "Reveal", text: "Present the completed artwork and project outcome." },
];

export const philosophy = {
  lead: "Every wall holds the potential to become something",
  emphasis: "extraordinary.",
  support:
    "We transform ordinary spaces into distinctive visual experiences through considered design and bespoke mural painting.",
};

export const marquee = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Exterior",
  "Custom Commissions",
];

export interface ProfileRow {
  label: string;
  detail: Detail | null;
}

/**
 * About section. While `placeholder` is true the copy is marked as placeholder
 * text in demo mode — replace it with the real story, then set it to false.
 */
export const about = {
  placeholder: true,
  paragraphs: [
    `${business.name} is a mural studio creating bespoke, hand-painted artwork for homes, businesses and public-facing walls.`,
    "Add the studio's real background, experience and philosophy here — who paints, how you work, and what makes your approach distinct.",
  ],
  /** Proposed working principles — confirm or rewrite with the company. */
  principles: [
    {
      title: "Site first",
      text: "Every design starts from the wall, the light and the way people move through the space.",
    },
    {
      title: "By hand",
      text: "Artwork is painted on the surface itself rather than printed and applied.",
    },
    {
      title: "Clear plan",
      text: "Scope, surface preparation and schedule are agreed before painting begins.",
    },
  ],
  profile: [
    { label: "Lead artist", detail: detail(business.leadArtist, demoDetails.leadArtist) },
    { label: "Established", detail: detail(business.established, demoDetails.established) },
    {
      label: "Service areas",
      detail: (() => {
        const areas = detailList(business.serviceAreas, demoDetails.serviceAreas);
        return areas ? { value: areas.values.join(" · "), sample: areas.sample } : null;
      })(),
    },
  ] satisfies ProfileRow[],
};

export const enquiryChecklist = [
  "Project location",
  "Approximate wall dimensions",
  "Reference images or ideas",
  "Preferred timeline",
];

/**
 * Before/after comparison shown at the end of the Process section.
 * DEMO: the "before" is a sketch generated from the demonstration image.
 * Replace with a real before photo + finished photo of the same wall, then set
 * `verified: true`.
 */
export const comparison = {
  verified: false,
  beforeLabel: "Concept sketch",
  afterLabel: "Finished wall",
  before: getImage(
    "sketch-hero",
    "Pencil concept sketch of a botanical mural on a primed wall (demonstration image)",
  ),
  after: getImage(
    "hero",
    "The same wall finished as a terracotta and olive botanical mural (demonstration image)",
  ),
};

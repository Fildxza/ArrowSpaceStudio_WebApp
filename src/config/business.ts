/**
 * OWNER-SUPPLIED BUSINESS INFORMATION
 * ---------------------------------------------------------------------------
 * This is the single place where real company details go. Fields marked
 * [OWNER] are intentionally empty until the company supplies them.
 *
 * While `contentStatus` is "demo", empty fields fall back to the obviously
 * fake values in `demoDetails` (always labelled "Sample" in the UI and never
 * turned into working links). In "live" mode the demo values are never used —
 * anything still empty is simply hidden.
 */

export type ContentStatus = "demo" | "live";

export type SocialPlatform = "instagram" | "facebook" | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  /** Full profile URL, e.g. "https://www.instagram.com/yourstudio". */
  href: string;
  /** Optional handle shown next to the icon, e.g. "@yourstudio". */
  handle?: string;
}

export interface BusinessConfig {
  /** "demo" shows sample markers and dummy details. "live" hides them. */
  contentStatus: ContentStatus;
  /** [OWNER] Company display name. Placeholder until supplied. */
  name: string;
  /** [OWNER] Short tagline used in the footer and metadata. */
  tagline: string;
  /** [OWNER] One-paragraph company description used in metadata. */
  description: string;
  /**
   * [OWNER] WhatsApp number in international format, digits only
   * (e.g. "601XXXXXXXX"). While empty, WhatsApp buttons are disabled so
   * visitors are never sent to a wrong number.
   */
  whatsappNumber: string;
  /**
   * [OWNER] Number for voice calls in international format, digits only.
   * Leave empty to reuse `whatsappNumber`. "Call" buttons stay disabled until set.
   */
  phoneNumber: string;
  /** [OWNER] Public contact email. */
  email: string;
  /** [OWNER] Public studio address. Leave empty if there is no public studio. */
  address: string;
  /** [OWNER] Confirmed service areas, e.g. ["Kuala Lumpur", "Selangor"]. */
  serviceAreas: string[];
  /** [OWNER] e.g. "Mon–Sat, 9am–6pm" or "By appointment". Leave empty to hide. */
  openingHours: string;
  /** [OWNER] Link to the business on Google Maps. */
  mapUrl: string;
  /** [OWNER] Google Maps embed URL (Share > Embed a map > the iframe src). */
  mapEmbedUrl: string;
  /** [OWNER] Only real profile URLs. */
  socials: SocialLink[];
  /** [OWNER] Year founded, if the company wants to show it. */
  established: string;
  /** [OWNER] Lead artist / founder name, if the company wants to show it. */
  leadArtist: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  /** [OWNER] Final public origin, e.g. "https://www.example.com" (no trailing slash). */
  siteUrl: string;
  /** Path (under siteUrl) of the social-sharing image in /public. */
  ogImagePath: string;
  ogImageAlt: string;
  /**
   * Keep false until real company details are in place. While false the page
   * carries <meta name="robots" content="noindex"> (public/robots.txt also
   * disallows crawling — update it at launch, see README).
   */
  indexable: boolean;
}

export const business: BusinessConfig = {
  contentStatus: "demo",
  name: "MURAL STUDIO", // [OWNER] placeholder company name
  tagline: "Bespoke mural art for spaces that deserve to stand out.",
  description:
    "Bespoke hand-painted murals for homes, cafes, hotels, offices and building exteriors.",
  whatsappNumber: "", // [OWNER] e.g. "601XXXXXXXX"
  phoneNumber: "", // [OWNER] leave empty to reuse the WhatsApp number
  email: "", // [OWNER]
  address: "", // [OWNER] only if there is a public studio
  serviceAreas: [], // [OWNER] confirmed areas only
  openingHours: "", // [OWNER]
  mapUrl: "", // [OWNER]
  mapEmbedUrl: "", // [OWNER]
  socials: [], // [OWNER] real URLs only
  established: "", // [OWNER]
  leadArtist: "", // [OWNER]
};

/**
 * DUMMY DETAILS — displayed only in demo mode so the layout looks complete.
 * Deliberately unrealistic ("Contoh" = example, ".example" is a reserved
 * domain). Never rendered as clickable links.
 */
export const demoDetails = {
  phone: "+60 1X-XXX XXXX",
  email: "hello@muralstudio.example",
  address: "No. 00, Jalan Contoh, 00000 Bandar Contoh, Malaysia",
  serviceAreas: ["Kawasan Contoh A", "Kawasan Contoh B", "Lain-lain atas permintaan"],
  socials: ["instagram", "facebook", "tiktok"] as SocialPlatform[],
  socialHandle: "@muralstudio.sample",
  openingHours: "Isnin – Sabtu, 9.00 pagi – 6.00 petang",
  established: "20XX",
  leadArtist: "Nama Pelukis (contoh)",
};

export const seo: SeoConfig = {
  title: "Mural Studio — Bespoke Mural Art & Commissioned Painting",
  description:
    "Bespoke hand-painted murals for homes, cafes, hotels, offices and building exteriors. Explore selected work and start a project.",
  siteUrl: "", // [OWNER] set once the domain is known
  ogImagePath: "/og-image.jpg",
  ogImageAlt: "Large hand-painted botanical mural on a gallery wall (demonstration image)",
  indexable: false,
};

export const isDemo = business.contentStatus === "demo";

/** A displayable detail: the real value, a labelled demo value, or nothing. */
export interface Detail {
  value: string;
  sample: boolean;
}

export function detail(real: string, demo: string): Detail | null {
  if (real.trim()) return { value: real, sample: false };
  return isDemo ? { value: demo, sample: true } : null;
}

export function detailList(
  real: string[],
  demo: string[],
): { values: string[]; sample: boolean } | null {
  if (real.length) return { values: real, sample: false };
  return isDemo ? { values: demo, sample: true } : null;
}

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
import type { Localized } from "@/i18n";

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
  /** "demo" shows dummy details for anything not supplied yet. "live" hides them. */
  contentStatus: ContentStatus;
  /**
   * Draw the "Sample" / "Proposed" / "Preview" markers next to dummy details? Off by default so
   * the page looks finished to visitors. Set to `true` to show them again (e.g. when handing the
   * draft to the owner). Has no effect in "live" mode, where dummy details are hidden anyway.
   */
  showSampleLabels: boolean;
  /** [OWNER] Company display name. Placeholder until supplied. */
  name: string;
  /** [OWNER] Short tagline used in the footer (English and Bahasa Melayu). */
  tagline: Localized;
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
  openingHours: Localized;
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
  /** The lead artist's own (personal) profiles — credited in the About section only. */
  leadArtistProfiles: SocialLink[];
}

export interface SeoConfig {
  /** Tab title. The prerendered HTML uses English; the tab title follows the chosen language. */
  title: Localized;
  description: Localized;
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
  showSampleLabels: false,
  name: "Arrow Space Studio", // confirmed company name
  tagline: {
    en: "Bespoke mural art for spaces that deserve to stand out.",
    ms: "Seni mural tempahan untuk ruang yang layak menonjol.",
  },
  description:
    "Bespoke hand-painted murals for homes, cafes, hotels, offices and building exteriors.",
  whatsappNumber: "60132512588", // owner-approved: the number in the TikTok bio "WA … utk tempahan"
  phoneNumber: "", // [OWNER] leave empty to reuse the WhatsApp number
  // enquiry@arrowspacebyfathil.com is listed on the Facebook page, but that domain does not exist (no DNS record),
  // so it cannot receive mail. Left empty on purpose until the owner confirms a working address.
  email: "",
  // Published on the studio's Facebook page (About > Contact info). Postcode 55100 is Bukit Bintang, Kuala Lumpur.
  address: "33-01-49 Menara Keck Seng, 203 Jalan Bukit Bintang, 55100 Bukit Bintang, Kuala Lumpur",
  // From the studio Instagram display name ("Mural Art 🇲🇾 🇸🇬"). Confirm with the owner.
  serviceAreas: ["Malaysia", "Singapore"],
  // The Facebook page lists its hours as "Always open".
  openingHours: { en: "Always open", ms: "Sentiasa dibuka" },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=33-01-49%20Menara%20Keck%20Seng%2C%20203%20Jalan%20Bukit%20Bintang%2C%2055100%20Kuala%20Lumpur",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=33-01-49%20Menara%20Keck%20Seng%2C%20203%20Jalan%20Bukit%20Bintang%2C%2055100%20Kuala%20Lumpur&output=embed",
  // Company accounts. Tracking parameters were removed and web.facebook.com was normalised to www.
  socials: [
    {
      platform: "instagram",
      href: "https://www.instagram.com/arrowspacestudio/",
      handle: "@arrowspacestudio",
    },
    {
      platform: "facebook",
      href: "https://www.facebook.com/FathilTheMuralist",
      handle: "Fathil The Muralist",
    },
    { platform: "tiktok", href: "https://www.tiktok.com/@fathil_art", handle: "@fathil_art" },
  ],

  established: "", // [OWNER]
  leadArtist: "Fathil Ahmad", // as written by the project owner (the Facebook page says "Ahmad Fathil Zakaria")
  // Personal accounts of the artist, shown as a credit in the About section only.
  leadArtistProfiles: [
    {
      platform: "instagram",
      href: "https://www.instagram.com/fathil.ahmad88/",
      handle: "@fathil.ahmad88",
    },
    {
      platform: "facebook",
      href: "https://www.facebook.com/fathil.ahmad/",
      handle: "Ahmad Fathil Zakaria",
    },
  ],
};

/**
 * DUMMY DETAILS — displayed only in demo mode so the layout looks complete.
 * Deliberately unrealistic ("Contoh" = example, ".example" is a reserved
 * domain). Never rendered as clickable links.
 */
export const demoDetails = {
  phone: "+60 1X-XXX XXXX",
  email: "hello@arrowspacestudio.example",
  address: "No. 00, Jalan Contoh, 00000 Bandar Contoh, Malaysia",
  serviceAreas: ["Kawasan Contoh A", "Kawasan Contoh B", "Lain-lain atas permintaan"],
  socials: ["instagram", "facebook", "tiktok"] as SocialPlatform[],
  socialHandle: "@muralstudio.sample",
  openingHours: {
    en: "Mon – Sat, 9.00am – 6.00pm",
    ms: "Isnin – Sabtu, 9.00 pagi – 6.00 petang",
  } as Localized,
  established: "20XX",
  leadArtist: "Nama Pelukis (contoh)",
};

export const seo: SeoConfig = {
  title: {
    en: "Arrow Space Studio — Mural Art & Commissioned Painting",
    ms: "Arrow Space Studio — Seni Mural & Lukisan Dinding",
  },
  description: {
    en: "Bespoke hand-painted murals for homes, cafes, hotels, offices and building exteriors. Explore selected work and start a project.",
    ms: "Mural lukisan tangan tempahan untuk rumah, kafe, hotel, pejabat dan luar bangunan. Lihat karya pilihan dan mulakan projek anda.",
  },
  siteUrl: "", // [OWNER] set once the domain is known
  ogImagePath: "/og-image.jpg",
  ogImageAlt: "Room painted as a spaceship cockpit, with a starfield window, a desk and an easel",
  indexable: false,
};

export const isDemo = business.contentStatus === "demo";

/** True when sample markers should be drawn (demo content AND the owner wants them visible). */
export const showSampleMarks = (): boolean => isDemo && business.showSampleLabels;

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

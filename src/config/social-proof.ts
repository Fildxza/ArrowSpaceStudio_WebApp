/**
 * TESTIMONIALS & CLIENT LOGOS
 * ---------------------------------------------------------------------------
 * Only add testimonials a real client has approved for publication, and only
 * logos you have permission to show. Never write or paraphrase quotes.
 *
 * While both lists are empty:
 *   - demo mode shows a clearly labelled placeholder layout (no invented quotes);
 *   - live mode hides the whole section.
 */
import type { Localized } from "@/i18n";
import { isDemo } from "./business";

export interface Testimonial {
  /** The client's own words, exactly as approved. */
  quote: Localized;
  name: string;
  /** e.g. "Owner, Kopi Lane Cafe". Leave empty if the client prefers. */
  role?: Localized;
  /** Optional portfolio project id (see portfolio.ts) this quote relates to. */
  projectId?: string;
}

export interface ClientLogo {
  name: string;
  /** Path to the logo image, e.g. imported from src/assets or placed in /public. */
  logo: string;
  href?: string;
}

export const testimonials: Testimonial[] = [
  // { quote: "…", name: "…", role: "…", projectId: "botanical-feature-wall" },
];

export const clientLogos: ClientLogo[] = [
  // { name: "Client Co.", logo: "/clients/client-co.svg", href: "https://…" },
];

/**
 * SAMPLE content shown ONLY in demo mode so the owner and the client can see the finished layout.
 * These are NOT real clients or quotes (names are "Sample Client …" and every card is tagged "Sample").
 * Replace by filling `testimonials` / `clientLogos` above; in live mode the section hides until then.
 */
export const demoTestimonials: Testimonial[] = [
  {
    quote: {
      en: "We wanted our son's room to feel like a spaceship. The result is beyond what we imagined — he asks to show it to every visitor.",
      ms: "Kami mahu bilik anak kami terasa seperti kapal angkasa. Hasilnya melebihi apa yang kami bayangkan — dia sentiasa mahu menunjukkannya kepada setiap tetamu.",
    },
    name: "Sample Client A",
    role: { en: "Homeowner", ms: "Pemilik rumah" },
  },
  {
    quote: {
      en: "Everything was explained clearly, from the first sketch to the final coat. The wall is now the first thing our visitors photograph.",
      ms: "Semuanya dijelaskan dengan jelas, dari lakaran pertama hingga lapisan akhir. Dinding itu kini perkara pertama yang difoto oleh pengunjung kami.",
    },
    name: "Sample Client B",
    role: { en: "Cafe owner", ms: "Pemilik kafe" },
  },
  {
    quote: {
      en: "The glow details look even better when the lights go down. Our friends can't stop talking about the room.",
      ms: "Butiran bercahaya kelihatan lebih cantik bila lampu dimalapkan. Kawan-kawan kami tak habis bercakap tentang bilik itu.",
    },
    name: "Sample Client C",
    role: { en: "Gaming room owner", ms: "Pemilik bilik permainan" },
  },
];

export const DEMO_LOGO_SLOTS = 6;

export type SocialProof =
  | { mode: "real"; testimonials: Testimonial[]; logos: ClientLogo[] }
  | { mode: "placeholder"; testimonials: Testimonial[]; logoSlots: number }
  | { mode: "hidden" };

/** Decide what the section should show. Pure so it can be tested. */
export function resolveSocialProof(
  real: { testimonials: Testimonial[]; logos: ClientLogo[] },
  demo: boolean,
): SocialProof {
  if (real.testimonials.length || real.logos.length) {
    return { mode: "real", testimonials: real.testimonials, logos: real.logos };
  }
  return demo
    ? { mode: "placeholder", testimonials: demoTestimonials, logoSlots: DEMO_LOGO_SLOTS }
    : { mode: "hidden" };
}

export const socialProof = resolveSocialProof({ testimonials, logos: clientLogos }, isDemo);

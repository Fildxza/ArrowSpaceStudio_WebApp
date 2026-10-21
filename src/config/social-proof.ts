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

/** Placeholder content shown ONLY in demo mode — obviously not real quotes. */
export const demoTestimonials: Testimonial[] = [
  {
    quote: {
      en: "[Client testimonial goes here — added only after a real client approves the wording.]",
      ms: "[Testimoni pelanggan di sini — hanya ditambah selepas pelanggan sebenar meluluskan ayatnya.]",
    },
    name: "Client Name",
    role: { en: "Role, Company", ms: "Jawatan, Syarikat" },
  },
  {
    quote: {
      en: "[A second approved testimonial — ideally from a commercial or hospitality project.]",
      ms: "[Testimoni kedua yang diluluskan — sebaiknya daripada projek komersial atau hospitaliti.]",
    },
    name: "Client Name",
    role: { en: "Role, Company", ms: "Jawatan, Syarikat" },
  },
  {
    quote: {
      en: "[A third approved testimonial — for example from a residential commission.]",
      ms: "[Testimoni ketiga yang diluluskan — contohnya daripada tempahan kediaman.]",
    },
    name: "Client Name",
    role: { en: "Homeowner", ms: "Pemilik rumah" },
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

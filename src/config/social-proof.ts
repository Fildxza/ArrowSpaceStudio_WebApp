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
import { isDemo } from "./business";

export interface Testimonial {
  /** The client's own words, exactly as approved. */
  quote: string;
  name: string;
  /** e.g. "Owner, Kopi Lane Cafe". Leave empty if the client prefers. */
  role?: string;
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
    quote: "[Client testimonial goes here — added only after a real client approves the wording.]",
    name: "Client Name",
    role: "Role, Company",
  },
  {
    quote: "[A second approved testimonial — ideally from a commercial or hospitality project.]",
    name: "Client Name",
    role: "Role, Company",
  },
  {
    quote: "[A third approved testimonial — for example from a residential commission.]",
    name: "Client Name",
    role: "Homeowner",
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

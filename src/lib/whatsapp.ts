import { business } from "@/config/business";
import { fmt, type Lang } from "@/i18n";
import { copy } from "@/i18n/copy";

/** Strip everything except digits. "+60 12-345 6789" -> "60123456789". */
export function normalizePhone(raw: string): string {
  return raw.replace(/\D+/g, "");
}

/**
 * E.164 allows at most 15 digits. Anything shorter than 8 digits cannot be a
 * complete international number, so it is treated as "not configured".
 */
export function isValidWhatsAppNumber(raw: string): boolean {
  const digits = normalizePhone(raw);
  return digits.length >= 8 && digits.length <= 15 && !/^0+$/.test(digits);
}

/** Default (English) enquiry text; use `defaultEnquiryMessage(lang)` for the visitor's language. */
export const DEFAULT_ENQUIRY_MESSAGE = copy.en.messages.default;

export function defaultEnquiryMessage(lang: Lang = "en"): string {
  return copy[lang].messages.default;
}

export function questionMessage(lang: Lang = "en"): string {
  return copy[lang].messages.question;
}

export interface WhatsAppOptions {
  /** Override the configured number (used by tests). */
  number?: string;
}

/** True when a usable WhatsApp number has been supplied by the owner. */
export function isWhatsAppConfigured(options: WhatsAppOptions = {}): boolean {
  return isValidWhatsAppNumber(options.number ?? business.whatsappNumber);
}

/**
 * Build a wa.me link. Returns `null` when no valid number is configured so
 * callers must handle the unavailable state instead of opening a bad link.
 */
export function buildWhatsAppUrl(
  message: string = DEFAULT_ENQUIRY_MESSAGE,
  options: WhatsAppOptions = {},
): string | null {
  const number = options.number ?? business.whatsappNumber;
  if (!isValidWhatsAppNumber(number)) return null;
  return `https://wa.me/${normalizePhone(number)}?text=${encodeURIComponent(message)}`;
}

/** Message for a specific service category, e.g. from a service enquiry link. */
export function serviceEnquiryMessage(serviceTitle: string, lang: Lang = "en"): string {
  return fmt(copy[lang].messages.service, { title: serviceTitle.toLowerCase() });
}

export interface EnquiryBrief {
  projectType?: string;
  location?: string;
  wallSize?: string;
  timeline?: string;
  notes?: string;
}

/** Compose a structured enquiry message from the optional brief fields. */
export function composeEnquiryMessage(brief: EnquiryBrief, lang: Lang = "en"): string {
  const text = copy[lang].messages;
  const type = brief.projectType?.trim();
  const lines: string[] = [type ? serviceEnquiryMessage(type, lang) : text.default];
  const details: [string, string | undefined][] = [
    [text.location, brief.location],
    [text.wallSize, brief.wallSize],
    [text.timeline, brief.timeline],
    [text.notes, brief.notes],
  ];
  const filled = details.filter(([, v]) => v && v.trim());
  if (filled.length) {
    lines.push("", ...filled.map(([k, v]) => `${k}: ${v!.trim()}`));
  }
  return lines.join("\n");
}

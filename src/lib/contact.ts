import { business } from "@/config/business";
import { isValidWhatsAppNumber, normalizePhone } from "./whatsapp";

/** Number used for voice calls: the dedicated phone number, else the WhatsApp number. */
export function callNumber(config = business): string {
  return config.phoneNumber.trim() || config.whatsappNumber.trim();
}

/** `tel:` link, or null when no valid number has been supplied. */
export function buildTelUrl(number: string = callNumber()): string | null {
  return isValidWhatsAppNumber(number) ? `tel:+${normalizePhone(number)}` : null;
}

/**
 * Human-readable phone number. Malaysian mobiles are grouped ("+60 13-251 2588");
 * any other number is shown as "+<digits>".
 */
export function displayPhone(number: string = callNumber()): string {
  const digits = normalizePhone(number);
  if (!digits) return "";
  if (digits.startsWith("60") && (digits.length === 11 || digits.length === 12)) {
    const national = digits.slice(2);
    const prefix = national.slice(0, 2);
    const rest = national.slice(2);
    const cut = rest.length === 7 ? 3 : 4;
    return `+60 ${prefix}-${rest.slice(0, cut)} ${rest.slice(cut)}`;
  }
  return `+${digits}`;
}

/** Google Maps directions link for an address (no API key needed). */
export function directionsUrl(address: string): string | null {
  const a = address.trim();
  return a ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a)}` : null;
}

/** `mailto:` link with an optional subject, or null without an email. */
export function buildMailto(email: string = business.email, subject?: string): string | null {
  const e = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) || e.endsWith(".example")) return null;
  return subject ? `mailto:${e}?subject=${encodeURIComponent(subject)}` : `mailto:${e}`;
}

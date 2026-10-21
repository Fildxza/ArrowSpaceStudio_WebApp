import { afterEach, beforeEach } from "vitest";
import { business } from "@/config/business";

/**
 * Registers hooks that temporarily clear the WhatsApp and phone numbers, to
 * prove the site stays safe when contact details are missing. The real
 * (owner-approved) values are restored after every test.
 */
export function withoutContactNumbers() {
  let saved = { whatsapp: "", phone: "" };
  beforeEach(() => {
    saved = { whatsapp: business.whatsappNumber, phone: business.phoneNumber };
    business.whatsappNumber = "";
    business.phoneNumber = "";
  });
  afterEach(() => {
    business.whatsappNumber = saved.whatsapp;
    business.phoneNumber = saved.phone;
  });
}

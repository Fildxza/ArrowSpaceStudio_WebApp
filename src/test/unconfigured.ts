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

/**
 * Registers hooks that turn the "Sample" / "Proposed" / "Preview" markers back on
 * (`business.showSampleLabels`, off by default) for the tests inside the current describe block.
 */
export function withSampleLabels() {
  let saved = false;
  beforeEach(() => {
    saved = business.showSampleLabels;
    business.showSampleLabels = true;
  });
  afterEach(() => {
    business.showSampleLabels = saved;
  });
}

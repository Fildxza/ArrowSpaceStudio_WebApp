import { describe, expect, it } from "vitest";
import { business } from "@/config/business";
import {
  DEFAULT_ENQUIRY_MESSAGE,
  buildWhatsAppUrl,
  composeEnquiryMessage,
  isValidWhatsAppNumber,
  isWhatsAppConfigured,
  normalizePhone,
  serviceEnquiryMessage,
} from "@/lib/whatsapp";

// Harmless test number (not a real destination).
const TEST_NUMBER = "+60 12-000 0000";

describe("WhatsApp helper", () => {
  it("normalises formatted numbers to digits", () => {
    expect(normalizePhone(TEST_NUMBER)).toBe("60120000000");
  });

  it("rejects empty, too short, too long and all-zero numbers", () => {
    expect(isValidWhatsAppNumber("")).toBe(false);
    expect(isValidWhatsAppNumber("1234")).toBe(false);
    expect(isValidWhatsAppNumber("1".repeat(16))).toBe(false);
    expect(isValidWhatsAppNumber("00000000000")).toBe(false);
    expect(isValidWhatsAppNumber(TEST_NUMBER)).toBe(true);
  });

  it("builds a wa.me link with a correctly encoded message", () => {
    const url = buildWhatsAppUrl("Hi & hello? 100% — mural #1\nLine 2", { number: TEST_NUMBER });
    expect(url).toBe(
      "https://wa.me/60120000000?text=Hi%20%26%20hello%3F%20100%25%20%E2%80%94%20mural%20%231%0ALine%202",
    );
    expect(new URL(url!).searchParams.get("text")).toBe("Hi & hello? 100% — mural #1\nLine 2");
  });

  it("uses the default enquiry message", () => {
    const url = buildWhatsAppUrl(undefined, { number: TEST_NUMBER })!;
    expect(new URL(url).searchParams.get("text")).toBe(DEFAULT_ENQUIRY_MESSAGE);
  });

  it("returns null instead of a link when no valid number is configured", () => {
    expect(buildWhatsAppUrl("Hi", { number: "" })).toBeNull();
    expect(buildWhatsAppUrl("Hi", { number: "60000" })).toBeNull();
  });

  it("uses the owner-approved number from the TikTok bio, in valid international form", () => {
    expect(business.whatsappNumber).toBe("60132512588");
    expect(isWhatsAppConfigured()).toBe(true);
    expect(buildWhatsAppUrl("Hi")).toBe("https://wa.me/60132512588?text=Hi");
  });

  it("includes the selected service in service enquiries", () => {
    expect(serviceEnquiryMessage("Exterior & Building")).toContain("exterior & building");
  });

  it("composes a structured brief and skips empty fields", () => {
    const msg = composeEnquiryMessage({
      projectType: "Residential Murals",
      location: " Shah Alam ",
      wallSize: "",
      timeline: "Flexible",
    });
    expect(msg).toContain("interested in residential murals");
    expect(msg).toContain("Location: Shah Alam");
    expect(msg).toContain("Preferred timeline: Flexible");
    expect(msg).not.toContain("wall size");
    expect(composeEnquiryMessage({})).toBe(DEFAULT_ENQUIRY_MESSAGE);
  });
});

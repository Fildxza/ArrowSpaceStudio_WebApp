import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WhatsAppChat } from "@/components/site/WhatsAppChat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { business } from "@/config/business";
import { chat as chatConfig } from "@/config/content";
import { closeChat, composeChatMessage } from "@/lib/chat";
import { serviceEnquiryMessage } from "@/lib/whatsapp";

// Harmless test number (not a real destination).
const TEST_NUMBER = "60120000000";

function setup(options: { number?: string } = {}) {
  business.whatsappNumber = options.number ?? "";
  // Skip the typing animation so the conversation is immediately ready.
  vi.spyOn(window, "matchMedia").mockImplementation(
    (q: string) =>
      ({
        matches: q.includes("reduce"),
        media: q,
        addEventListener() {},
        removeEventListener() {},
      }) as unknown as MediaQueryList,
  );
  return render(
    <>
      <WhatsAppLink className="open-btn">Chat on WhatsApp</WhatsAppLink>
      <WhatsAppLink
        message={serviceEnquiryMessage("Exterior & Building")}
        topic="Exterior & Building"
        className="svc-btn"
      >
        Enquire exterior
      </WhatsAppLink>
      <WhatsAppChat />
    </>,
  );
}

const panel = () => screen.getByRole("dialog", { hidden: true });

beforeEach(() => {
  business.whatsappNumber = "";
});
afterEach(() => {
  act(() => closeChat());
  business.whatsappNumber = "";
  vi.restoreAllMocks();
});

describe("composeChatMessage", () => {
  it("appends trimmed details after a blank line", () => {
    expect(composeChatMessage("Hi", "  Shah Alam, 4m x 3m ")).toBe("Hi\n\nShah Alam, 4m x 3m");
    expect(composeChatMessage("Hi", "   ")).toBe("Hi");
  });
});

describe("<WhatsAppChat />", () => {
  it("is closed and hidden from assistive tech until opened", () => {
    setup();
    expect(panel()).toHaveAttribute("aria-hidden", "true");
  });

  it("opens with a greeting and a ready-to-send default message", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Chat on WhatsApp" }));
    const p = within(panel());
    expect(panel()).toHaveAttribute("aria-hidden", "false");
    expect(p.getByText(chatConfig.greeting)).toBeInTheDocument();
    expect(p.getByRole("button", { name: "I'd like a quotation" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(p.getByText(/request a quotation/i)).toBeInTheDocument();
  });

  it("switches the prepared message with a quick reply", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Chat on WhatsApp" }));
    const p = within(panel());
    fireEvent.click(p.getByRole("button", { name: "I have a question" }));
    expect(p.getByText("Hi, I have a question about your mural services.")).toBeInTheDocument();
    expect(p.getByRole("button", { name: "I have a question" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("preselects the topic when opened from a service link", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Enquire exterior" }));
    const p = within(panel());
    expect(p.getByRole("button", { name: "Exterior & Building" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(p.getByText(/exterior & building/i, { selector: "p" })).toBeInTheDocument();
  });

  it("disables sending and never opens a window while no number is configured", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Chat on WhatsApp" }));
    const send = within(panel()).getByRole("button", { name: /Send \(number pending\)/ });
    expect(send).toBeDisabled();
    fireEvent.click(send);
    expect(open).not.toHaveBeenCalled();
  });

  it("opens WhatsApp with the prefilled, encoded message when a number is configured", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    setup({ number: TEST_NUMBER });
    fireEvent.click(screen.getByRole("link", { name: /Chat on WhatsApp/ }));
    const p = within(panel());
    fireEvent.change(p.getByPlaceholderText(/Add details/), {
      target: { value: "Shah Alam & Klang" },
    });
    fireEvent.click(p.getByRole("button", { name: "Send on WhatsApp" }));

    expect(open).toHaveBeenCalledTimes(1);
    const [url, target, features] = open.mock.calls[0]!;
    expect(String(url)).toMatch(/^https:\/\/wa\.me\/60120000000\?text=/);
    const text = new URL(String(url)).searchParams.get("text")!;
    expect(text).toContain("request a quotation");
    expect(text).toContain("Shah Alam & Klang");
    expect(target).toBe("_blank");
    expect(features).toContain("noopener");
    expect(panel()).toHaveAttribute("aria-hidden", "true");
  });

  it("closes with Escape and the close button, returning focus to the opener", () => {
    setup();
    const opener = screen.getByRole("button", { name: "Chat on WhatsApp" });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(panel()).toHaveAttribute("aria-hidden", "true");
    expect(document.activeElement).toBe(opener);

    fireEvent.click(opener);
    fireEvent.click(within(panel()).getByRole("button", { name: "Close chat" }));
    expect(panel()).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps wa.me links usable with ctrl-click (new tab) and without JavaScript", () => {
    setup({ number: TEST_NUMBER });
    const link = screen.getByRole("link", { name: /Chat on WhatsApp/ });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/60120000000"));
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(link, { ctrlKey: true });
    expect(panel()).toHaveAttribute("aria-hidden", "true");
  });
});

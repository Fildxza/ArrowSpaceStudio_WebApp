import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { business } from "@/config/business";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { announceEnquiry } from "@/lib/enquiry";
import { withoutContactNumbers, withSampleLabels } from "./unconfigured";
import { Contact } from "@/components/site/Contact";

afterEach(() => vi.restoreAllMocks());

describe("contact safety without a configured number", () => {
  withoutContactNumbers();
  it("never renders a wa.me link", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('a[href*="wa.me"]')).toBeNull();
    // The WhatsApp button still opens the chat panel, which explains the pending number.
    expect(screen.getByRole("button", { name: /Chat on WhatsApp/ })).toHaveAttribute(
      "aria-haspopup",
      "dialog",
    );
  });

  it("does not turn sample contact details into links", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    // Sample tags are hidden by default so the page looks finished.
    expect(screen.queryAllByText("Sample")).toHaveLength(0);
  });

  describe("with sample labels switched on", () => {
    withSampleLabels();
    it("tags the sample contact details", () => {
      render(<Contact />);
      expect(screen.getAllByText("Sample").length).toBeGreaterThan(0);
    });
  });

  it("renders a plain button, not a link, without a number", () => {
    render(<WhatsAppLink>Enquire</WhatsAppLink>);
    expect(screen.queryByRole("link", { name: "Enquire" })).toBeNull();
    expect(screen.getByRole("button", { name: "Enquire" })).toBeInTheDocument();
  });
});

describe("contact with the owner-approved number", () => {
  it("links WhatsApp to the approved number and marks it as a real detail", () => {
    const { container } = render(<Contact />);
    const link = container.querySelector('a[href^="https://wa.me/60132512588"]');
    expect(link).not.toBeNull();
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getAllByText("+60 13-251 2588").length).toBeGreaterThan(0);
  });
});

describe("<EnquiryForm />", () => {
  it("requires a project type and shows an accessible error", () => {
    render(<EnquiryForm />);
    fireEvent.click(screen.getByRole("button", { name: "Copy brief" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/choose the type of project/i);
  });

  it("disables WhatsApp sending until a number is configured", () => {
    const saved = business.whatsappNumber;
    business.whatsappNumber = "";
    render(<EnquiryForm />);
    expect(screen.getByRole("button", { name: /Send brief on WhatsApp/ })).toBeDisabled();
    business.whatsappNumber = saved;
  });

  it("pre-selects the service announced by a service link", () => {
    render(<EnquiryForm />);
    act(() => announceEnquiry("themed"));
    expect(screen.getByRole("radio", { name: "Themed Rooms" })).toBeChecked();
  });

  it("only reports success when the clipboard write succeeds", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<EnquiryForm />);
    fireEvent.click(screen.getByRole("radio", { name: "Space & Galaxy Murals" }));
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy brief" })));
    expect(screen.queryByText(/copied to your clipboard/i)).toBeNull();
    expect(screen.getByText(/blocked copying/i)).toBeInTheDocument();

    writeText.mockResolvedValue(undefined);
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy brief" })));
    expect(writeText).toHaveBeenLastCalledWith(expect.stringContaining("space & galaxy murals"));
    expect(screen.getByText(/copied to your clipboard/i)).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobileCTA } from "@/components/site/MobileCTA";
import { Testimonials } from "@/components/site/Testimonials";
import { withoutContactNumbers } from "./unconfigured";
import {
  DEMO_LOGO_SLOTS,
  clientLogos,
  demoTestimonials,
  resolveSocialProof,
  testimonials,
} from "@/config/social-proof";

const real = {
  testimonials: [{ quote: "Approved quote.", name: "A. Client", role: "Owner, Test Co." }],
  logos: [{ name: "Test Co.", logo: "/clients/test.svg" }],
};

describe("social proof resolution", () => {
  it("ships no real testimonials or logos yet", () => {
    expect(testimonials).toEqual([]);
    expect(clientLogos).toEqual([]);
  });

  it("hides the section in live mode until real content exists", () => {
    expect(resolveSocialProof({ testimonials: [], logos: [] }, false)).toEqual({ mode: "hidden" });
  });

  it("shows clearly-marked placeholders only in demo mode", () => {
    const r = resolveSocialProof({ testimonials: [], logos: [] }, true);
    expect(r.mode).toBe("placeholder");
    for (const t of demoTestimonials) expect(t.quote).toMatch(/^\[.*\]$/);
  });

  it("prefers real content whenever it exists", () => {
    expect(resolveSocialProof(real, true).mode).toBe("real");
  });
});

describe("<Testimonials />", () => {
  it("renders nothing when hidden", () => {
    const { container } = render(<Testimonials data={{ mode: "hidden" }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("labels placeholder slots and cycles through quotes", () => {
    render(
      <Testimonials
        data={{ mode: "placeholder", testimonials: demoTestimonials, logoSlots: DEMO_LOGO_SLOTS }}
      />,
    );
    expect(screen.getByText(/Client Voices — Placeholder/)).toBeInTheDocument();
    expect(screen.getAllByText("Client Logo")).toHaveLength(DEMO_LOGO_SLOTS);
    expect(screen.getByRole("blockquote")).toHaveTextContent(demoTestimonials[0]!.quote);
    fireEvent.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByRole("blockquote")).toHaveTextContent(demoTestimonials[1]!.quote);
    fireEvent.click(screen.getByRole("button", { name: "Previous testimonial" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous testimonial" }));
    expect(screen.getByRole("blockquote")).toHaveTextContent(demoTestimonials.at(-1)!.quote);
  });

  it("renders real logos with their names as alt text", () => {
    render(<Testimonials data={{ mode: "real", ...real }} />);
    expect(screen.getByRole("img", { name: "Test Co." })).toBeInTheDocument();
    expect(screen.queryByText(/Placeholder/)).toBeNull();
  });
});

describe("<MobileCTA />", () => {
  withoutContactNumbers();
  it("opens the chat panel (no wa.me link) while no WhatsApp number is set", () => {
    const { container } = render(<MobileCTA />);
    expect(container.querySelector('a[href*="wa.me"]')).toBeNull();
    expect(screen.getByRole("button", { name: /Chat/, hidden: true })).toHaveAttribute(
      "aria-haspopup",
      "dialog",
    );
  });

  it("starts hidden from assistive tech until the hero is scrolled past", () => {
    render(<MobileCTA />);
    expect(screen.getByRole("complementary", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});

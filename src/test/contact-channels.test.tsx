import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { ContactDock } from "@/components/site/ContactDock";
import { Location } from "@/components/site/Location";
import { SocialLinks } from "@/components/site/SocialIcons";
import { business } from "@/config/business";
import { comparison } from "@/config/content";
import { buildMailto, buildTelUrl, callNumber, directionsUrl } from "@/lib/contact";

describe("contact helpers", () => {
  it("builds tel: links only for valid numbers", () => {
    expect(buildTelUrl("+60 12-000 0000")).toBe("tel:+60120000000");
    expect(buildTelUrl("")).toBeNull();
    expect(buildTelUrl("123")).toBeNull();
  });

  it("falls back from phone to WhatsApp number", () => {
    expect(callNumber({ ...business, phoneNumber: "", whatsappNumber: "60120000000" })).toBe(
      "60120000000",
    );
    expect(
      callNumber({ ...business, phoneNumber: "60130000000", whatsappNumber: "60120000000" }),
    ).toBe("60130000000");
  });

  it("encodes directions and rejects reserved demo emails", () => {
    expect(directionsUrl("No. 1, Jalan A & B")).toContain(
      "destination=No.%201%2C%20Jalan%20A%20%26%20B",
    );
    expect(directionsUrl("  ")).toBeNull();
    expect(buildMailto("hello@muralstudio.example")).toBeNull();
    expect(buildMailto("hi@studio.my", "Mural enquiry")).toBe(
      "mailto:hi@studio.my?subject=Mural%20enquiry",
    );
  });

  it("ships without a fabricated phone number", () => {
    expect(business.phoneNumber).toBe("");
    expect(buildTelUrl()).toBeNull();
  });
});

describe("<SocialLinks />", () => {
  it("links the confirmed TikTok profile safely and shows no other platforms", () => {
    const { container } = render(<SocialLinks showHandle />);
    const link = screen.getByRole("link", { name: /TikTok @fathil_art/ });
    expect(link).toHaveAttribute("href", "https://www.tiktok.com/@fathil_art");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(container.querySelectorAll("a")).toHaveLength(1);
    expect(screen.queryByText(/Instagram|Facebook/)).toBeNull();
    expect(screen.getByText("@fathil_art")).toBeInTheDocument();
  });

  it("keeps the tracking parameters out of the stored profile URL", () => {
    for (const s of business.socials) expect(new URL(s.href).search).toBe("");
  });

  it("falls back to non-clickable samples in demo mode when no profile is configured", () => {
    const saved = business.socials;
    business.socials = [];
    try {
      const { container } = render(<SocialLinks />);
      expect(container.querySelectorAll("a")).toHaveLength(0);
      for (const name of ["Instagram", "Facebook", "TikTok"]) {
        expect(screen.getByText(`${name} (sample, link pending)`)).toBeInTheDocument();
      }
    } finally {
      business.socials = saved;
    }
  });
});

describe("<Location />", () => {
  it("shows the sample address and map without contacting Google", () => {
    const { container } = render(<Location />);
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector('a[href*="google.com/maps"]')).toBeNull();
    expect(screen.getByText(/Jalan Contoh/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /sample map/i })).toBeInTheDocument();
    expect(screen.getByText("Get directions").closest("[aria-disabled]")).not.toBeNull();
  });
});

describe("<ContactDock />", () => {
  it("toggles the speed-dial and keeps unconfigured channels disabled", () => {
    render(<ContactDock />);
    const toggle = screen.getByRole("button", { name: "Contact the studio", hidden: true });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const menu = screen.getByRole("list", { name: "Contact options", hidden: true });
    expect(within(menu).getByText("Call").closest("[aria-disabled]")).not.toBeNull();
    expect(within(menu).getByText("Email").closest("[aria-disabled]")).not.toBeNull();
    expect(within(menu).getByText("Build a brief").closest("a")).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(menu.querySelector('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]')).toBeNull();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

describe("<BeforeAfter />", () => {
  it("moves the divider with the accessible range control", () => {
    const { container } = render(
      <BeforeAfter before={comparison.before} after={comparison.after} label="Compare" />,
    );
    const range = screen.getByRole("slider", { name: "Compare" });
    expect(range).toHaveValue("50");
    fireEvent.change(range, { target: { value: "20" } });
    expect(range).toHaveValue("20");
    expect((container.firstChild as HTMLElement).style.getPropertyValue("--pos")).toBe("20%");
  });
});

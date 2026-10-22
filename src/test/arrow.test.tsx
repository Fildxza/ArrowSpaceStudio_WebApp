import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { About } from "@/components/site/About";
import { Lightbox } from "@/components/site/Lightbox";
import { business, seo } from "@/config/business";
import { projects } from "@/config/portfolio";
import { pick, resetLangForTests } from "@/i18n";

beforeEach(() => resetLangForTests("en"));
afterEach(() => resetLangForTests("en"));

describe("Arrow Space Studio company data", () => {
  it("uses the confirmed company name everywhere it is configured", () => {
    expect(business.name).toBe("Arrow Space Studio");
    expect(pick(seo.title, "en")).toContain("Arrow Space Studio");
    expect(pick(seo.title, "ms")).toContain("Arrow Space Studio");
  });

  it("keeps the company accounts separate from the artist's personal ones", () => {
    const companyHrefs = business.socials.map((s) => s.href);
    expect(companyHrefs).toEqual([
      "https://www.instagram.com/arrowspacestudio/",
      "https://www.facebook.com/FathilTheMuralist",
      "https://www.tiktok.com/@fathil_art",
    ]);
    for (const personal of business.leadArtistProfiles) {
      expect(companyHrefs).not.toContain(personal.href);
    }
  });

  it("keeps the owner's WhatsApp number instead of the Facebook page phone", () => {
    expect(business.whatsappNumber).toBe("60132512588");
    expect(business.whatsappNumber).not.toContain("1115557");
    expect(business.phoneNumber).toBe("");
  });
});

describe("<About /> artist section", () => {
  it("credits the lead artist and links the personal profiles safely", () => {
    render(<About />);
    expect(screen.getByText("Fathil Ahmad")).toBeInTheDocument();
    expect(screen.getByText("Mural · Painting · Special effects")).toBeInTheDocument();

    const artistHeading = screen.getByText("The artist's own profiles");
    const list = artistHeading.parentElement!;
    const links = within(list).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      business.leadArtistProfiles.map((p) => p.href),
    );
    for (const a of links) expect(a).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("quotes the studio's own words and flags them for confirmation", () => {
    render(<About />);
    expect(screen.getByText(/Synergized by four brothers/)).toBeInTheDocument();
    expect(screen.getByText(/to be confirmed with the owner/i)).toBeInTheDocument();
  });
});

describe("<Lightbox /> before/after support", () => {
  const base = projects[0]!;
  const noop = () => {};

  it("shows a drag-to-compare slider only when a project has a before image", () => {
    const withBefore = { ...base, before: projects[1]!.image };
    const { rerender } = render(
      <Lightbox items={[withBefore]} index={0} onIndexChange={noop} onClose={noop} />,
    );
    const slider = screen.getByRole("slider", { hidden: true });
    fireEvent.change(slider, { target: { value: "30" } });
    expect(slider).toHaveValue("30");

    rerender(<Lightbox items={[base]} index={0} onIndexChange={noop} onClose={noop} />);
    expect(screen.queryByRole("slider", { hidden: true })).toBeNull();
  });
});

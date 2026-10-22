import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Follow } from "@/components/site/Follow";
import { Hero } from "@/components/site/Hero";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { WhatsAppChat } from "@/components/site/WhatsAppChat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { business, seo } from "@/config/business";
import {
  about,
  enquiryChecklist,
  marquee,
  nav,
  philosophy,
  process,
  services,
} from "@/config/content";
import { projects } from "@/config/portfolio";
import { fmt, getLang, pick, resetLangForTests, setLang } from "@/i18n";
import { copy } from "@/i18n/copy";
import { closeChat } from "@/lib/chat";
import { composeEnquiryMessage, serviceEnquiryMessage } from "@/lib/whatsapp";

/** Flatten a nested dictionary into { "a.b.c": "text" }. */
function flatten(obj: unknown, prefix = "", out: Record<string, string> = {}) {
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") out[key] = v;
    else flatten(v, key, out);
  }
  return out;
}
const tokens = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

beforeEach(() => {
  window.localStorage.clear();
  resetLangForTests("en");
});
afterEach(() => {
  act(() => closeChat());
  resetLangForTests("en");
  window.localStorage.clear();
});

describe("dictionary completeness", () => {
  const en = flatten(copy.en);
  const ms = flatten(copy.ms);

  it("has the same keys in English and Bahasa Melayu", () => {
    expect(Object.keys(ms).sort()).toEqual(Object.keys(en).sort());
  });

  it("has no empty strings", () => {
    for (const [k, v] of [...Object.entries(en), ...Object.entries(ms)]) {
      expect(v.trim(), k).not.toBe("");
    }
  });

  it("keeps {tokens} identical across languages", () => {
    for (const k of Object.keys(en)) expect(tokens(ms[k]!), k).toEqual(tokens(en[k]!));
  });

  it("actually translates (BM text differs from EN for sentences)", () => {
    // The language buttons are intentionally written in their own language in both dictionaries.
    const ownLanguage = (k: string) =>
      k.startsWith("nav.switchTo") || k.startsWith("nav.languageShort");
    const same = Object.keys(en).filter(
      (k) => !ownLanguage(k) && en[k] === ms[k] && en[k]!.length > 14,
    );
    expect(same).toEqual([]);
  });
});

describe("localized content config", () => {
  const pairs = [
    ...nav.map((n) => n.label),
    ...services.flatMap((s) => [s.title, s.summary, s.image.alt]),
    ...process.flatMap((p) => [p.title, p.text]),
    ...marquee,
    ...enquiryChecklist,
    ...about.paragraphs,
    ...about.principles.flatMap((p) => [p.title, p.text]),
    ...about.profile.map((r) => r.label),
    philosophy.lead,
    philosophy.emphasis,
    philosophy.support,
    seo.title,
    seo.description,
    business.tagline,
    ...projects.flatMap((p) => [p.title, p.description, p.image.alt]),
  ];

  it("provides both languages for every owner-editable text", () => {
    for (const text of pairs) {
      expect(pick(text, "en").trim()).not.toBe("");
      expect(pick(text, "ms").trim()).not.toBe("");
    }
    // Demo images stay labelled as demonstration in both languages.
    for (const p of projects.filter((x) => x.status === "demo")) {
      expect(pick(p.image.alt, "ms")).toMatch(/demonstrasi/i);
    }
  });
});

describe("helpers", () => {
  it("fmt replaces known tokens and leaves unknown ones", () => {
    expect(fmt("Hi {name}, {x}", { name: "A" })).toBe("Hi A, {x}");
  });

  it("builds WhatsApp messages in the chosen language", () => {
    expect(serviceEnquiryMessage("Mural Kediaman", "ms")).toBe(
      "Hai, saya berminat dengan mural kediaman. Saya ingin berbincang tentang projek saya dan mohon sebut harga.",
    );
    expect(serviceEnquiryMessage("Residential Murals")).toContain("residential murals");
    const ms = composeEnquiryMessage(
      { projectType: "Mural Kediaman", location: "Shah Alam" },
      "ms",
    );
    expect(ms).toContain("Lokasi: Shah Alam");
    expect(ms.startsWith("Hai,")).toBe(true);
  });
});

describe("language switching", () => {
  it("persists the choice and updates the hero copy", () => {
    render(
      <>
        <LanguageSwitch />
        <Hero />
      </>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Walls");
    expect(screen.getByRole("button", { name: "Switch to English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Tukar ke Bahasa Melayu" }));
    expect(getLang()).toBe("ms");
    expect(window.localStorage.getItem("site-lang")).toBe("ms");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Dinding");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Bercerita.");
    expect(screen.getByRole("link", { name: /Lihat Karya Kami/ })).toBeInTheDocument();
    expect(screen.getByAltText(/Mural galaksi menutupi siling/)).toBeInTheDocument();
  });

  it("keeps the visitor's form choices when the language changes", () => {
    render(<EnquiryForm />);
    fireEvent.click(screen.getByRole("radio", { name: "Commercial Murals" }));
    fireEvent.change(screen.getByPlaceholderText("City / area"), { target: { value: "Klang" } });

    act(() => setLang("ms"));
    expect(screen.getByRole("radio", { name: "Mural Komersial" })).toBeChecked();
    expect(screen.getByPlaceholderText("Bandar / kawasan")).toHaveValue("Klang");
    expect(screen.getByText(/Hai, saya berminat dengan mural komersial/)).toBeInTheDocument();
    expect(screen.getByText(/Lokasi: Klang/)).toBeInTheDocument();
  });
});

describe("WhatsApp chat in Bahasa Melayu", () => {
  it("greets in BM and sends a BM message to the approved number", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    vi.spyOn(window, "matchMedia").mockImplementation(
      (q: string) =>
        ({
          matches: q.includes("reduce"),
          media: q,
          addEventListener() {},
          removeEventListener() {},
        }) as unknown as MediaQueryList,
    );
    act(() => setLang("ms"));
    render(
      <>
        <WhatsAppLink replyId="exterior">Tanya</WhatsAppLink>
        <WhatsAppChat />
      </>,
    );
    fireEvent.click(screen.getByRole("link", { name: "Tanya" }));
    const dialog = screen.getByRole("dialog", { hidden: true });
    const p = within(dialog);
    expect(p.getByText(copy.ms.chat.greeting)).toBeInTheDocument();
    expect(p.getByRole("button", { name: "Luaran & Bangunan" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(p.getByRole("button", { name: copy.ms.chat.send }));
    const url = String(open.mock.calls[0]![0]);
    expect(url).toMatch(/^https:\/\/wa\.me\/60132512588\?text=/);
    expect(new URL(url).searchParams.get("text")).toContain(
      "Hai, saya berminat dengan luaran & bangunan.",
    );
    vi.restoreAllMocks();
  });
});

describe("<Follow />", () => {
  it("lists the three confirmed profiles", () => {
    render(<Follow />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /^TikTok @fathil_art/ })).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@fathil_art",
    );
  });

  it("renders nothing without profiles", () => {
    const saved = business.socials;
    business.socials = [];
    try {
      const { container } = render(<Follow />);
      expect(container).toBeEmptyDOMElement();
    } finally {
      business.socials = saved;
    }
  });
});

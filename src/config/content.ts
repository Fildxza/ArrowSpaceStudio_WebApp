/**
 * SITE COPY & STRUCTURE
 * ---------------------------------------------------------------------------
 * Services, process, navigation and About copy, in English (`en`) and Bahasa
 * Melayu (`ms`). All of it is PROPOSED content to be confirmed by the company —
 * nothing here is a verified claim. UI labels live in src/i18n/copy.ts.
 */
import type { Localized } from "@/i18n";
import { business, demoDetails, detail, detailList, type Detail } from "./business";
import { getImage, type SiteImage } from "./images";

export interface NavEntry {
  label: Localized;
  href: `#${string}`;
}

export const nav: NavEntry[] = [
  { label: { en: "Services", ms: "Perkhidmatan" }, href: "#services" },
  { label: { en: "Selected Work", ms: "Karya Pilihan" }, href: "#work" },
  { label: { en: "Process", ms: "Proses" }, href: "#process" },
  { label: { en: "About", ms: "Tentang" }, href: "#about" },
  { label: { en: "Contact", ms: "Hubungi" }, href: "#contact" },
];

/** Set true once the company has confirmed the service list below. */
export const servicesConfirmed = false;

export interface ServiceItem {
  id: string;
  title: Localized;
  summary: Localized;
  image: SiteImage;
}

// Proposed services — based on the work visible on the studio's Instagram and Facebook
// (Facebook intro: "Mural / Painting / Special Effect"). Confirm with the company.
export const services: ServiceItem[] = [
  {
    id: "galaxy",
    title: { en: "Space & Galaxy Murals", ms: "Mural Angkasa & Galaksi" },
    summary: {
      en: "Nebulae, planets and starfields painted across walls and ceilings.",
      ms: "Nebula, planet dan medan bintang dilukis pada dinding dan siling.",
    },
    image: getImage("arrow-galaxy-ceiling", {
      en: "Galaxy mural covering a ceiling, with a rainbow prism design, a ceiling fan and track lights",
      ms: "Mural galaksi menutupi siling, dengan reka bentuk prisma pelangi, kipas siling dan lampu trek",
    }),
  },
  {
    id: "glow",
    title: { en: "Neon & UV Glow Effects", ms: "Kesan Neon & Cahaya UV" },
    summary: {
      en: "Artwork that comes alive under neon and blacklight — glowing cityscapes and planets.",
      ms: "Karya yang hidup di bawah cahaya neon dan UV — bandar dan planet bercahaya.",
    },
    image: getImage("arrow-neon-city", {
      en: "Neon cityscape mural with a soldier silhouette painted across two walls of a room",
      ms: "Mural pemandangan bandar neon dengan siluet askar dilukis pada dua dinding bilik",
    }),
  },
  {
    id: "themed",
    title: { en: "Themed Rooms", ms: "Bilik Bertema" },
    summary: {
      en: "Bedrooms, play rooms and studios turned into a space station, a night sky or a game world.",
      ms: "Bilik tidur, bilik permainan dan studio dijadikan stesen angkasa, langit malam atau dunia permainan.",
    },
    image: getImage("arrow-aerospace-lab", {
      en: "Room painted as a spaceship cockpit, with a starfield window, a desk with a laptop and an easel",
      ms: "Bilik dilukis sebagai kokpit kapal angkasa, dengan tingkap medan bintang, meja berkomputer riba dan sebuah easel",
    }),
  },
  {
    id: "portrait",
    title: { en: "Portraits & Characters", ms: "Potret & Karakter" },
    summary: {
      en: "Graphic portraits and character artwork painted at wall scale.",
      ms: "Potret grafik dan karya karakter dilukis pada skala dinding.",
    },
    image: getImage("arrow-dark-lord", {
      en: "Painted portrait of a caped armoured sci-fi villain reaching toward a giant space station glowing red against a purple sky",
      ms: "Potret lukisan penjahat sci-fi berjubah dan berperisai menghulur tangan ke arah stesen angkasa gergasi yang bercahaya merah berlatarkan langit ungu",
    }),
  },
  {
    id: "custom",
    title: { en: "Custom Commissions", ms: "Tempahan Khas" },
    summary: {
      en: "Original mural concepts developed around your space, requirements and creative direction.",
      ms: "Konsep mural asli yang dibangunkan mengikut ruang, keperluan dan hala tuju kreatif anda.",
    },
    image: getImage("arrow-pastel-clouds", {
      en: "Mural of layered pink and blue clouds on a wall beside a window",
      ms: "Mural awan berlapis merah jambu dan biru pada dinding di sebelah tingkap",
    }),
  },
];

export interface ProcessStep {
  n: string;
  title: Localized;
  text: Localized;
}

// Proposed workflow — adjust to the company's actual process.
export const process: ProcessStep[] = [
  {
    n: "01",
    title: { en: "Discover", ms: "Teroka" },
    text: {
      en: "Understand the client's space, objectives, references and requirements.",
      ms: "Memahami ruang, objektif, rujukan dan keperluan pelanggan.",
    },
  },
  {
    n: "02",
    title: { en: "Concept", ms: "Konsep" },
    text: {
      en: "Develop a proposed creative direction and artwork concept.",
      ms: "Membangunkan arah kreatif dan konsep karya yang dicadangkan.",
    },
  },
  {
    n: "03",
    title: { en: "Plan", ms: "Rancang" },
    text: {
      en: "Confirm the scope, surface requirements, schedule and quotation.",
      ms: "Mengesahkan skop, keperluan permukaan, jadual dan sebut harga.",
    },
  },
  {
    n: "04",
    title: { en: "Create", ms: "Cipta" },
    text: {
      en: "Carry out the mural painting according to the agreed plan.",
      ms: "Melukis mural mengikut perancangan yang dipersetujui.",
    },
  },
  {
    n: "05",
    title: { en: "Reveal", ms: "Dedah" },
    text: {
      en: "Present the completed artwork and project outcome.",
      ms: "Mempersembahkan karya yang siap dan hasil projek.",
    },
  },
];

export const philosophy = {
  lead: {
    en: "Every wall holds the potential to become something",
    ms: "Setiap dinding menyimpan potensi untuk menjadi sesuatu yang",
  },
  emphasis: { en: "extraordinary.", ms: "luar biasa." },
  support: {
    en: "We transform ordinary spaces into distinctive visual experiences through considered design and bespoke mural painting.",
    ms: "Kami mengubah ruang biasa menjadi pengalaman visual yang tersendiri melalui reka bentuk yang teliti dan lukisan mural tempahan.",
  },
};

export const marquee: Localized[] = [
  { en: "Space & Galaxy", ms: "Angkasa & Galaksi" },
  { en: "Neon & UV Glow", ms: "Neon & Cahaya UV" },
  { en: "Themed Rooms", ms: "Bilik Bertema" },
  { en: "Portraits", ms: "Potret" },
  { en: "Custom Commissions", ms: "Tempahan Khas" },
];

export interface ProfileRow {
  label: Localized;
  value: Localized;
  /** true = dummy value shown only in demo mode. */
  sample: boolean;
}

const fromDetail = (label: Localized, d: Detail | null): ProfileRow | null =>
  d ? { label, value: d.value, sample: d.sample } : null;

/**
 * About section. The first paragraph only states facts visible on the studio's own pages
 * (address, Facebook intro "Mural / Painting / Special Effect", the work shown). The second
 * paragraph is placeholder copy — replace it with the real story, then set `placeholder` to false.
 */
export const about = {
  placeholder: true,
  paragraphs: [
    {
      en: `${business.name} is a mural art studio in Kuala Lumpur. Its work spans murals, painting and special effects — from galaxy ceilings and glow-in-the-dark rooms to neon cityscapes.`,
      ms: `${business.name} ialah studio seni mural di Kuala Lumpur. Karyanya merangkumi mural, lukisan dan kesan khas — daripada siling galaksi dan bilik bercahaya dalam gelap hingga pemandangan bandar neon.`,
    },
    {
      en: "Add the studio's real background, experience and philosophy here — who paints, how you work, and what makes your approach distinct.",
      ms: "Tambah latar belakang, pengalaman dan falsafah sebenar studio di sini — siapa yang melukis, bagaimana anda bekerja, dan apa yang membezakan pendekatan anda.",
    },
  ] satisfies Localized[],
  /**
   * The studio's own words, quoted from its public Instagram bio and Facebook intro.
   * Shown as a quotation, not as our copy. Confirm with the owner before launch.
   */
  quote: {
    text: "\u2018Aerospace lab\u2019 for creative services. Synergized by four brothers.",
    source: "Instagram bio · Facebook intro",
  },
  /** Proposed working principles — confirm or rewrite with the company. */
  principles: [
    {
      title: { en: "Site first", ms: "Tapak dahulu" },
      text: {
        en: "Every design starts from the wall, the light and the way people move through the space.",
        ms: "Setiap reka bentuk bermula daripada dinding, cahaya dan cara orang bergerak dalam ruang.",
      },
    },
    {
      title: { en: "By hand", ms: "Dengan tangan" },
      text: {
        en: "Artwork is painted on the surface itself rather than printed and applied.",
        ms: "Karya dilukis terus pada permukaan, bukan dicetak dan ditampal.",
      },
    },
    {
      title: { en: "Clear plan", ms: "Rancangan jelas" },
      text: {
        en: "Scope, surface preparation and schedule are agreed before painting begins.",
        ms: "Skop, penyediaan permukaan dan jadual dipersetujui sebelum lukisan bermula.",
      },
    },
  ] satisfies { title: Localized; text: Localized }[],
  profile: [
    fromDetail(
      { en: "Lead artist", ms: "Pelukis utama" },
      detail(business.leadArtist, demoDetails.leadArtist),
    ),
    {
      label: { en: "Specialities", ms: "Kepakaran" },
      value: { en: "Mural · Painting · Special effects", ms: "Mural · Lukisan · Kesan khas" },
      sample: false,
    },
    fromDetail(
      { en: "Established", ms: "Ditubuhkan" },
      detail(business.established, demoDetails.established),
    ),
    fromDetail(
      { en: "Service areas", ms: "Kawasan perkhidmatan" },
      (() => {
        const areas = detailList(business.serviceAreas, demoDetails.serviceAreas);
        return areas ? { value: areas.values.join(" · "), sample: areas.sample } : null;
      })(),
    ),
  ].filter((r): r is ProfileRow => r !== null),
};

export const enquiryChecklist: Localized[] = [
  { en: "Project location", ms: "Lokasi projek" },
  { en: "Approximate wall dimensions", ms: "Anggaran saiz dinding" },
  { en: "Reference images or ideas", ms: "Gambar rujukan atau idea" },
  { en: "Preferred timeline", ms: "Tempoh yang dikehendaki" },
];

/**
 * Before/after comparison shown at the end of the Process section.
 * DEMO: the "before" is a sketch generated from the demonstration image.
 * Replace with a real before photo + finished photo of the same wall, then set
 * `verified: true`.
 */
export const comparison = {
  verified: false,
  beforeLabel: { en: "Concept sketch", ms: "Lakaran konsep" } satisfies Localized,
  afterLabel: { en: "Finished wall", ms: "Dinding siap" } satisfies Localized,
  before: getImage("sketch-hero", {
    en: "Pencil concept sketch of a botanical mural on a primed wall (demonstration image)",
    ms: "Lakaran konsep pensel mural botani pada dinding yang telah dicat dasar (imej demonstrasi)",
  }),
  after: getImage("hero", {
    en: "The same wall finished as a terracotta and olive botanical mural (demonstration image)",
    ms: "Dinding yang sama selepas siap sebagai mural botani terakota dan zaitun (imej demonstrasi)",
  }),
};

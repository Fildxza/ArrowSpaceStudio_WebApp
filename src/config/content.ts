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
import type { ProjectCategory } from "./portfolio";

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
  /** Portfolio category this service relates to, if any. */
  category?: ProjectCategory;
}

// Proposed service categories — confirm with the company.
export const services: ServiceItem[] = [
  {
    id: "residential",
    title: { en: "Residential Murals", ms: "Mural Kediaman" },
    summary: {
      en: "Bespoke artwork for homes, feature walls and personal spaces.",
      ms: "Hasil seni tempahan untuk rumah, dinding hiasan dan ruang peribadi.",
    },
    image: getImage("residential", {
      en: "Mountain landscape mural in a living room (demonstration image)",
      ms: "Mural lanskap gunung di ruang tamu (imej demonstrasi)",
    }),
    category: "Residential",
  },
  {
    id: "commercial",
    title: { en: "Commercial Murals", ms: "Mural Komersial" },
    summary: {
      en: "Artistic wall treatments for offices, retail spaces and business environments.",
      ms: "Rawatan dinding artistik untuk pejabat, ruang runcit dan persekitaran perniagaan.",
    },
    image: getImage("commercial", {
      en: "Linework mural in an office reception (demonstration image)",
      ms: "Mural garisan di ruang penyambut tetamu pejabat (imej demonstrasi)",
    }),
    category: "Commercial",
  },
  {
    id: "hospitality",
    title: { en: "Cafe & Hospitality", ms: "Kafe & Hospitaliti" },
    summary: {
      en: "Distinctive artwork for cafes, restaurants, hotels and hospitality interiors.",
      ms: "Karya visual yang tersendiri untuk kafe, restoran, hotel dan ruang dalaman hospitaliti.",
    },
    image: getImage("cafe", {
      en: "Organic-shape mural in a cafe interior (demonstration image)",
      ms: "Mural bentuk organik di dalam kafe (imej demonstrasi)",
    }),
    category: "Hospitality",
  },
  {
    id: "exterior",
    title: { en: "Exterior & Building", ms: "Luaran & Bangunan" },
    summary: {
      en: "Large-scale artwork for suitable outdoor walls and building surfaces.",
      ms: "Karya berskala besar untuk dinding luar dan permukaan bangunan yang sesuai.",
    },
    image: getImage("exterior", {
      en: "Large portrait mural on a building facade (demonstration image)",
      ms: "Mural potret besar pada fasad bangunan (imej demonstrasi)",
    }),
    category: "Exterior",
  },
  {
    id: "custom",
    title: { en: "Custom Commissions", ms: "Tempahan Khas" },
    summary: {
      en: "Original mural concepts developed around your space, requirements and creative direction.",
      ms: "Konsep mural asli yang dibangunkan mengikut ruang, keperluan dan hala tuju kreatif anda.",
    },
    image: getImage("detail", {
      en: "Close-up of thick hand-painted brushwork in terracotta, ochre and green (demonstration image)",
      ms: "Gambar dekat sapuan berus tebal berwarna terakota, oker dan hijau (imej demonstrasi)",
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
  { en: "Residential", ms: "Kediaman" },
  { en: "Commercial", ms: "Komersial" },
  { en: "Hospitality", ms: "Hospitaliti" },
  { en: "Exterior", ms: "Luaran" },
  { en: "Custom Commissions", ms: "Tempahan Khas" },
];

export interface ProfileRow {
  label: Localized;
  detail: Detail | null;
}

/**
 * About section. While `placeholder` is true the copy is marked as placeholder
 * text in demo mode — replace it with the real story, then set it to false.
 */
export const about = {
  placeholder: true,
  paragraphs: [
    {
      en: `${business.name} is a mural studio creating bespoke, hand-painted artwork for homes, businesses and public-facing walls.`,
      ms: `${business.name} ialah studio mural yang menghasilkan karya lukisan tangan tempahan untuk rumah, perniagaan dan dinding awam.`,
    },
    {
      en: "Add the studio's real background, experience and philosophy here — who paints, how you work, and what makes your approach distinct.",
      ms: "Tambah latar belakang, pengalaman dan falsafah sebenar studio di sini — siapa yang melukis, bagaimana anda bekerja, dan apa yang membezakan pendekatan anda.",
    },
  ] satisfies Localized[],
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
    {
      label: { en: "Lead artist", ms: "Pelukis utama" },
      detail: detail(business.leadArtist, demoDetails.leadArtist),
    },
    {
      label: { en: "Established", ms: "Ditubuhkan" },
      detail: detail(business.established, demoDetails.established),
    },
    {
      label: { en: "Service areas", ms: "Kawasan perkhidmatan" },
      detail: (() => {
        const areas = detailList(business.serviceAreas, demoDetails.serviceAreas);
        return areas ? { value: areas.values.join(" · "), sample: areas.sample } : null;
      })(),
    },
  ] satisfies ProfileRow[],
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

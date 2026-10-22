/**
 * PORTFOLIO CONTENT
 * ---------------------------------------------------------------------------
 * Each project has a `status`:
 *   - "demo"     AI-generated sample artwork (labelled "Sample"); never real work.
 *   - "social"   a real photo taken from the studio's own public Instagram/Facebook
 *                (@arrowspacestudio) or Facebook page (Fathil The Muralist). Shown as a labelled preview until the owner
 *                approves it and supplies the original file and project details.
 *   - "verified" owner-approved photo with confirmed details (no label).
 *
 * Categories describe what is VISIBLE (theme), not who the client was — client
 * type, location and year are not known, so they are left out on purpose.
 *
 * To replace an item with an approved original:
 *   1. Add the photo to `src/assets/` and run `npm run images`.
 *   2. Point `image` at it with `getImage("file-name", { en, ms })`.
 *   3. Fill in the confirmed title / description / location / year.
 *   4. Set `status: "verified"` and remove `credit`.
 * No component needs to change. Provenance of the Instagram photos is recorded in
 * `src/assets/SOURCES.md`.
 */
import type { Localized } from "@/i18n";
import { getImage, type SiteImage } from "./images";

export type ProjectCategory = "Galaxy" | "Characters" | "Portrait" | "Colour" | "Process";

export const projectCategories: readonly ProjectCategory[] = [
  "Galaxy",
  "Characters",
  "Portrait",
  "Colour",
  "Process",
];

export type ProjectLayout = "wide" | "tall" | "square";
export type ProjectStatus = "demo" | "social" | "verified";

export interface ProjectCredit {
  platform: "instagram" | "facebook";
  label: string;
  href: string;
}

export interface PortfolioProject {
  id: string;
  title: Localized;
  category: ProjectCategory;
  description: Localized;
  image: SiteImage;
  /** Controls the aspect ratio and column span in the gallery. */
  layout: ProjectLayout;
  status: ProjectStatus;
  /** Where the photo came from (shown in the lightbox for non-verified items). */
  credit?: ProjectCredit;
  /** Only add once confirmed with the client. Hidden when empty. */
  location?: string;
  year?: string;
  /** CSS object-position for the gallery crop, e.g. "50% 30%". */
  focal?: string;
  /**
   * Optional "before" photo of the same wall. When set, the lightbox shows a drag-to-compare
   * slider (the same technique as the Process section) instead of a single image.
   */
  before?: SiteImage;
  beforeLabel?: Localized;
  afterLabel?: Localized;
}

const instagram: ProjectCredit = {
  platform: "instagram",
  label: "@arrowspacestudio",
  href: "https://www.instagram.com/arrowspacestudio/",
};
const facebook: ProjectCredit = {
  platform: "facebook",
  label: "Fathil The Muralist",
  href: "https://www.facebook.com/FathilTheMuralist",
};

export const projects: PortfolioProject[] = [
  {
    id: "aerospace-lab",
    title: { en: "The Aerospace Lab", ms: "Makmal Aeroangkasa" },
    category: "Galaxy",
    description: {
      en: "A spaceship cockpit with a glowing starfield window, a desk and an easel, painted on every wall.",
      ms: "Kokpit kapal angkasa dengan tingkap medan bintang bercahaya, meja dan easel, dilukis pada setiap dinding.",
    },
    image: getImage("arrow-aerospace-lab", {
      en: "Room painted as a spaceship cockpit, with a starfield window, a desk with a laptop and an easel holding a portrait",
      ms: "Bilik dilukis sebagai kokpit kapal angkasa, dengan tingkap medan bintang, meja berkomputer riba dan easel yang memegang sebuah potret",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "dark-lord-portrait",
    title: { en: "Dark Lord Portrait", ms: "Potret Lord Kegelapan" },
    category: "Characters",
    description: {
      en: "An airbrushed sci-fi villain raising a hand before a giant space station, with fighter ships streaking past.",
      ms: "Penjahat sci-fi lukisan semburan udara mengangkat tangan di hadapan stesen angkasa gergasi, dengan kapal pejuang meluncur lalu.",
    },
    image: getImage("arrow-dark-lord", {
      en: "Painted portrait of a caped armoured sci-fi villain reaching toward a giant space station glowing red against a purple sky",
      ms: "Potret lukisan penjahat sci-fi berjubah dan berperisai menghulur tangan ke arah stesen angkasa gergasi yang bercahaya merah berlatarkan langit ungu",
    }),
    layout: "square",
    status: "social",
    credit: facebook,
  },
  {
    id: "galaxy-ceiling-prism",
    title: { en: "Galaxy Ceiling with Prism", ms: "Siling Galaksi dengan Prisma" },
    category: "Galaxy",
    description: {
      en: "A nebula overhead, with a prism and a rainbow beam painted across the ceiling.",
      ms: "Nebula di atas kepala, dengan prisma dan alur pelangi dilukis merentasi siling.",
    },
    image: getImage("arrow-galaxy-ceiling", {
      en: "Galaxy mural covering a ceiling, with a rainbow prism design, a ceiling fan and track lights",
      ms: "Mural galaksi menutupi siling, dengan reka bentuk prisma pelangi, kipas siling dan lampu trek",
    }),
    layout: "square",
    status: "social",
    credit: instagram,
  },
  {
    id: "asean-skyline",
    title: { en: "ASEAN Skyline", ms: "Garis Langit ASEAN" },
    category: "Colour",
    description: {
      en: "Landmark buildings from across Southeast Asia under a rainbow of flag roundels, painted on an outdoor wall.",
      ms: "Bangunan mercu tanda dari seluruh Asia Tenggara di bawah pelangi bulatan bendera, dilukis pada dinding luar.",
    },
    image: getImage("arrow-asean-skyline", {
      en: "Outdoor mural of Southeast Asian landmarks including twin towers, temples and a golden dome beneath a ring of national flag circles",
      ms: "Mural luar mercu tanda Asia Tenggara termasuk menara berkembar, kuil dan kubah emas di bawah bulatan bendera negara",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "space-saga-duo",
    title: { en: "Space Saga Duo", ms: "Dua Sahabat Saga Angkasa" },
    category: "Characters",
    description: {
      en: "A furry warrior with a crossbow carrying a small green child, glowing against a pastel nebula.",
      ms: "Pahlawan berbulu dengan busur silang mendukung kanak-kanak hijau kecil, bercahaya berlatarkan nebula pastel.",
    },
    image: getImage("arrow-wookiee-duo", {
      en: "Painted tall furry brown character with a bandolier and crossbow carrying a small green creature, with a green glow over a colourful nebula",
      ms: "Watak berbulu perang tinggi dengan tali bahu dan busur silang mendukung makhluk hijau kecil, dengan pendar hijau di atas nebula berwarna-warni",
    }),
    layout: "square",
    status: "social",
    credit: facebook,
  },
  {
    id: "barber-shop-portrait",
    title: { en: "Barber Shop Portrait", ms: "Potret Kedai Gunting Rambut" },
    category: "Portrait",
    description: {
      en: "A grey-scale portrait with hand-lettered shop name, painted behind two leather armchairs.",
      ms: "Potret skala kelabu dengan nama kedai bertulisan tangan, dilukis di belakang dua kerusi kulit.",
    },
    image: getImage("arrow-corte-fino", {
      en: "Black-and-white portrait of a smoking man in profile on a black wall above two red leather armchairs and a brass floor lamp",
      ms: "Potret hitam putih seorang lelaki merokok dari sisi pada dinding hitam di atas dua kerusi kulit merah dan lampu lantai loyang",
    }),
    layout: "tall",
    status: "social",
    credit: facebook,
  },
  {
    id: "solar-system-astronauts",
    title: { en: "Astronaut Solar System", ms: "Sistem Suria Angkasawan" },
    category: "Galaxy",
    description: {
      en: "Three astronauts planting a flag beneath the sun and planets, edged with violet LED light.",
      ms: "Tiga angkasawan memacak bendera di bawah matahari dan planet, dibingkai lampu LED ungu.",
    },
    image: getImage("arrow-solar-astronauts", {
      en: "Wall mural of three astronauts on a moon surface holding a blank flag under a glowing sun and planets, framed by a purple LED strip",
      ms: "Mural dinding tiga angkasawan di permukaan bulan memegang bendera kosong di bawah matahari bercahaya dan planet, dibingkai jalur LED ungu",
    }),
    layout: "square",
    status: "social",
    credit: facebook,
    focal: "72% 50%",
  },
  {
    id: "colour-mandala",
    title: { en: "Colour Mandala", ms: "Mandala Berwarna" },
    category: "Colour",
    description: {
      en: "Bold black outlines and leaf-green, orange and blue petals radiating from a corner.",
      ms: "Garis hitam tebal serta kelopak hijau daun, oren dan biru memancar dari sudut dinding.",
    },
    image: getImage("arrow-mandala", {
      en: "Close view of a painted mandala in orange, blue, teal and green with thick black outlines on a pale wall",
      ms: "Pandangan dekat mandala dilukis dalam warna oren, biru, teal dan hijau dengan garisan hitam tebal pada dinding pucat",
    }),
    layout: "square",
    status: "social",
    credit: facebook,
  },
  {
    id: "astronaut-breakout",
    title: { en: "Astronaut Breaking Through", ms: "Angkasawan Menembusi Dinding" },
    category: "Galaxy",
    description: {
      en: "A 3D-effect astronaut and flaming comet bursting out of a cracked stone wall.",
      ms: "Angkasawan dan komet berapi berkesan 3D meletup keluar dari dinding batu yang retak.",
    },
    image: getImage("arrow-astronaut-breakout", {
      en: "Trompe-l'oeil mural of an astronaut floating beside a flaming comet through a broken stone wall into space",
      ms: "Mural trompe-l'oeil angkasawan terapung di sisi komet berapi menerusi dinding batu pecah ke angkasa",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "studio-vapor-wall",
    title: { en: "Studio & Vapor Wall", ms: "Dinding Studio & Vapor" },
    category: "Characters",
    description: {
      en: "Glowing hand-lettered sign and a grinning villain with a toxic green cloud, on a shopfront wall.",
      ms: "Papan tanda bertulisan tangan bercahaya dan penjahat tersengih dengan awan hijau beracun, pada dinding kedai.",
    },
    image: getImage("arrow-studio-vapor", {
      en: "Exterior mural of a grinning green-haired villain in a suit holding a tank and a toothy device, with a glowing orange sign and green smoke",
      ms: "Mural luar penjahat berambut hijau berkot tersengih memegang tangki dan alat bergigi, dengan papan tanda oren bercahaya dan asap hijau",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "champion-portrait",
    title: { en: "Champion Portrait", ms: "Potret Juara" },
    category: "Portrait",
    description: {
      en: "A monochrome fist-forward portrait with a hand-lettered quote against a city skyline.",
      ms: "Potret monokrom dengan penumbuk ke hadapan dan petikan bertulisan tangan berlatarkan garis langit bandar.",
    },
    image: getImage("arrow-champion", {
      en: "Grey-blue painted portrait of a boxer with a fist toward the viewer beside a hand-lettered motivational quote and a city skyline",
      ms: "Potret lukisan biru kelabu seorang peninju dengan penumbuk ke arah penonton di sebelah petikan motivasi bertulisan tangan dan garis langit bandar",
    }),
    layout: "tall",
    status: "social",
    credit: facebook,
  },
  {
    id: "neon-city-room",
    title: { en: "Neon City Room", ms: "Bilik Bandar Neon" },
    category: "Colour",
    description: {
      en: "A glowing neon skyline with a soldier silhouette, wrapping the corner of a room.",
      ms: "Garis langit bandar neon bercahaya dengan siluet askar, melingkari sudut bilik.",
    },
    image: getImage("arrow-neon-city", {
      en: "Neon cityscape mural with a soldier silhouette painted across two walls of a room",
      ms: "Mural pemandangan bandar neon dengan siluet askar dilukis pada dua dinding bilik",
    }),
    layout: "tall",
    status: "social",
    credit: instagram,
    focal: "50% 55%",
  },
  {
    id: "fairytale-room",
    title: { en: "Fairy-Tale Room", ms: "Bilik Dongeng" },
    category: "Characters",
    description: {
      en: "A children's room painted with storybook princesses, a castle, a rainbow and a lantern-lit tower window.",
      ms: "Bilik kanak-kanak dilukis dengan puteri buku cerita, istana, pelangi dan tingkap menara berpelita.",
    },
    image: getImage("arrow-fairytale-room", {
      en: "Two views of a room covered in storybook murals: a tower window with floating lanterns above, and a garden of princesses before a castle and rainbow below",
      ms: "Dua pandangan bilik yang dipenuhi mural buku cerita: tingkap menara dengan tanglung terapung di atas, dan taman puteri di hadapan istana dan pelangi di bawah",
    }),
    layout: "tall",
    status: "social",
    credit: facebook,
  },
  {
    id: "wave-landscape",
    title: { en: "Wave & Paddy Landscape", ms: "Landskap Ombak & Sawah" },
    category: "Colour",
    description: {
      en: "Great waves, rice fields, mountains and a lighthouse joined in one painted landscape.",
      ms: "Ombak besar, sawah padi, gunung dan rumah api bersatu dalam satu landskap lukisan.",
    },
    image: getImage("arrow-wave-landscape", {
      en: "Painted landscape of rice fields and green mountains with a lighthouse, framed by large stylised waves with boats and blossoms",
      ms: "Landskap lukisan sawah padi dan gunung hijau dengan rumah api, dibingkai ombak besar bergaya dengan bot dan bunga",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "galaxy-bedroom-wall",
    title: { en: "Galaxy Bedroom Wall", ms: "Dinding Bilik Galaksi" },
    category: "Galaxy",
    description: {
      en: "A deep-space nebula with scattered stars, painted behind a bed.",
      ms: "Nebula angkasa lepas dengan taburan bintang, dilukis di belakang katil.",
    },
    image: getImage("arrow-galaxy-bedroom", {
      en: "Galaxy mural on a bedroom wall, with a large teddy bear lying on the bed in front of it",
      ms: "Mural galaksi pada dinding bilik tidur, dengan sebuah patung beruang besar di atas katil",
    }),
    layout: "wide",
    status: "social",
    credit: instagram,
  },
  {
    id: "respect-your-barber",
    title: { en: "Respect Your Barber", ms: "Hormati Tukang Gunting Anda" },
    category: "Portrait",
    description: {
      en: "A monochrome barber portrait with a razor and bold lettering across a dark wall.",
      ms: "Potret tukang gunting monokrom dengan pisau cukur dan tulisan tebal merentasi dinding gelap.",
    },
    image: getImage("arrow-respect-barber", {
      en: "Grey-scale mural of a man holding a razor with the words RESPECT YOUR BARBER on a dark wall beside a speaker",
      ms: "Mural skala kelabu seorang lelaki memegang pisau cukur dengan tulisan RESPECT YOUR BARBER pada dinding gelap di sebelah pembesar suara",
    }),
    layout: "tall",
    status: "social",
    credit: facebook,
  },
  {
    id: "battle-royale-wall",
    title: { en: "Battle Royale Wall", ms: "Dinding Battle Royale" },
    category: "Characters",
    description: {
      en: "A game-inspired soldier in a battle helmet, a parachutist and a stunt bike over a desert canyon.",
      ms: "Askar berinspirasi permainan dengan topi keledar tempur, penerjun dan motosikal aksi di atas ngarai padang pasir.",
    },
    image: getImage("arrow-battle-royale", {
      en: "Room wall painted with a soldier in a grey helmet and white shirt with a tie, a parachutist and a bike above an orange desert canyon",
      ms: "Dinding bilik dilukis askar bertopi keledar kelabu berbaju putih dan tali leher, penerjun dan motosikal di atas ngarai padang pasir oren",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "scooter-shopfront",
    title: { en: "Scooter & Shopfront", ms: "Skuter & Hadapan Kedai" },
    category: "Colour",
    description: {
      en: "A painted green scooter, windows, ivy and a door bringing colour to an outdoor wall.",
      ms: "Skuter hijau, tingkap, ivy dan pintu yang dilukis membawa warna pada dinding luar.",
    },
    image: getImage("arrow-scooter-shopfront", {
      en: "Colourful outdoor mural of a green vintage scooter in front of painted orange and blue windows, a door and climbing plants",
      ms: "Mural luar berwarna-warni skuter klasik hijau di hadapan tingkap oren dan biru, pintu dan tumbuhan menjalar yang dilukis",
    }),
    layout: "square",
    status: "social",
    credit: facebook,
  },
  {
    id: "strength-camo-wall",
    title: { en: "Strength Camo Wall", ms: "Dinding Kamuflaj Kekuatan" },
    category: "Portrait",
    description: {
      en: "Four lifting athletes with barbells over a red camouflage pattern and radiating lines, wrapping a corner.",
      ms: "Empat atlet mengangkat barbel di atas corak kamuflaj merah dan garisan memancar, melingkari sudut.",
    },
    image: getImage("arrow-strength-camo", {
      en: "Exterior corner mural of four teal-toned weightlifters with barbells over a red, black and green camouflage background",
      ms: "Mural sudut luar empat atlet angkat berat berwarna teal dengan barbel di atas latar kamuflaj merah, hitam dan hijau",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "moon-mural",
    title: { en: "Moon Mural", ms: "Mural Bulan" },
    category: "Galaxy",
    description: {
      en: "A cratered full moon in blues and violets on a dark wall.",
      ms: "Bulan purnama berkawah dalam warna biru dan ungu pada dinding gelap.",
    },
    image: getImage("arrow-moon", {
      en: "Large painted full moon with craters on a deep blue wall",
      ms: "Bulan purnama berkawah yang dilukis besar pada dinding biru tua",
    }),
    layout: "tall",
    status: "social",
    credit: instagram,
    focal: "50% 35%",
  },
  {
    id: "nebula-ceiling",
    title: { en: "Nebula Ceiling", ms: "Siling Nebula" },
    category: "Galaxy",
    description: {
      en: "A glowing gold-and-blue nebula spread across a ceiling and its recessed panels.",
      ms: "Nebula emas dan biru bercahaya terbentang merentasi siling dan panel tersembunyinya.",
    },
    image: getImage("arrow-nebula-ceiling", {
      en: "Ceiling painted as a golden and blue nebula with scattered stars and recessed lights",
      ms: "Siling dilukis sebagai nebula emas dan biru dengan bintang bertaburan dan lampu terbenam",
    }),
    layout: "square",
    status: "social",
    credit: facebook,
  },
  {
    id: "pastel-botanical-wall",
    title: { en: "Pastel Botanical Wall", ms: "Dinding Botani Pastel" },
    category: "Colour",
    description: {
      en: "Soft mint and blush leaf shapes drawn across a bedroom wall.",
      ms: "Bentuk daun pudina dan merah jambu lembut dilukis merentasi dinding bilik tidur.",
    },
    image: getImage("arrow-pastel-leaves", {
      en: "Pastel mural of mint green leaves and soft pink shapes on a bedroom wall",
      ms: "Mural pastel daun hijau pudina dan bentuk merah jambu lembut pada dinding bilik tidur",
    }),
    layout: "square",
    status: "social",
    credit: instagram,
  },
  {
    id: "cloud-wall",
    title: { en: "Cloud Wall", ms: "Dinding Awan" },
    category: "Colour",
    description: {
      en: "Layered pink and blue clouds painted across a wall and into the corner.",
      ms: "Awan berlapis merah jambu dan biru dilukis merentasi dinding hingga ke sudut.",
    },
    image: getImage("arrow-pastel-clouds", {
      en: "Mural of layered pink and blue clouds on a wall beside a window",
      ms: "Mural awan berlapis merah jambu dan biru pada dinding di sebelah tingkap",
    }),
    layout: "square",
    status: "social",
    credit: instagram,
  },
  {
    id: "nebula-wall-in-progress",
    title: { en: "Painting a Nebula", ms: "Melukis Nebula" },
    category: "Process",
    description: {
      en: "An artist blending an orange and violet nebula inside a jagged broken-wall frame.",
      ms: "Seorang pelukis menyebatikan nebula oren dan ungu di dalam bingkai dinding pecah bergerigi.",
    },
    image: getImage("arrow-nebula-wip", {
      en: "Artist seen from behind painting a glowing orange and violet nebula and an astronaut silhouette inside a cracked-wall frame",
      ms: "Pelukis dilihat dari belakang melukis nebula oren dan ungu bercahaya serta siluet angkasawan di dalam bingkai dinding retak",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
  {
    id: "planet-hall-in-progress",
    title: { en: "Planet Mural in Progress", ms: "Mural Planet Sedang Dilukis" },
    category: "Process",
    description: {
      en: "A large planet mural taking shape from scaffolding in a high-ceilinged hall.",
      ms: "Mural planet besar mula terbentuk dari perancah di dalam dewan bersiling tinggi.",
    },
    image: getImage("arrow-scaffold-planet", {
      en: "Scaffolding in a high-ceilinged hall in front of a large planet mural in progress",
      ms: "Perancah di dalam dewan bersiling tinggi di hadapan mural planet besar yang sedang dilukis",
    }),
    layout: "tall",
    status: "social",
    credit: instagram,
    focal: "50% 30%",
  },
  {
    id: "monochrome-portrait-in-progress",
    title: { en: "Monochrome Portrait in Progress", ms: "Potret Monokrom Sedang Dilukis" },
    category: "Process",
    description: {
      en: "Two artists building a grey-scale champion portrait with fine brushes on a black wall.",
      ms: "Dua pelukis membina potret juara skala kelabu dengan berus halus pada dinding hitam.",
    },
    image: getImage("arrow-monochrome-wip", {
      en: "Two artists with brushes painting a grey-scale figure with outstretched arms on a black wall, with a printed reference photo below",
      ms: "Dua pelukis berus melukis figura skala kelabu berlengan terentang pada dinding hitam, dengan foto rujukan bercetak di bawah",
    }),
    layout: "wide",
    status: "social",
    credit: facebook,
  },
];

/** True while any project is not yet an owner-approved original. */
export const hasUnverifiedProjects = projects.some((p) => p.status !== "verified");
/** True while any project is AI-generated sample artwork. */
export const hasDemoProjects = projects.some((p) => p.status === "demo");

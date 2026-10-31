import {
  Github,
  Instagram,
  Music2,
  Youtube,
  type LucideIcon,
} from "lucide-react";

/* ================================================================== */
/*                                                                      */
/*  SINGLE SOURCE OF TRUTH — edit everything here, nowhere else.       */
/*                                                                      */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/*  Identity                                                           */
/* ------------------------------------------------------------------ */

export const IDENTITY = {
  /* Core */
  name: "Wangsit Bagus Satriatama",
  alias: "Ryou",
  handle: "@ryouhtml",
  badge: "RYOU // WANGSIT BAGUS SATRIATAMA",
  role: "Vibe Coder & Web Architect",

  /* Statement shown in Hero */
  statement:
    "Building web applications and API ecosystems through prompt-guided AI workflows.",

  /* Location */
  location: "Pekalongan, ID",
  locationFull: "Pekalongan, Central Java, Indonesia",
  // Pekalongan, Central Java — verified approx 6.8886° S, 109.6753° E
  coordinates: "6.8886° S, 109.6753° E",
  timezone: "IDN / UTC+7",

  /* Birth — full Date used internally for age/days-alive maths only */
  birth: new Date(2010, 5, 28),
  birthLabel: "JUNE 2010",       // Day omitted intentionally
  birthPlace: "Semarang, Central Java",

  /* Education */
  education: "SMKN 1 Kedungwuni — XI TJKT 3",
  educationDetail:
    "Teknik Jaringan Komputer & Telekomunikasi · Computer & Network Engineering",
  /** Short label used in the Hero status bar */
  educationShort: "XI TJKT 3",
  /** Year the site / portfolio was started */
  established: "2024",

  /* Organisation */
  orgRole: "Web Developer & Editor",
  org: "JCC Skensa — SMKN 1 Kedungwuni Journalism Club",
  orgShort: "JCC Skensa",

  /* Contact */
  email: "wangsitbagus1979@gmail.com",

  /* Portrait */
  portraitSrc: "/images/ryou-portrait.jpg",
  portraitAlt:
    "Wangsit Bagus Satriatama — Ryou, portrait in a dark hoodie with silver IEMs",

  /* Hero availability badge */
  availabilityStatus: "AVAILABLE FOR PILOT PROJECTS",

  /* Short bio shown in the editorial intro cell of Biography */
  bioIntro: (age: number) =>
    `A ${age}-year-old engineer from Pekalongan running production web systems — prompting, shipping and iterating from the school workbench to the cloud.`,
  bioSubline: "Semarang-born · Pekalongan-based · SMKN 1 Kedungwuni",

  /* Ambitions */
  vision: "Software Developer → Real Estate Investor",

  /* Interests displayed as tags */
  interests: [
    "Arch Linux · Hyprland",
    "IEM / DAC Tuning",
    "Yoyo",
    "Anime",
    "Vocaloid & J-Pop",
  ],
} as const;

export function getAge(now: Date = new Date()): number {
  let age = now.getFullYear() - IDENTITY.birth.getFullYear();
  const m = now.getMonth() - IDENTITY.birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < IDENTITY.birth.getDate())) age--;
  return age;
}

export function getDaysAlive(now: Date = new Date()): number {
  return Math.floor((now.getTime() - IDENTITY.birth.getTime()) / 86_400_000);
}

/* ------------------------------------------------------------------ */
/*  Methodology — Vibe Coding                                          */
/* ------------------------------------------------------------------ */

export const METHOD_CELLS = [
  {
    n: "01",
    title: "Prompt-Guided Architecture",
    body: "Requirements distilled into precise, layered prompts that scaffold entire repositories — coherent structure from the very first draft, not bolted on after.",
  },
  {
    n: "02",
    title: "Clean Code Refactoring",
    body: "AI output is a rough draft. Every module gets reviewed, renamed, typed and hardened until it reads like a human wrote it — because one did: me.",
  },
  {
    n: "03",
    title: "System Orchestration",
    body: "Knowing which tool owns which job — editor agents, CLIs, API layers, version control and deployment pipelines, wired into one working system.",
  },
  {
    n: "04",
    title: "Cloud Deployment",
    body: "From git push to a production URL — containerised builds on Back4app, edge-ready deploys on Vercel, environment discipline throughout.",
  },
] as const;

export const WORKFLOW = ["IDEA", "PROMPT", "ITERATE", "REFACTOR", "SHIP"] as const;

export const TICKER = [
  "REACT 19",
  "TYPESCRIPT",
  "EXPRESS.JS",
  "BACK4APP",
  "VIBE CODING",
  "ARCH LINUX",
  "HYPRLAND",
  "AUDIOPHILE IEM / DAC",
  "YOYO",
  "VOCALOID & J-POP",
  "JURNALISTIK JCC SKENSA",
] as const;

/* ------------------------------------------------------------------ */
/*  Works                                                              */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "LIVE" | "IN PRODUCTION" | "CONCEPT";

export interface Project {
  id: string;
  index: string;
  name: string;
  aka?: string;
  category: string;
  desc: string;
  objective: string;
  year: string;
  status: ProjectStatus;
  stack: string[];
  /**
   * Direct URL to the project (live demo or specific repo).
   * null = no verified public link yet.
   */
  link: string | null;
  linkLabel: string;
  /**
   * true  → link points directly to this project's repository.
   * false → link points to the GitHub profile / a generic page.
   */
  repoLinked: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "kirastream",
    index: "01",
    name: "KiraStream",
    aka: "aka AniZone",
    category: "MEDIA STREAMING APP",
    desc: "Anime & digital-media streaming experience — React front-end, self-hosted TS API.",
    objective:
      "A high-performance anime and digital-media streaming web app. Fast React front-end consuming a self-hosted Express.js + TypeScript API, containerised and deployed on Back4app — search, browse and binge without the bloat.",
    year: "2026",
    status: "LIVE",
    stack: ["React", "TypeScript", "Express.js", "Back4app", "Tailwind CSS"],
    link: "https://github.com/ryouhtml",
    linkLabel: "VIEW ON GITHUB",
    repoLinked: false,
  },
  {
    id: "jcc-skensa",
    index: "02",
    name: "JCC Skensa",
    aka: "platform & registration",
    category: "ORGANIZATION WEB SYSTEM",
    desc: "Official web system + online member registration for SMKN 1 Kedungwuni's journalism club.",
    objective:
      "The official web system for JCC Skensa, the journalism club of SMKN 1 Kedungwuni. A public-facing site paired with an online member-registration pipeline — replacing the paper-form chaos with a structured, trackable onboarding flow.",
    year: "2026",
    status: "IN PRODUCTION",
    stack: ["React", "TypeScript", "Node.js", "REST API"],
    link: "https://github.com/ryouhtml",
    linkLabel: "VIEW ON GITHUB",
    repoLinked: false,
  },
  {
    id: "class-hub",
    index: "03",
    name: "Class Hub",
    aka: "XI TJKT 3",
    category: "CLASS PORTAL",
    desc: "Interactive portal — schedules, student directory and event archives for XI TJKT 3.",
    objective:
      "One interactive portal for XI TJKT 3: live class schedules, a searchable student directory and a persistent archive of class events — the class's single source of truth, kept in everyone's pocket.",
    year: "2025",
    status: "LIVE",
    stack: ["React", "Tailwind CSS", "LocalStorage"],
    link: "https://github.com/ryouhtml",
    linkLabel: "VIEW ON GITHUB",
    repoLinked: false,
  },
  {
    id: "bakars-collection",
    index: "04",
    name: "BaKar's Collection",
    category: "E-COMMERCE CATALOG",
    desc: "Catalog & ordering platform for a custom bouquet brand — browse to checkout in minutes.",
    objective:
      "Storefront for a custom bouquet brand: a visual catalog with a frictionless ordering flow wired directly to WhatsApp checkout. Zero-backend, all signal — small business, professional front door.",
    year: "2025",
    status: "LIVE",
    stack: ["React", "Tailwind CSS", "WhatsApp Checkout"],
    link: "https://github.com/ryouhtml",
    linkLabel: "VIEW ON GITHUB",
    repoLinked: false,
  },
  {
    id: "moku",
    index: "05",
    name: "Moku",
    aka: "UMKM ecosystem concept",
    category: "SUPER-APP — CONCEPT",
    desc: "Local UMKM ecosystem super-app concept — one surface for small-business digital ops.",
    objective:
      "An ecosystem super-app concept for Indonesian UMKM — unified catalog, orders, customer records and lightweight operations in a single surface. Bringing mom-and-pop stores into the digital default, starting with Pekalongan.",
    year: "2026",
    status: "CONCEPT",
    stack: ["React", "TypeScript", "Product Strategy"],
    link: null,
    linkLabel: "CONCEPT BRIEF",
    repoLinked: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Social matrix                                                      */
/* ------------------------------------------------------------------ */

export interface Social {
  label: string;
  handle: string;
  note: string;
  href: string;
  Icon: LucideIcon;
}

export const SOCIALS: Social[] = [
  {
    label: "GITHUB",
    handle: "@ryouhtml",
    note: "SOURCE & REPOSITORIES",
    href: "https://github.com/ryouhtml",
    Icon: Github,
  },
  {
    label: "INSTAGRAM",
    handle: "@yoikageig",
    note: "LIFE & FRAMES",
    href: "https://www.instagram.com/yoikageig",
    Icon: Instagram,
  },
  {
    label: "TIKTOK",
    handle: "@yoikagevt",
    note: "SHORT-FORM & UPDATES",
    href: "https://www.tiktok.com/@yoikagevt",
    Icon: Music2,
  },
  {
    label: "YOUTUBE",
    handle: "yoikageyt",
    note: "DEV LOGS & BUILDS",
    href: "https://www.youtube.com/@yoikageyt",
    Icon: Youtube,
  },
];

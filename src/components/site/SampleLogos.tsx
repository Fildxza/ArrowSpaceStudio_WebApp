import type { ReactNode } from "react";
import { fmt, useCopy } from "@/i18n";

interface Design {
  glyph: ReactNode;
  word: string;
  className: string;
}

/** Six deliberately generic marks so the client wall can be previewed. They are not real brands. */
const DESIGNS: Design[] = [
  {
    glyph: <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="3" />,
    word: "CLIENT",
    className: "font-display text-2xl tracking-[0.2em]",
  },
  {
    glyph: <path d="M14 3 25 24H3Z" fill="currentColor" />,
    word: "brand",
    className: "font-sans text-2xl font-bold lowercase tracking-tight",
  },
  {
    glyph: (
      <rect x="4" y="4" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" />
    ),
    word: "SAMPLE",
    className: "font-mono text-lg tracking-[0.3em]",
  },
  {
    glyph: (
      <path
        d="M3 18c4-10 8-10 11 0s7 10 11 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ),
    word: "Studio",
    className: "font-display text-3xl italic",
  },
  {
    glyph: (
      <path d="M14 2l3.5 9.5L27 14l-9.5 3.5L14 27l-3.5-9.5L1 14l9.5-3.5Z" fill="currentColor" />
    ),
    word: "NOVA CO.",
    className: "font-sans text-lg font-semibold tracking-[0.25em]",
  },
  {
    glyph: (
      <path d="M5 24V6h8a6 6 0 0 1 0 12H5" fill="none" stroke="currentColor" strokeWidth="3" />
    ),
    word: "Partner",
    className: "font-display text-2xl",
  },
];

/** Placeholder client logo (index 0-5). Exposed to assistive tech as "Sample client logo N". */
export function SampleLogo({ index }: { index: number }) {
  const t = useCopy();
  const d = DESIGNS[index % DESIGNS.length]!;
  return (
    <div
      role="img"
      aria-label={fmt(t.testimonials.logoAlt, { n: String(index + 1).padStart(2, "0") })}
      className="flex items-center gap-3 text-ivory/55 transition-colors duration-500 group-hover:text-ivory"
    >
      <svg viewBox="0 0 28 28" aria-hidden="true" className="size-8 shrink-0">
        {d.glyph}
      </svg>
      <span aria-hidden="true" className={d.className}>
        {d.word}
      </span>
    </div>
  );
}

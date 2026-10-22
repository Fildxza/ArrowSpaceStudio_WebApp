import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hand-painted brushstroke accent. `hero` plays on load; `reveal` waits for a <Reveal variant="draw"> parent. */
export function BrushStroke({
  className,
  mode = "reveal",
  delay = 900,
}: {
  className?: string;
  mode?: "hero" | "reveal";
  delay?: number;
}) {
  const cls = mode === "hero" ? "hero-stroke" : "draw-stroke";
  const style = { "--d": `${delay}ms` } as CSSProperties;
  return (
    <svg
      viewBox="0 0 400 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("text-accent", className)}
      preserveAspectRatio="none"
    >
      <path
        className={cls}
        style={style}
        pathLength={1}

        d="M4 26c40-10 90-16 150-14 52 2 96 10 146 8 34-1 62-6 96-12"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        className={cls}
        style={{ ...style, "--d": `${delay + 400}ms` } as CSSProperties}
        pathLength={1}

        d="M30 34c70-6 160-8 250-4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}

const DRIPS: ReadonlyArray<readonly [x: number, length: number, width: number, delay: number]> = [
  [60, 46, 7, 0],
  [150, 96, 9, 250],
  [232, 30, 6, 120],
  [340, 70, 8, 380],
  [455, 118, 10, 100],
  [560, 40, 6, 520],
  [655, 84, 8, 200],
  [770, 54, 7, 460],
  [870, 126, 10, 320],
  [965, 36, 6, 80],
  [1060, 88, 8, 420],
  [1150, 58, 7, 180],
];

/** Paint drips running down from the top edge of its container. Reveals when scrolled into view. */
export function Drips({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none block w-full text-accent-deep", className)}
    >
      <rect x="0" y="0" width="1200" height="6" fill="currentColor" />
      {DRIPS.map(([x, len, w, d]) => (
        <line
          key={x}
          className="drip"
          pathLength={1}

          x1={x}
          y1={0}
          x2={x}
          y2={len}
          stroke="currentColor"
          strokeWidth={w}
          strokeLinecap="round"
          style={{ "--d": `${d}ms` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** Small editorial annotation: "— FIG. 01". */
export function Annot({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("annot inline-flex items-center gap-3 text-muted-foreground", className)}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </span>
  );
}

/** Placeholder brand mark: an upward arrow (for "Arrow Space Studio"). Replace with the real logo file when supplied. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <rect width="32" height="32" fill="currentColor" />
      <path
        d="M16 26V8M8.5 15.5 16 8l7.5 7.5M10.5 26h11"
        fill="none"
        stroke="var(--accent-soft)"
        strokeWidth="2.6"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Plus-shaped registration mark used as a small editorial detail. */
export function RegMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 0v24M0 12h24" />
    </svg>
  );
}

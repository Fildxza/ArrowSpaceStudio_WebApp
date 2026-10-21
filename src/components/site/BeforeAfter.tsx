import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { MoveHorizontal } from "lucide-react";
import type { SiteImage } from "@/config/images";
import { prefersReducedMotion } from "@/lib/motion";

interface BeforeAfterProps {
  before: SiteImage;
  after: SiteImage;
  beforeLabel?: string;
  afterLabel?: string;
  /** Visible label for assistive tech describing what is being compared. */
  label: string;
}

/**
 * Drag-to-compare slider. A native range input sits over the images, so it
 * works with mouse, touch and keyboard (←/→, Home/End) without extra code.
 * On first view it sweeps once to hint that it can be dragged.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  label,
}: BeforeAfterProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const touched = useRef(false);

  // One-time hint sweep when the slider first scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          if (touched.current) return;
          const p = Math.min((t - start) / 1800, 1);
          // 50 -> 78 -> 50 with an ease-in-out curve
          setPos(50 + Math.sin(p * Math.PI) * 28 * (1 - p * 0.2));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setPos(50);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const style = { "--pos": `${pos}%` } as CSSProperties;

  return (
    <div ref={ref} className="relative select-none" style={style}>
      <div className="relative aspect-[16/11] overflow-hidden bg-stone">
        <img
          src={before.src}
          srcSet={before.srcSet}
          sizes="(min-width: 1024px) 60vw, 100vw"
          width={before.width}
          height={before.height}
          alt={before.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={after.src}
          srcSet={after.srcSet}
          sizes="(min-width: 1024px) 60vw, 100vw"
          width={after.width}
          height={after.height}
          alt={after.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover [clip-path:inset(0_0_0_var(--pos))]"
        />

        <span className="annot pointer-events-none absolute left-4 top-4 bg-ivory/90 px-2.5 py-1.5 text-charcoal">
          {beforeLabel}
        </span>
        <span className="annot pointer-events-none absolute right-4 top-4 bg-ink/85 px-2.5 py-1.5 text-ivory">
          {afterLabel}
        </span>

        {/* divider + handle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[var(--pos)] w-px -translate-x-1/2 bg-ivory shadow-[0_0_0_1px_oklch(0_0_0/0.15)]"
        >
          <span className="absolute left-1/2 top-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-deep text-ivory shadow-[0_8px_24px_oklch(0_0_0/0.35)]">
            <MoveHorizontal className="size-5" />
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${afterLabel.toLowerCase()} shown`}
          onPointerDown={() => (touched.current = true)}
          onKeyDown={() => (touched.current = true)}
          onChange={(e) => {
            touched.current = true;
            setPos(Number(e.target.value));
          }}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden outline outline-2 -outline-offset-4 outline-accent-soft peer-focus-visible:block"
        />
      </div>
    </div>
  );
}

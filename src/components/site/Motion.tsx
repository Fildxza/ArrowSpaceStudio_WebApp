import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { observeReveal, registerParallax, unobserveReveal } from "@/lib/motion";

interface RevealProps {
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  /** "up" fades/slides in, "mask" wipes children marked with .mask, "draw" animates SVG strokes. */
  variant?: "up" | "mask" | "draw";
  className?: string;
  children?: ReactNode;
  id?: string;
  "aria-label"?: string;
}

/** Reveals once when scrolled into view. Content is visible without JS or with reduced motion. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observeReveal(el);
    return () => unobserveReveal(el);
  }, []);
  const style = { "--d": `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} data-reveal={variant} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

interface ParallaxProps {
  /** Fraction of the distance from viewport centre to travel. Negative moves the opposite way. */
  speed?: number;
  className?: string;
  children: ReactNode;
}

/** Wraps media in a layer that drifts slightly with scroll. Children should be oversized (scale) to hide edges. */
export function Parallax({ speed = 0.06, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    return el ? registerParallax(el, speed) : undefined;
  }, [speed]);
  return (
    <div ref={ref} className={`parallax ${className ?? ""}`}>
      {children}
    </div>
  );
}

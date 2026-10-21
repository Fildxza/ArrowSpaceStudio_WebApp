/**
 * Lightweight motion helpers (no animation library).
 *
 * - Reveal: one shared IntersectionObserver adds `data-in` to elements the
 *   first time they scroll into view. CSS only hides un-revealed elements once
 *   the `motion` class exists on <html>, so content stays visible if JS fails,
 *   if IntersectionObserver is missing, or if the visitor prefers reduced motion.
 * - Parallax: a single rAF-throttled scroll listener that only touches the
 *   elements currently near the viewport and writes a CSS variable (`--py`).
 */

const REVEAL_ATTR = "data-in";
let revealObserver: IntersectionObserver | null = null;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function canObserve(): boolean {
  return (
    typeof window !== "undefined" && "IntersectionObserver" in window && !prefersReducedMotion()
  );
}

export function observeReveal(el: Element): void {
  if (!canObserve()) {
    el.setAttribute(REVEAL_ATTR, "");
    return;
  }
  document.documentElement.classList.add("motion");
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
    el.setAttribute(REVEAL_ATTR, "");
    return;
  }
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute(REVEAL_ATTR, "");
        revealObserver?.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  revealObserver.observe(el);
}

export function unobserveReveal(el: Element): void {
  revealObserver?.unobserve(el);
}

/* ---------------------------------------------------------------- parallax */

const near = new Set<HTMLElement>();
const speeds = new WeakMap<HTMLElement, number>();
let parallaxIO: IntersectionObserver | null = null;
let frame = 0;
let listening = false;

function update(): void {
  frame = 0;
  const mid = window.innerHeight / 2;
  near.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - mid) * (speeds.get(el) ?? 0);
    el.style.setProperty("--py", `${offset.toFixed(1)}px`);
  });
}

function onScroll(): void {
  if (!frame) frame = requestAnimationFrame(update);
}

export function registerParallax(el: HTMLElement, speed: number): () => void {
  if (!canObserve()) return () => {};
  speeds.set(el, speed);
  parallaxIO ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) near.add(target);
        else near.delete(target);
      }
      onScroll();
    },
    { rootMargin: "20% 0px 20% 0px" },
  );
  parallaxIO.observe(el);
  if (!listening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    listening = true;
  }
  return () => {
    parallaxIO?.unobserve(el);
    near.delete(el);
    speeds.delete(el);
    el.style.removeProperty("--py");
    if (near.size === 0 && listening) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      listening = false;
    }
  };
}

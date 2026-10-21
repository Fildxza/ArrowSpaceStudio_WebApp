import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { PortfolioProject } from "@/config/portfolio";
import { useCopy, useL } from "@/i18n";
import { prefersReducedMotion } from "@/lib/motion";

interface LightboxProps {
  items: PortfolioProject[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-screen project viewer built on the native <dialog> element, which gives
 * a focus trap, an inert background and Escape handling for free.
 */
export function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const t = useCopy();
  const l = useL();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [closing, setClosing] = useState(false);
  const project = index === null ? undefined : items[index];
  const open = project !== undefined;

  const step = useCallback(
    (delta: number) => {
      if (index === null || items.length < 2) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  const requestClose = useCallback(() => {
    if (prefersReducedMotion()) return onClose();
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 240);
  }, [onClose]);

  // Open/close the native dialog and lock page scroll while open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Preload neighbours so previous/next feel instant.
  useEffect(() => {
    if (index === null || items.length < 2) return;
    for (const d of [-1, 1]) {
      const next = items[(index + d + items.length) % items.length];
      if (next) {
        const img = new Image();
        img.srcset = next.image.srcSet;
        img.sizes = "100vw";
        img.src = next.image.src;
      }
    }
  }, [index, items]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current;
    const end = e.changedTouches[0]?.clientX;
    touchX.current = null;
    if (start === null || end === undefined) return;
    const dx = end - start;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox on-dark"
      aria-labelledby="lightbox-title"
      data-closing={closing ? "" : undefined}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      {project && index !== null && (
        <div className="flex h-full flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
            <span className="annot text-stone" aria-live="polite">
              {pad(index + 1)} / {pad(items.length)}
            </span>
            <button
              type="button"
              autoFocus
              onClick={requestClose}
              aria-label={t.lightbox.close}
              className="inline-flex size-12 items-center justify-center border border-ivory/25 transition-[transform,background-color,color] duration-500 hover:rotate-90 hover:bg-ivory hover:text-ink"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto px-5 pb-6 md:grid-cols-12 md:gap-10 md:px-10 md:pb-10">
            <div className="flex min-h-[45vh] items-center justify-center md:col-span-8 md:h-full md:min-h-0">
              <img
                key={project.id}
                src={project.image.src}
                srcSet={project.image.srcSet}
                sizes="(min-width: 768px) 66vw, 100vw"
                width={project.image.width}
                height={project.image.height}
                alt={l(project.image.alt)}
                className="lb-img max-h-[62vh] w-auto max-w-full object-contain md:max-h-full"
              />
            </div>

            <div
              key={`${project.id}-meta`}
              className="lb-meta flex flex-col justify-end md:col-span-4"
            >
              <span className="annot text-accent-soft">{t.work.categories[project.category]}</span>
              <h2
                id="lightbox-title"
                className="mt-3 font-display text-4xl font-light leading-[1.02] md:text-5xl"
              >
                {l(project.title)}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-stone">{l(project.description)}</p>

              {(project.location || project.year) && (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ivory/15 pt-4 text-sm">
                  {project.location && (
                    <div>
                      <dt className="annot text-stone/70">{t.lightbox.location}</dt>
                      <dd className="mt-1">{project.location}</dd>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <dt className="annot text-stone/70">{t.lightbox.year}</dt>
                      <dd className="mt-1">{project.year}</dd>
                    </div>
                  )}
                </dl>
              )}

              {!project.verified && (
                <p className="annot mt-6 border-l-2 border-accent pl-3 text-stone/80">
                  {t.lightbox.sampleNote}
                </p>
              )}

              {items.length > 1 && (
                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={t.lightbox.prev}
                    className="inline-flex size-12 items-center justify-center border border-ivory/25 transition-colors duration-300 hover:bg-ivory hover:text-ink"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={t.lightbox.next}
                    className="inline-flex size-12 items-center justify-center border border-ivory/25 transition-colors duration-300 hover:bg-ivory hover:text-ink"
                  >
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

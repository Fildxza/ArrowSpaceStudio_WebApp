import { useCallback, useRef, useState, type CSSProperties } from "react";
import {
  hasDemoProjects,
  hasUnverifiedProjects,
  projectCategories,
  projects,
  type ProjectLayout,
} from "@/config/portfolio";
import { fmt, useCopy, useL } from "@/i18n";
import { categoriesInUse, filterProjects, type ProjectFilter } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Annot } from "./Graphics";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Motion";

const filters: ProjectFilter[] = ["All", ...categoriesInUse(projects, projectCategories)];

const layoutCls: Record<ProjectLayout, { col: string; frame: string; sizes: string }> = {
  wide: { col: "md:col-span-7", frame: "aspect-[4/3]", sizes: "(min-width: 768px) 56vw, 100vw" },
  tall: { col: "md:col-span-5", frame: "aspect-[4/5]", sizes: "(min-width: 768px) 40vw, 100vw" },
  square: { col: "md:col-span-5", frame: "aspect-square", sizes: "(min-width: 768px) 40vw, 100vw" },
};

const pad = (n: number) => String(n).padStart(2, "0");

export function Work() {
  const t = useCopy();
  const l = useL();
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [active, setActive] = useState<number | null>(null);
  const [filtered, setFiltered] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const list = filterProjects(projects, filter);

  const close = useCallback(() => {
    setActive(null);
    trigger.current?.focus();
  }, []);

  const count = (f: ProjectFilter) => filterProjects(projects, f).length;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="on-dark relative bg-ink py-24 text-ivory md:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <Annot className="text-stone">
                {hasDemoProjects
                  ? t.work.labelSample
                  : hasUnverifiedProjects
                    ? t.work.labelPreview
                    : t.work.label}
              </Annot>
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.9] tracking-[-0.03em]"
            >
              <span id="work-title">
                {t.work.headingA} <em className="italic text-accent-soft">{t.work.headingB}</em>
              </span>
            </Reveal>
            {hasUnverifiedProjects && (
              <Reveal
                as="p"
                delay={140}
                className="mt-6 max-w-md text-sm leading-relaxed text-stone/80"
              >
                {hasDemoProjects ? t.work.sampleNote : t.work.socialNote}
              </Reveal>
            )}
          </div>

          <Reveal delay={160}>
            <div role="group" aria-label={t.work.filterAria} className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const on = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setFilter(f);
                      setFiltered(true);
                    }}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 border px-4 text-sm tracking-wide transition-colors duration-300",
                      on
                        ? "border-accent-soft bg-accent-soft text-ink"
                        : "border-ivory/20 text-stone hover:border-ivory/60 hover:text-ivory",
                    )}
                  >
                    {f === "All" ? t.work.all : t.work.categories[f]}
                    <span className={cn("annot", on ? "text-ink/70" : "text-stone/60")}>
                      {pad(count(f))}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered
            ? fmt(filter === "All" ? t.work.showingAll : t.work.showingIn, {
                n: list.length,
                noun: list.length === 1 ? t.work.projectOne : t.work.projectMany,
                cat: filter === "All" ? "" : t.work.categories[filter],
              })
            : ""}
        </p>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-24">
          {list.map((p, i) => {
            const lay = layoutCls[p.layout];
            const style = { "--d": `${(i % 2) * 120}ms` } as CSSProperties;
            return (
              <li
                key={`${filter}-${p.id}`}
                className={cn(lay.col, i % 2 === 1 && "md:mt-32", filtered && "tile-in")}
                style={filtered ? style : undefined}
              >
                <Reveal variant="mask" delay={(i % 2) * 120}>
                  <button
                    type="button"
                    onClick={(e) => {
                      trigger.current = e.currentTarget;
                      setActive(i);
                    }}
                    className="group block w-full text-left"
                    aria-label={fmt(
                      p.status === "verified"
                        ? t.work.viewAria
                        : p.status === "demo"
                          ? t.work.viewAriaSample
                          : t.work.viewAriaPreview,
                      { title: l(p.title) },
                    )}
                  >
                    <div className="crop relative">
                      <div className={cn("mask relative overflow-hidden bg-charcoal", lay.frame)}>
                        <img
                          src={p.image.src}
                          srcSet={p.image.srcSet}
                          sizes={lay.sizes}
                          width={p.image.width}
                          height={p.image.height}
                          alt={l(p.image.alt)}
                          loading="lazy"
                          decoding="async"
                          style={p.focal ? { objectPosition: p.focal } : undefined}
                          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease)] group-hover:scale-[1.05]"
                        />
                        {p.status !== "verified" && (
                          <span className="annot absolute left-4 top-4 bg-ink/80 px-2.5 py-1.5 text-ivory backdrop-blur-sm">
                            {p.status === "demo" ? t.common.sample : t.work.badgeSocial}
                          </span>
                        )}
                        <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-accent-deep px-5 py-4 text-sm font-semibold transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                          {t.work.viewProject} <span aria-hidden="true">↗</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-ivory/15 pt-4">
                      <span className="font-display text-2xl font-light md:text-3xl">
                        {l(p.title)}
                      </span>
                      <span className="annot text-stone/70">
                        {pad(i + 1)} / {t.work.categories[p.category]}
                      </span>
                    </div>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox items={list} index={active} onIndexChange={setActive} onClose={close} />
    </section>
  );
}

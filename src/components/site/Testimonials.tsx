import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/config/portfolio";
import { socialProof, type SocialProof } from "@/config/social-proof";
import { fmt, useCopy, useL } from "@/i18n";
import { cn } from "@/lib/utils";
import { Annot } from "./Graphics";
import { Reveal } from "./Motion";

const pad = (n: number) => String(n).padStart(2, "0");

export function Testimonials({ data = socialProof }: { data?: SocialProof }) {
  const t = useCopy();
  const l = useL();
  const [index, setIndex] = useState(0);
  if (data.mode === "hidden") return null;

  const placeholder = data.mode === "placeholder";
  const items = data.testimonials;
  const current = items[index];
  const project = current?.projectId ? projects.find((p) => p.id === current.projectId) : undefined;
  const step = (d: number) => setIndex((i) => (i + d + items.length) % items.length);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="on-dark relative overflow-hidden bg-ink py-28 text-ivory md:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* Heading + controls */}
          <div className="col-span-12 flex flex-col lg:col-span-3">
            <Reveal>
              <Annot className="text-stone">
                {t.testimonials.label}
                {placeholder ? " — " + t.common.placeholder : ""}
              </Annot>
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-6 font-display text-[clamp(2.4rem,4vw,3.6rem)] font-light leading-[0.98] tracking-[-0.02em]"
            >
              <span id="testimonials-title">
                {t.testimonials.headingA}
                <br />
                <em className="italic text-accent-soft">{t.testimonials.headingB}</em>
              </span>
            </Reveal>

            {items.length > 1 && (
              <div className="mt-10 flex items-center gap-4 lg:mt-14">
                <span className="annot text-stone" aria-hidden="true">
                  {pad(index + 1)} / {pad(items.length)}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={t.testimonials.prev}
                    className="inline-flex size-12 items-center justify-center border border-ivory/25 transition-colors duration-300 hover:bg-ivory hover:text-ink"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={t.testimonials.next}
                    className="inline-flex size-12 items-center justify-center border border-ivory/25 transition-colors duration-300 hover:bg-ivory hover:text-ink"
                  >
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quote */}
          {current && (
            <Reveal
              delay={120}
              className="relative col-span-12 mt-14 lg:col-span-8 lg:col-start-5 lg:mt-0"
            >
              <span
                aria-hidden="true"
                className="stencil pointer-events-none absolute -left-2 -top-16 select-none font-display text-[10rem] leading-none text-accent md:-left-6 md:-top-24 md:text-[16rem]"
              >
                “
              </span>
              <div aria-live="polite">
                <figure
                  key={index}
                  aria-label={fmt(t.testimonials.nOfTotal, { n: index + 1, total: items.length })}
                  className="fade-up relative"
                >
                  <blockquote
                    className={cn(
                      "font-display text-[clamp(1.7rem,3.4vw,3.2rem)] font-light leading-[1.15] tracking-[-0.01em]",
                      placeholder && "text-stone/70 italic",
                    )}
                  >
                    {l(current.quote)}
                  </blockquote>
                  <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ivory/15 pt-6">
                    <span aria-hidden="true" className="h-px w-10 bg-accent-soft" />
                    <span>
                      <span className="block font-semibold">{current.name}</span>
                      {current.role && (
                        <span className="annot mt-1 block text-stone">{l(current.role)}</span>
                      )}
                    </span>
                    {placeholder && (
                      <span className="annot border border-current px-1.5 py-0.5 text-[0.6rem] text-accent-soft">
                        {t.testimonials.sampleSlot}
                      </span>
                    )}
                    {project && (
                      <a
                        href="#work"
                        className="link-line annot ml-auto text-stone hover:text-ivory"
                      >
                        {fmt(t.testimonials.project, { title: l(project.title) })}
                      </a>
                    )}
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          )}
        </div>

        {/* Client logos */}
        <Reveal delay={160} className="mt-24 md:mt-32">
          <p className="annot text-stone/70">
            {placeholder ? t.testimonials.clientsPlaceholder : t.testimonials.clients}
          </p>
          <ul className="mt-6 grid grid-cols-2 border-l border-t border-ivory/15 sm:grid-cols-3 lg:grid-cols-6">
            {data.mode === "real"
              ? data.logos.map((c) => {
                  const img = (
                    <img
                      src={c.logo}
                      alt={c.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-12 w-auto max-w-[70%] object-contain opacity-60 brightness-0 invert transition-opacity duration-500 group-hover:opacity-100"
                    />
                  );
                  return (
                    <li
                      key={c.name}
                      className="group flex aspect-[3/2] items-center justify-center border-b border-r border-ivory/15"
                    >
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-full w-full items-center justify-center"
                        >
                          {img}
                          <span className="sr-only"> {t.common.opensNewTab}</span>
                        </a>
                      ) : (
                        img
                      )}
                    </li>
                  );
                })
              : Array.from({ length: data.logoSlots }, (_, i) => (
                  <li
                    key={i}
                    className="flex aspect-[3/2] flex-col items-center justify-center gap-2 border-b border-r border-ivory/15 text-stone/40"
                  >
                    <span className="font-display text-xl italic">{t.testimonials.clientLogo}</span>
                    <span className="annot text-[0.6rem]">
                      {fmt(t.testimonials.slot, { n: pad(i + 1) })}
                    </span>
                  </li>
                ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

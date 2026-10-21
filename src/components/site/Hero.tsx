import type { CSSProperties } from "react";
import { isDemo } from "@/config/business";
import { useCopy, useL, useLang } from "@/i18n";
import { getImage } from "@/config/images";
import { cn } from "@/lib/utils";
import { Annot, BrushStroke, RegMark } from "./Graphics";
import { Parallax } from "./Motion";

const hero = getImage("hero", {
  en: "Large botanical mural in terracotta, ochre and olive tones on a gallery wall (demonstration image)",
  ms: "Mural botani besar dalam warna terakota, oker dan zaitun pada dinding galeri (imej demonstrasi)",
});
const artist = getImage("artist", {
  en: "Muralist painting a navy and terracotta wall from a scaffold (demonstration image)",
  ms: "Pelukis mural melukis dinding biru laut dan terakota dari perancah (imej demonstrasi)",
});

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const t = useCopy();
  const l = useL();
  const lang = useLang();
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-ink text-ivory">
      {/* faint construction lines behind the composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px)] [background-size:calc(100%/12)_100%]"
      />
      <div
        aria-hidden="true"
        className="ruler-y pointer-events-none absolute bottom-24 left-3 hidden h-56 text-ivory lg:block"
      />

      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-x-6 px-5 pb-10 pt-28 md:px-10 md:pt-36 lg:min-h-[100svh] lg:pb-12 lg:pt-40">
        <div className="col-span-12 flex flex-col lg:col-span-6">
          <div className="fade-up flex items-center gap-5" style={d(100)}>
            <Annot className="text-stone">{t.hero.label}</Annot>
            <RegMark className="hidden size-4 text-accent-soft sm:block" />
          </div>

          <h1
            className={cn(
              "relative mt-8 font-display font-light leading-[0.9] tracking-[-0.035em] lg:mt-10",
              // Bahasa Melayu lines are longer ("Bercerita."), so the type scales down to stay inside its column.
              lang === "ms"
                ? "text-[clamp(3.2rem,14vw,7rem)] lg:text-[clamp(4rem,8.4vw,8.6rem)]"
                : "text-[clamp(3.8rem,18vw,9rem)] lg:text-[clamp(5rem,11.4vw,11.5rem)]",
            )}
          >
            <span className="line">
              <span style={d(200)}>{t.hero.line1}</span>
            </span>
            <span className="line pl-[0.9em] lg:pl-[1.1em]">
              <span style={d(320)}>{t.hero.line2}</span>
            </span>
            <span className="line pl-[0.45em]">
              <span style={d(440)}>
                <em className="font-normal italic text-accent-soft">{t.hero.line3}</em>
              </span>
            </span>
            <BrushStroke
              mode="hero"
              delay={1100}
              className="pointer-events-none absolute -bottom-[0.04em] left-[0.4em] h-[0.16em] w-[3.1em]"
            />
          </h1>

          <div className="mt-10 lg:mt-auto lg:pt-12">
            <p className="fade-up max-w-sm text-lg leading-relaxed text-stone" style={d(850)}>
              {t.hero.tagline}
            </p>
            <div
              className="fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={d(1000)}
            >
              <a href="#work" className="btn btn-accent">
                {t.hero.explore}{" "}
                <span aria-hidden="true" className="arrow">
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="link-line py-2 text-sm font-semibold tracking-wide text-ivory/90"
              >
                {t.hero.start}
              </a>
            </div>
          </div>
        </div>

        <figure className="relative col-span-12 mt-12 flex flex-col lg:col-span-6 lg:mt-0 xl:col-span-5 xl:col-start-8">
          <div className="crop relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[34rem] lg:flex-1">
            <div className="hero-frame absolute inset-0 overflow-hidden bg-charcoal" style={d(150)}>
              <Parallax speed={0.06} className="absolute inset-x-0 -top-[7%] h-[114%]">
                <img
                  src={hero.src}
                  srcSet={hero.srcSet}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  width={hero.width}
                  height={hero.height}
                  alt={l(hero.alt)}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover [object-position:42%_50%]"
                />
              </Parallax>
            </div>

            <div
              className="fade-up absolute -left-12 bottom-14 hidden w-36 border-[6px] border-ink xl:block 2xl:w-44"
              style={d(1250)}
            >
              <img
                src={artist.src}
                srcSet={artist.srcSet}
                sizes="176px"
                width={artist.width}
                height={artist.height}
                alt={l(artist.alt)}
                loading="eager"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          <figcaption
            className="annot fade-up mt-4 flex items-center justify-between gap-4 text-stone/80"
            style={d(1100)}
          >
            <span>
              {t.hero.caption}
              {isDemo ? " · " + t.common.sample : ""}
            </span>
            <a
              href="#intro"
              className="group hidden items-center gap-3 sm:inline-flex"
              aria-label={t.hero.scrollAria}
            >
              <span className="relative h-8 w-px overflow-hidden bg-ivory/25" aria-hidden="true">
                <span className="scroll-dot absolute inset-x-0 top-0 h-1/2 bg-ivory" />
              </span>
              {t.hero.scroll}
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

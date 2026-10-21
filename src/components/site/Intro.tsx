import { marquee, philosophy } from "@/config/content";
import { Annot, Drips, RegMark } from "./Graphics";
import { Reveal } from "./Motion";

/** Terracotta ticker that hands the dark hero over to the ivory page, with paint drips running off it. */
export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee relative z-10 bg-accent-deep text-ivory" role="presentation">
      <div className="overflow-hidden py-4" aria-hidden="true">
        <div className="marquee-track font-display text-2xl font-light italic md:text-3xl">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {row.map((label, i) => (
                <li key={`${label}-${i}`} className="flex items-center whitespace-nowrap">
                  <span className="px-8">{label}</span>
                  <span className="text-ink/70">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Residential, commercial, hospitality, exterior and custom mural commissions.
      </p>
      <Reveal variant="draw" className="absolute inset-x-0 top-full -mt-px h-16 md:h-24">
        <Drips className="h-full" />
      </Reveal>
    </div>
  );
}

export function Intro() {
  return (
    <section
      id="intro"
      className="relative mx-auto max-w-[1500px] px-5 pb-28 pt-40 md:px-10 md:pb-44 md:pt-56"
    >
      <RegMark className="pointer-events-none absolute right-6 top-36 hidden size-16 text-accent/60 md:block" />
      <div
        aria-hidden="true"
        className="ruler-x pointer-events-none absolute inset-x-5 bottom-10 text-charcoal md:inset-x-10"
      />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <Annot>Philosophy</Annot>
          </Reveal>
        </div>
        <Reveal
          as="p"
          className="col-span-12 font-display text-[clamp(1.9rem,4.4vw,4.2rem)] font-light leading-[1.1] tracking-tight md:col-span-9"
        >
          {philosophy.lead}{" "}
          <em className="font-normal italic text-accent-deep">{philosophy.emphasis}</em>{" "}
          <span className="text-muted-foreground">{philosophy.support}</span>
        </Reveal>
      </div>
    </section>
  );
}

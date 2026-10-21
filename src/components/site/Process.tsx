import { comparison, process } from "@/config/content";
import { isDemo } from "@/config/business";
import { BeforeAfter } from "./BeforeAfter";
import { Annot } from "./Graphics";
import { Parallax, Reveal } from "./Motion";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-stone/60 py-28 md:py-40"
    >
      <Parallax
        speed={-0.12}
        className="pointer-events-none absolute right-0 top-6 select-none md:-right-[2vw]"
      >
        <span
          aria-hidden="true"
          className="stencil block whitespace-nowrap font-display text-[30vw] font-light leading-none text-charcoal/20 md:text-[17vw]"
        >
          Process
        </span>
      </Parallax>

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <Annot>From Idea to Finished Wall{isDemo ? " — Proposed" : ""}</Annot>
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-6 font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-light leading-[0.98] tracking-[-0.02em]"
            >
              <span id="process-title">
                A considered process, <em className="italic text-accent-deep">start to reveal.</em>
              </span>
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={160}
            className="col-span-12 max-w-sm self-end leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9"
          >
            Five clear stages, so you always know what happens next and what we need from you.
          </Reveal>
        </div>

        <Reveal
          as="ol"
          variant="draw"
          className="relative mt-20 grid gap-0 md:mt-28 md:grid-cols-5 md:gap-6"
        >
          {/* desktop connector */}
          <span
            aria-hidden="true"
            className="draw-x absolute inset-x-0 top-6 hidden h-px bg-charcoal md:block"
          />
          {/* mobile connector */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-charcoal/30 md:hidden"
          />

          {process.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={200 + i * 130}
              className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-12 last:pb-0 md:block md:pb-0"
            >
              <span className="relative z-10 inline-flex size-12 items-center justify-center bg-ink font-mono text-sm text-ivory">
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-3xl font-light md:mt-8">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </Reveal>

        <div className="mt-28 grid grid-cols-12 gap-x-6 gap-y-10 border-t border-charcoal/80 pt-12 md:mt-40">
          <div className="col-span-12 lg:col-span-4">
            <Reveal>
              <Annot>Concept → Reveal{comparison.verified ? "" : " — Sample"}</Annot>
            </Reveal>
            <Reveal
              as="h3"
              delay={80}
              className="mt-6 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[1] tracking-[-0.02em]"
            >
              From sketch <em className="italic text-accent-deep">to wall.</em>
            </Reveal>
            <Reveal
              as="p"
              delay={140}
              className="mt-6 max-w-sm leading-relaxed text-muted-foreground"
            >
              Drag across the image to compare the concept stage with the finished mural.
            </Reveal>
            {!comparison.verified && (
              <p className="annot mt-6 max-w-sm border-l-2 border-accent pl-3 text-muted-foreground">
                Demonstration — the sketch is generated from sample artwork. Real before/after
                photos replace it later.
              </p>
            )}
          </div>
          <Reveal variant="mask" delay={120} className="col-span-12 lg:col-span-8">
            <div className="crop">
              <div className="mask">
                <BeforeAfter
                  before={comparison.before}
                  after={comparison.after}
                  beforeLabel={comparison.beforeLabel}
                  afterLabel={comparison.afterLabel}
                  label="Compare the concept sketch with the finished mural"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

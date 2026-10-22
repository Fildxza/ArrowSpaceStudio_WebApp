import { business, isDemo, showSampleMarks } from "@/config/business";
import { fmt, useCopy, useL } from "@/i18n";
import { about } from "@/config/content";
import { getImage } from "@/config/images";
import { Annot, BrushStroke } from "./Graphics";
import { Parallax, Reveal } from "./Motion";
import { SocialGlyph } from "./SocialIcons";

const artist = getImage("arrow-city-at-work", {
  en: "Artist seen from behind painting a glowing city skyline on a wall",
  ms: "Pelukis dilihat dari belakang melukis garis langit bandar bercahaya pada dinding",
});
const detailImg = getImage("arrow-scaffold-planet", {
  en: "Scaffolding in a high-ceilinged hall in front of a large planet mural in progress",
  ms: "Perancah di dalam dewan bersiling tinggi di hadapan mural planet besar yang sedang dilukis",
});

function SampleTag({ children }: { children: string }) {
  if (!showSampleMarks()) return null;
  return (
    <span className="annot ml-2 border border-current px-1.5 py-0.5 align-middle text-[0.6rem] text-accent-deep">
      {children}
    </span>
  );
}

export function About() {
  const t = useCopy();
  const l = useL();
  const showPlaceholder = isDemo && about.placeholder;
  const rows = about.profile;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-44"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-14">
        {/* Image stack */}
        <div className="relative col-span-12 md:col-span-6 lg:col-span-5">
          <Reveal variant="mask">
            <div className="crop">
              <div className="mask relative aspect-[4/5] overflow-hidden bg-stone">
                <Parallax speed={0.05} className="absolute inset-x-0 -top-[6%] h-[112%]">
                  <img
                    src={artist.src}
                    srcSet={artist.srcSet}
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    width={artist.width}
                    height={artist.height}
                    alt={l(artist.alt)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </Parallax>
              </div>
            </div>
          </Reveal>
          <Reveal
            variant="mask"
            delay={250}
            className="absolute -bottom-10 -right-2 w-[38%] border-[6px] border-ivory md:-right-10"
          >
            <div className="mask aspect-square overflow-hidden">
              <img
                src={detailImg.src}
                srcSet={detailImg.srcSet}
                sizes="(min-width: 768px) 20vw, 38vw"
                width={detailImg.width}
                height={detailImg.height}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <p className="annot mt-4 text-muted-foreground">
            {t.about.fig} {" · @arrowspacestudio"}
          </p>
        </div>

        {/* Story + profile */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Annot>{t.about.label}</Annot>
          </Reveal>
          <Reveal
            as="h2"
            variant="draw"
            delay={80}
            className="relative mt-6 w-fit font-display text-[clamp(2.6rem,5.4vw,5.2rem)] font-light leading-[0.98] tracking-[-0.02em]"
          >
            <span id="about-title">
              {t.about.headingA}
              <br />
              <em className="italic text-accent-deep">{t.about.headingB}</em>
            </span>
            <BrushStroke
              delay={500}
              className="pointer-events-none absolute -bottom-3 left-0 h-5 w-2/3"
            />
          </Reveal>

          <div className="mt-12 space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal
                as="p"
                key={i}
                delay={i * 90}
                className={
                  i === 0
                    ? "max-w-xl text-lg leading-relaxed"
                    : "max-w-xl leading-relaxed text-muted-foreground"
                }
              >
                {l(p)}
              </Reveal>
            ))}
            {showPlaceholder && showSampleMarks() && (
              <p className="annot max-w-xl border-l-2 border-accent pl-3 text-muted-foreground">
                {t.about.placeholderNote}
              </p>
            )}
          </div>

          <Reveal as="figure" delay={100} className="mt-10 max-w-xl border-l-2 border-accent pl-5">
            <figcaption className="annot text-muted-foreground">{t.about.quoteLabel}</figcaption>
            <blockquote
              lang="en"
              className="mt-3 font-display text-2xl font-light italic leading-snug md:text-3xl"
            >
              {about.quote.text}
            </blockquote>
            <p className="annot mt-3 text-muted-foreground">
              {about.quote.source}
              {showSampleMarks() ? " · " + t.about.quoteNote : ""}
            </p>
          </Reveal>

          <Reveal as="ul" delay={120} className="mt-12 grid gap-px bg-charcoal/15 sm:grid-cols-3">
            {about.principles.map((p, i) => (
              <li key={i} className="bg-ivory py-5 pr-5 sm:px-5 sm:first:pl-0">
                <span className="annot text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-xl">{l(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l(p.text)}</p>
              </li>
            ))}
          </Reveal>

          {business.leadArtistProfiles.length > 0 && (
            <Reveal delay={140} className="mt-10">
              <p className="annot text-muted-foreground">{t.about.artistProfiles}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {business.leadArtistProfiles.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={fmt(t.social.profileLabel, {
                        platform: t.follow.platforms[p.platform],
                        handle: p.handle ? " " + p.handle : "",
                      })}
                      className="link-line inline-flex min-h-11 items-center gap-2 text-sm"
                    >
                      <SocialGlyph platform={p.platform} className="size-4 text-accent-deep" />
                      {p.handle ?? t.follow.platforms[p.platform]}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {rows.length > 0 && (
            <Reveal as="dl" delay={160} className="mt-12 border-t border-charcoal/80">
              {rows.map((r) => (
                <div
                  key={l(r.label)}
                  className="grid grid-cols-[9rem_1fr] gap-4 border-b border-charcoal/15 py-4 text-sm sm:grid-cols-[12rem_1fr]"
                >
                  <dt className="annot pt-0.5 text-muted-foreground">{l(r.label)}</dt>
                  <dd className={r.sample ? "text-muted-foreground" : ""}>
                    {l(r.value)}
                    {r.sample && <SampleTag>{t.common.sample}</SampleTag>}
                  </dd>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

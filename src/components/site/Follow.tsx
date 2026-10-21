import { business } from "@/config/business";
import { fmt, useCopy } from "@/i18n";
import { Annot } from "./Graphics";
import { Reveal } from "./Motion";
import { SocialGlyph } from "./SocialIcons";

/**
 * "Follow the work" — one big editorial row per confirmed social profile
 * (TikTok, Instagram, Facebook). Hidden until at least one real profile exists.
 */
export function Follow() {
  const t = useCopy();
  if (business.socials.length === 0) return null;

  return (
    <section
      id="follow"
      aria-labelledby="follow-title"
      className="relative overflow-hidden bg-stone/60 py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-x-6 gap-y-12 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <Annot>{t.follow.label}</Annot>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4rem)] font-light leading-[0.98] tracking-[-0.02em]"
          >
            <span id="follow-title">
              {t.follow.headingA}
              <br />
              <em className="italic text-accent-deep">{t.follow.headingB}</em>
            </span>
          </Reveal>
          <Reveal
            as="p"
            delay={140}
            className="mt-6 max-w-sm leading-relaxed text-muted-foreground"
          >
            {t.follow.intro}
          </Reveal>
        </div>

        <Reveal
          as="ul"
          delay={120}
          className="col-span-12 border-t border-charcoal/80 lg:col-span-8"
        >
          {business.socials.map((s, i) => {
            const name = t.follow.platforms[s.platform];
            return (
              <li key={s.platform} className="border-b border-charcoal/15">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={fmt(t.social.profileLabel, {
                    platform: name,
                    handle: s.handle ? " " + s.handle : "",
                  })}
                  className="group relative flex min-h-24 items-center gap-5 px-1 py-6 transition-colors duration-500 hover:bg-ink hover:text-ivory focus-visible:bg-ink focus-visible:text-ivory md:gap-8 md:px-6"
                >
                  <span className="annot w-8 text-accent-deep transition-colors group-hover:text-accent-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <SocialGlyph platform={s.platform} className="size-7 shrink-0 md:size-9" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-none">
                      {name}
                    </span>
                    {s.handle && (
                      <span className="annot mt-2 block text-muted-foreground transition-colors group-hover:text-stone">
                        {s.handle}
                      </span>
                    )}
                  </span>
                  <span className="annot hidden items-center gap-2 sm:inline-flex">
                    {t.follow.open}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

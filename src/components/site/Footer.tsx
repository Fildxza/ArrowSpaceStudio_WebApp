import { business, demoDetails, detail, showSampleMarks } from "@/config/business";
import { nav } from "@/config/content";
import { fmt, useCopy, useL } from "@/i18n";
import { LogoMark } from "./Graphics";
import { Reveal } from "./Motion";
import { SocialLinks } from "./SocialIcons";

export function Footer() {
  const t = useCopy();
  const l = useL();
  const email = detail(business.email, demoDetails.email);
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <Reveal className="flex items-end justify-between gap-6">
          <p
            aria-hidden="true"
            className="font-display text-[clamp(3rem,13.5vw,13rem)] font-light leading-[0.85] tracking-[0.02em]"
          >
            {business.name}
          </p>
          <LogoMark className="mb-[1.5vw] hidden size-[6vw] max-h-24 max-w-24 shrink-0 text-accent-deep md:block" />
        </Reveal>

        <div className="mt-14 grid gap-12 border-t border-ivory/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <p className="max-w-xs text-stone">{l(business.tagline)}</p>

          <nav aria-label={t.footer.explore}>
            <p className="annot text-stone/70">{t.footer.explore}</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line inline-block py-1 text-sm">
                    {l(n.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <p className="annot text-stone/70">{t.footer.contact}</p>
            <div className="mt-4 space-y-2 text-stone">
              {email &&
                (email.sample ? (
                  <p>{email.value}</p>
                ) : (
                  <a href={`mailto:${email.value}`} className="link-line">
                    {email.value}
                  </a>
                ))}
              {business.address && <p>{business.address}</p>}
              {business.serviceAreas.length > 0 && <p>{business.serviceAreas.join(" · ")}</p>}
            </div>
          </div>

          <div className="text-sm">
            <p className="annot text-stone/70">{t.footer.follow}</p>
            <SocialLinks
              className="-ml-2.5 mt-3 text-stone"
              itemClassName="size-11 hover:text-ivory"
              iconClassName="size-5"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-ivory/10 pt-6 text-xs text-stone/70 md:flex-row">
          <p>{fmt(t.footer.rights, { year, name: business.name })}</p>
          {showSampleMarks() && <p>{t.footer.preview}</p>}
          <a href="#top" className="link-line w-fit">
            {t.footer.top}
          </a>
        </div>
      </div>
    </footer>
  );
}

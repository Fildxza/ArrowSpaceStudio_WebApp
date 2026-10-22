import { useEffect, useRef, useState } from "react";
import { Clock, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { business, demoDetails, detail } from "@/config/business";
import { buildMailto, buildTelUrl, displayPhone } from "@/lib/contact";
import { nav } from "@/config/content";
import { fmt, useCopy, useL } from "@/i18n";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Graphics";
import { LanguageSwitch } from "./LanguageSwitch";
import { SocialLinks } from "./SocialIcons";
import { WhatsAppLink } from "./WhatsAppLink";

/** Thin utility strip above the main navigation (desktop): quick contacts + socials. */
function TopBar({ collapsed }: { collapsed: boolean }) {
  const t = useCopy();
  const l = useL();
  const phone = detail(displayPhone(), demoDetails.phone);
  const email = detail(business.email, demoDetails.email);
  const hours = detail(l(business.openingHours), l(demoDetails.openingHours));
  const tel = buildTelUrl();
  const mail = buildMailto(business.email, t.nav.mailSubject);
  const item = "inline-flex min-h-9 items-center gap-2 transition-colors hover:text-ivory";

  return (
    <div
      className={cn(
        "hidden transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease)] md:grid",
        collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
      )}
      inert={collapsed}
    >
      <div className="overflow-hidden">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 border-b border-ivory/10 px-5 py-1 text-xs text-stone md:px-10">
          <ul className="flex items-center gap-6">
            <li>
              <WhatsAppLink className={item}>
                <MessageCircle aria-hidden="true" className="size-3.5 text-accent-soft" />
                {t.nav.whatsapp}
              </WhatsAppLink>
            </li>
            {phone && (
              <li>
                {tel ? (
                  <a href={tel} className={item}>
                    <Phone aria-hidden="true" className="size-3.5 text-accent-soft" />
                    {phone.value}
                  </a>
                ) : (
                  <span className="inline-flex min-h-9 items-center gap-2">
                    <Phone aria-hidden="true" className="size-3.5 text-accent-soft" />
                    {phone.value}
                    {phone.sample && (
                      <span className="annot text-[0.6rem] opacity-70">· {t.nav.sampleTag}</span>
                    )}
                  </span>
                )}
              </li>
            )}
            {email && (
              <li className="hidden lg:block">
                {mail ? (
                  <a href={mail} className={item}>
                    <Mail aria-hidden="true" className="size-3.5 text-accent-soft" />
                    {email.value}
                  </a>
                ) : (
                  <span className="inline-flex min-h-9 items-center gap-2">
                    <Mail aria-hidden="true" className="size-3.5 text-accent-soft" />
                    {email.value}
                    {email.sample && (
                      <span className="annot text-[0.6rem] opacity-70">· {t.nav.sampleTag}</span>
                    )}
                  </span>
                )}
              </li>
            )}
            {hours && (
              <li className="hidden items-center gap-2 xl:inline-flex">
                <Clock aria-hidden="true" className="size-3.5 text-accent-soft" />
                {hours.value}
                {hours.sample && (
                  <span className="annot text-[0.6rem] opacity-70">· {t.nav.sampleTag}</span>
                )}
              </li>
            )}
          </ul>
          <div className="flex items-center gap-3">
            <span className="annot hidden text-[0.6rem] text-stone/70 lg:inline">
              {t.nav.followStudio}
            </span>
            <SocialLinks
              showHandle
              itemClassName="size-9 hover:text-ivory"
              iconClassName="size-4"
            />
            <LanguageSwitch className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

/** Highlights the nav entry whose section is crossing the middle of the viewport. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = nav.map((n) => n.href.slice(1));

export function Nav() {
  const t = useCopy();
  const l = useL();
  const scrolled = useScrolled();
  const active = useScrollSpy(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock scroll, close on Escape / when resized to desktop, manage focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,box-shadow] duration-500",
        // backdrop-filter would become the containing block of the fixed mobile sheet, so it is skipped while open.
        open
          ? "bg-ink"
          : scrolled
            ? "bg-ink/92 shadow-[0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-md"
            : "bg-transparent",
      )}
    >
      <TopBar collapsed={scrolled || open} />
      <div
        className={cn(
          "mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-[padding] duration-500 md:px-10",
          scrolled || open ? "py-3" : "py-5",
        )}
      >
        <a
          href="#top"
          aria-label={fmt(t.nav.backToTop, { name: business.name })}
          className="group flex items-center gap-3"
        >
          <LogoMark className="size-7 text-accent-deep transition-transform duration-500 group-hover:rotate-[-6deg]" />
          <span className="font-display text-[0.8rem] font-semibold tracking-[0.1em] min-[400px]:text-base sm:text-lg sm:tracking-[0.18em]">
            {business.name}
          </span>
        </a>

        <nav aria-label={t.nav.primary} className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => {
            const current = active === n.href.slice(1);
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "link-line py-2 text-sm tracking-wide transition-colors",
                  current ? "text-accent-soft" : "text-ivory/85 hover:text-ivory",
                )}
              >
                {l(n.label)}
              </a>
            );
          })}
          <a href="#contact" className="btn btn-outline min-h-11 px-5 py-2.5">
            {t.nav.startProject}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-3 inline-flex size-12 items-center justify-center lg:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        data-open={open}
        inert={!open}
        className="menu-sheet fixed inset-0 -z-10 flex flex-col justify-end bg-ink px-6 pb-14 pt-28 lg:hidden"
      >
        <nav aria-label={t.nav.mobile} className="flex flex-col gap-3">
          {[
            ...nav.map((n) => ({ label: l(n.label), href: n.href })),
            { label: t.nav.startProject, href: "#contact" as `#${string}` },
          ].map((n, i) => (
            <a
              key={n.label}
              ref={i === 0 ? firstLinkRef : undefined}
              href={n.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex min-h-14 items-baseline gap-4 border-b border-ivory/10 py-2 font-display text-[2.6rem] leading-none transition-[transform,opacity] duration-700 ease-[var(--ease)]",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
            >
              <span className="annot text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </a>
          ))}
        </nav>

        <div
          className={cn(
            "mt-10 flex flex-wrap items-center justify-between gap-4 transition-opacity duration-700",
            open ? "opacity-100 delay-500" : "opacity-0",
          )}
        >
          <div className="flex flex-wrap gap-2">
            <WhatsAppLink
              onOpen={() => setOpen(false)}
              className="btn btn-accent min-h-12 gap-2 px-4 py-3"
            >
              <MessageCircle aria-hidden="true" className="size-4" /> {t.nav.whatsapp}
            </WhatsAppLink>
            <MobileCall />
          </div>
          <LanguageSwitch large />
          <SocialLinks className="basis-full" itemClassName="size-11" iconClassName="size-5" />
        </div>
      </div>
    </header>
  );
}

function MobileCall() {
  const t = useCopy();
  const tel = buildTelUrl();
  if (tel) {
    return (
      <a href={tel} className="btn btn-outline min-h-12 gap-2 px-4 py-3">
        <Phone aria-hidden="true" className="size-4" /> {t.nav.call}
      </a>
    );
  }
  return (
    <span
      aria-disabled="true"
      title={t.nav.phonePending}
      className="btn btn-outline min-h-12 gap-2 px-4 py-3"
    >
      <Phone aria-hidden="true" className="size-4" /> {t.nav.call}
    </span>
  );
}

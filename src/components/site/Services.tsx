import { useState } from "react";
import { isDemo } from "@/config/business";
import { services, servicesConfirmed } from "@/config/content";
import { serviceEnquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Annot } from "./Graphics";
import { Reveal } from "./Motion";
import { announceEnquiry } from "@/lib/enquiry";
import { WhatsAppLink } from "./WhatsAppLink";

export function Services() {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const active = services.find((s) => s.id === activeId) ?? services[0];

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-[1500px] px-5 pb-28 md:px-10 md:pb-40"
    >
      <div className="grid grid-cols-12 gap-x-6 border-t border-charcoal/80 pt-8">
        {/* Sticky heading + live preview (desktop) */}
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Annot>Services{isDemo && !servicesConfirmed ? " — Proposed" : ""}</Annot>
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-6 font-display text-[clamp(3rem,7vw,6.25rem)] font-light leading-[0.9] tracking-[-0.03em]"
            >
              <span id="services-title">
                What we
                <br />
                <em className="italic text-accent-deep">paint.</em>
              </span>
            </Reveal>
            <Reveal as="p" delay={160} className="mt-6 max-w-sm text-muted-foreground">
              Every commission begins with your space and your story. Choose a starting point — we
              shape the rest together.
            </Reveal>

            <Reveal variant="mask" delay={200} className="mt-10 hidden lg:block">
              <div className="crop relative">
                <div className="mask relative aspect-[16/11] overflow-hidden bg-stone">
                  {services.map((s) => (
                    <img
                      key={s.id}
                      src={s.image.src}
                      srcSet={s.image.srcSet}
                      sizes="(min-width: 1500px) 560px, 38vw"
                      width={s.image.width}
                      height={s.image.height}
                      alt={s.id === active?.id ? s.image.alt : ""}
                      aria-hidden={s.id !== active?.id}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-[opacity,transform,clip-path] duration-[900ms] ease-[var(--ease)]",
                        s.id === active?.id
                          ? "scale-100 opacity-100 [clip-path:inset(0)]"
                          : "scale-105 opacity-0 [clip-path:inset(0_0_0_100%)]",
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="annot mt-4 text-muted-foreground">
                Fig. — {active?.title}
                {isDemo ? " · Sample image" : ""}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Index of services */}
        <ol className="col-span-12 mt-14 lg:col-span-7 lg:mt-0">
          {services.map((s, i) => {
            const isActive = s.id === active?.id;
            return (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 70}
                className="group border-b border-charcoal/15 first:border-t lg:first:border-t-0"
              >
                <div
                  className="grid grid-cols-12 items-start gap-x-4 gap-y-5 py-8 md:py-10"
                  onMouseEnter={() => setActiveId(s.id)}
                  onFocusCapture={() => setActiveId(s.id)}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "stencil col-span-3 font-display text-5xl leading-none transition-colors duration-500 md:col-span-2 md:text-6xl",
                      isActive ? "text-accent-deep" : "text-charcoal/50",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="col-span-9 md:col-span-10">
                    <h3 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-light leading-[1.02] transition-transform duration-700 ease-[var(--ease)] lg:group-hover:translate-x-2">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                      {s.summary}
                    </p>

                    {/* Mobile/tablet image — the desktop preview lives in the sticky column */}
                    <div className="mt-6 aspect-[16/10] overflow-hidden bg-stone lg:hidden">
                      <img
                        src={s.image.src}
                        srcSet={s.image.srcSet}
                        sizes="(min-width: 768px) 80vw, 75vw"
                        width={s.image.width}
                        height={s.image.height}
                        alt={s.image.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <WhatsAppLink
                      message={serviceEnquiryMessage(s.title)}
                      fallbackHref="#contact"
                      onFallback={() => announceEnquiry(s.title)}
                      className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-wide"
                    >
                      <span className="link-line">Enquire about {s.title.toLowerCase()}</span>
                      <span
                        aria-hidden="true"
                        className="text-accent-deep transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </WhatsAppLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

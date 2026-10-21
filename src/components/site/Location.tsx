import { useState, type ReactNode } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { business, demoDetails, detail, detailList, isDemo } from "@/config/business";
import { useCopy, useL } from "@/i18n";
import { buildTelUrl, directionsUrl, displayPhone } from "@/lib/contact";
import { fmt } from "@/i18n";
import { Annot } from "./Graphics";
import { Reveal } from "./Motion";

function SampleTag() {
  const t = useCopy();
  return (
    <span className="annot ml-2 border border-current px-1.5 py-0.5 align-middle text-[0.6rem] text-accent-deep">
      {t.common.sample}
    </span>
  );
}

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[1.5rem_1fr] gap-x-4 border-b border-charcoal/15 py-5">
      <span aria-hidden="true" className="pt-0.5 text-accent-deep">
        {icon}
      </span>
      <div>
        <dt className="annot text-muted-foreground">{label}</dt>
        <dd className="mt-1.5 leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}

/** Stylised site-plan map used until a real map is configured. Purely decorative. */
function SampleMap() {
  const t = useCopy();
  return (
    <svg viewBox="0 0 800 560" role="img" aria-label={t.location.mapAria} className="h-full w-full">
      <rect width="800" height="560" fill="var(--stone)" />
      {/* park + water */}
      <path
        d="M520 0h280v190c-60 20-130 10-190-30C560 125 530 70 520 0Z"
        fill="oklch(0.8 0.04 130 / 0.55)"
      />
      <path
        d="M-20 430c120-40 210-10 300 40s210 70 330 20 160-70 210-60"
        fill="none"
        stroke="oklch(0.78 0.035 230)"
        strokeWidth="38"
        strokeLinecap="round"
      />
      {/* city blocks */}
      <g fill="var(--ivory)" opacity="0.75">
        {Array.from({ length: 7 }).flatMap((_, c) =>
          Array.from({ length: 4 }).map((__, r) => (
            <rect
              key={`${c}-${r}`}
              x={22 + c * 108}
              y={28 + r * 92}
              width="86"
              height="70"
              rx="2"
            />
          )),
        )}
      </g>
      {/* roads */}
      <g stroke="var(--ivory)" strokeLinecap="round">
        <path d="M0 293h800" strokeWidth="14" />
        <path d="M443 0v560" strokeWidth="14" />
        <path d="M0 80l800 300" strokeWidth="8" opacity="0.9" />
      </g>
      <g stroke="var(--charcoal)" strokeWidth="1" opacity="0.25" fill="none">
        <path d="M0 293h800M443 0v560" strokeDasharray="10 12" />
      </g>
      {/* pin */}
      <g transform="translate(443 293)">
        <circle className="map-pulse" r="34" fill="var(--accent)" opacity="0.18" />
        <circle r="12" fill="var(--accent-deep)" opacity="0.25" />
        <g className="map-pin">
          <path
            d="M0 0c-14-20-22-32-22-44a22 22 0 1 1 44 0c0 12-8 24-22 44Z"
            fill="var(--accent-deep)"
          />
          <circle cy="-44" r="8" fill="var(--ivory)" />
        </g>
      </g>
      <g transform="translate(473 219)">
        <rect width="196" height="54" fill="var(--ink)" />
        <text x="14" y="23" fill="var(--ivory)" fontFamily="var(--font-display)" fontSize="17">
          {business.name}
        </text>
        <text
          x="14"
          y="42"
          fill="var(--accent-soft)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="1.5"
        >
          {t.location.sampleLocation}
        </text>
      </g>
      {/* compass */}
      <g
        transform="translate(748 512)"
        fill="none"
        stroke="var(--charcoal)"
        strokeWidth="1.2"
        opacity="0.6"
      >
        <circle r="22" />
        <path d="M0-16 6 6 0 2-6 6Z" fill="var(--charcoal)" />
        <text
          y="-28"
          textAnchor="middle"
          fill="var(--charcoal)"
          stroke="none"
          fontFamily="var(--font-mono)"
          fontSize="11"
        >
          N
        </text>
      </g>
    </svg>
  );
}

/** Real Google Map behind a click-to-load facade (no third-party request until asked). */
function EmbeddedMap({ src }: { src: string }) {
  const t = useCopy();
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    return (
      <iframe
        title={fmt(t.location.mapTitle, { name: business.name })}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full grayscale-[0.4]"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative flex h-full w-full items-center justify-center bg-stone"
    >
      <SampleMap />
      <span className="btn btn-ink absolute">
        <MapPin aria-hidden="true" className="size-4" /> {t.location.loadMap}
      </span>
    </button>
  );
}

export function Location() {
  const t = useCopy();
  const l = useL();
  const address = detail(business.address, demoDetails.address);
  const hours = detail(business.openingHours, l(demoDetails.openingHours));
  const phone = detail(displayPhone(), demoDetails.phone);
  const areas = detailList(business.serviceAreas, demoDetails.serviceAreas);
  const tel = buildTelUrl();
  const directions = address && !address.sample ? directionsUrl(address.value) : null;
  const mapLink = business.mapUrl || directions;

  if (!address && !areas) return null;

  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="relative bg-ivory py-28 md:py-36"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-x-6 gap-y-14 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-5">
          <Reveal>
            <Annot>
              {t.location.label}
              {isDemo && address?.sample ? " — " + t.common.sample : ""}
            </Annot>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mt-6 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-light leading-[0.95] tracking-[-0.02em]"
          >
            <span id="location-title">
              {t.location.headingA}
              <br />
              <em className="italic text-accent-deep">{t.location.headingB}</em>
            </span>
          </Reveal>
          <Reveal as="p" delay={140} className="mt-6 max-w-sm text-muted-foreground">
            {t.location.intro}
          </Reveal>

          <Reveal as="dl" delay={200} className="mt-10 border-t border-charcoal/80">
            {address && (
              <Row icon={<MapPin className="size-4" />} label={t.location.address}>
                {address.value}
                {address.sample && <SampleTag />}
              </Row>
            )}
            {hours && (
              <Row icon={<Clock className="size-4" />} label={t.location.hours}>
                {hours.value}
                {hours.sample && <SampleTag />}
              </Row>
            )}
            {phone && (
              <Row icon={<Phone className="size-4" />} label={t.location.phone}>
                {tel ? (
                  <a href={tel} className="link-line">
                    {phone.value}
                  </a>
                ) : (
                  phone.value
                )}
                {phone.sample && <SampleTag />}
              </Row>
            )}
            {areas && (
              <Row icon={<Navigation className="size-4" />} label={t.location.areas}>
                {areas.values.join(" · ")}
                {areas.sample && <SampleTag />}
              </Row>
            )}
          </Reveal>

          <Reveal delay={260} className="mt-8 flex flex-wrap gap-3">
            {mapLink ? (
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                <Navigation aria-hidden="true" className="size-4" /> {t.location.directions}
                <span className="sr-only"> {t.location.directionsSr}</span>
              </a>
            ) : (
              <span aria-disabled="true" title={t.location.addressPending} className="btn btn-ink">
                <Navigation aria-hidden="true" className="size-4" /> {t.location.directions}
              </span>
            )}
            {tel && (
              <a href={tel} className="btn btn-outline btn-outline-dark text-charcoal">
                <Phone aria-hidden="true" className="size-4" /> {t.location.call}
              </a>
            )}
          </Reveal>
        </div>

        <Reveal variant="mask" delay={120} className="col-span-12 lg:col-span-7">
          <div className="crop">
            <div className="mask relative aspect-[4/3] overflow-hidden bg-stone lg:aspect-[10/8]">
              {business.mapEmbedUrl ? <EmbeddedMap src={business.mapEmbedUrl} /> : <SampleMap />}
            </div>
          </div>
          <p className="annot mt-4 text-muted-foreground">
            {business.mapEmbedUrl ? t.location.mapCredit : t.location.mapSample}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

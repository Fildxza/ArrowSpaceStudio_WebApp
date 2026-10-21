import { business, demoDetails, isDemo, type SocialPlatform } from "@/config/business";
import { fmt, useCopy } from "@/i18n";
import { cn } from "@/lib/utils";

const LABELS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export function SocialGlyph({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const common = {
    "aria-hidden": true,
    focusable: false,
    className,
    viewBox: "0 0 24 24",
  } as const;
  if (platform === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="currentColor">
      <path d="M16.6 3h-3.1v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.4a5.9 5.9 0 1 0 5 5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4A4.3 4.3 0 0 1 16.6 3Z" />
    </svg>
  );
}

interface SocialLinksProps {
  className?: string;
  /** Classes for each icon button. */
  itemClassName?: string;
  iconClassName?: string;
  showHandle?: boolean;
}

/**
 * Social icons. Real profiles (business.socials) render as links. In demo mode
 * with no profiles configured, the icons render as non-interactive samples.
 */
export function SocialLinks({
  className,
  itemClassName,
  iconClassName = "size-4",
  showHandle,
}: SocialLinksProps) {
  const t = useCopy();
  const base = "inline-flex size-10 items-center justify-center transition-colors duration-300";

  if (business.socials.length) {
    return (
      <ul className={cn("flex items-center gap-1", className)}>
        {business.socials.map((s) => (
          <li key={s.platform}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fmt(t.social.profileLabel, {
                platform: LABELS[s.platform],
                handle: s.handle ? " " + s.handle : "",
              })}
              className={cn(base, "hover:text-accent-soft", itemClassName)}
            >
              <SocialGlyph platform={s.platform} className={iconClassName} />
            </a>
          </li>
        ))}
        {showHandle && business.socials[0]?.handle && (
          <li className="annot ml-2 opacity-80">{business.socials[0].handle}</li>
        )}
      </ul>
    );
  }

  if (!isDemo) return null;

  return (
    <ul className={cn("flex items-center gap-1", className)} aria-label={t.social.samples}>
      {demoDetails.socials.map((p) => (
        <li key={p}>
          <span
            title={fmt(t.social.pendingTitle, { platform: LABELS[p] })}
            className={cn(base, "cursor-default opacity-75", itemClassName)}
          >
            <SocialGlyph platform={p} className={iconClassName} />
            <span className="sr-only">{fmt(t.social.pendingSr, { platform: LABELS[p] })}</span>
          </span>
        </li>
      ))}
      {showHandle && (
        <li className="annot ml-2 opacity-60">
          {demoDetails.socialHandle} · {t.nav.sampleTag}
        </li>
      )}
    </ul>
  );
}

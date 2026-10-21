import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { isDemo } from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsAppLinkProps {
  message?: string;
  className?: string;
  children: ReactNode;
  /** Show the WhatsApp glyph before the label. */
  icon?: boolean;
  /**
   * Where to send the visitor instead when no WhatsApp number is configured
   * (e.g. "#contact"). Without it the control renders disabled.
   */
  fallbackHref?: `#${string}`;
  onFallback?: () => void;
}

/**
 * Opens WhatsApp with a prefilled message. Until the owner supplies a number it
 * either falls back to an on-page anchor or renders a disabled control, so a
 * visitor is never sent to a made-up destination.
 */
export function WhatsAppLink({
  message,
  className,
  children,
  icon,
  fallbackHref,
  onFallback,
}: WhatsAppLinkProps) {
  const url = buildWhatsAppUrl(message);
  const glyph = icon ? <MessageCircle aria-hidden="true" className="size-5 shrink-0" /> : null;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {glyph}
        {children}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </a>
    );
  }

  if (fallbackHref) {
    return (
      <a href={fallbackHref} onClick={onFallback} className={className}>
        {children}
      </a>
    );
  }

  return (
    <span
      role="link"
      aria-disabled="true"
      title="WhatsApp number not configured yet"
      className={cn(className, "cursor-not-allowed")}
    >
      {glyph}
      {children}
      {isDemo && <span className="annot opacity-80">· number pending</span>}
    </span>
  );
}

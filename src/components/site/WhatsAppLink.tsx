import type { MouseEvent, ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { openChat } from "@/lib/chat";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppLinkProps {
  /** Prefilled message for this entry point (e.g. a service enquiry). */
  message?: string;
  /** Short topic label shown in the chat panel for a custom message. */
  topic?: string;
  className?: string;
  children: ReactNode;
  /** Show the WhatsApp glyph before the label. */
  icon?: boolean;
  /** Runs when the chat panel is opened from this control (e.g. to close a menu). */
  onOpen?: () => void;
}

/**
 * Opens the WhatsApp quick-chat panel with a prefilled message. When a number
 * is configured it is also a real wa.me link, so it still works without
 * JavaScript and with ctrl/cmd-click. Without a number there is no link at
 * all — the panel explains that sending is not available yet.
 */
export function WhatsAppLink({
  message,
  topic,
  className,
  children,
  icon,
  onOpen,
}: WhatsAppLinkProps) {
  const url = buildWhatsAppUrl(message);
  const glyph = icon ? <MessageCircle aria-hidden="true" className="size-5 shrink-0" /> : null;

  const open = () => {
    openChat({ ...(message ? { message } : {}), ...(topic ? { topic } : {}) });
    onOpen?.();
  };

  if (url) {
    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      open();
    };
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-haspopup="dialog"
        onClick={onClick}
        className={className}
      >
        {glyph}
        {children}
      </a>
    );
  }

  return (
    <button type="button" aria-haspopup="dialog" onClick={open} className={className}>
      {glyph}
      {children}
    </button>
  );
}

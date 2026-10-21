import { MessageCircle, Phone } from "lucide-react";
import { useQuickContactVisible } from "@/hooks/use-quick-contact";
import { buildTelUrl } from "@/lib/contact";
import { useCopy } from "@/i18n";
import { useChatOpen } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * Sticky enquiry bar for small screens. Appears once the hero has scrolled
 * away and steps aside while the contact section or footer is on screen, so
 * it never covers the form. Without a WhatsApp number it links to #contact.
 */
export function MobileCTA() {
  const t = useCopy();
  const chatOpen = useChatOpen();
  const show = useQuickContactVisible() && !chatOpen;
  const tel = buildTelUrl();

  return (
    <aside
      aria-label={t.mobileCta.aria}
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "on-dark fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-[var(--ease)] md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0",
      )}
    >
      <div className="flex items-center gap-3 bg-ink/95 p-2 pl-4 text-ivory shadow-[0_-1px_0_oklch(1_0_0/0.08),0_12px_32px_oklch(0_0_0/0.35)] backdrop-blur-md">
        <p className="min-w-0 flex-1 text-sm leading-tight">
          <span className="block truncate font-display text-lg">{t.mobileCta.title}</span>
          <span className="annot block truncate text-[0.6rem] text-stone">{t.mobileCta.sub}</span>
        </p>
        {tel && (
          <a
            href={tel}
            aria-label={t.mobileCta.call}
            className="inline-flex size-12 shrink-0 items-center justify-center border border-ivory/25"
          >
            <Phone aria-hidden="true" className="size-4" />
          </a>
        )}
        <WhatsAppLink className="btn btn-accent min-h-12 shrink-0 gap-2 px-4 py-3">
          <MessageCircle aria-hidden="true" className="size-4" />
          {t.mobileCta.button}
        </WhatsAppLink>
      </div>
    </aside>
  );
}

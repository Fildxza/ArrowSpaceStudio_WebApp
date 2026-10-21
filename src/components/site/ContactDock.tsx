import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { FileText, Mail, MessageCircle, Phone, X } from "lucide-react";
import { business } from "@/config/business";
import { useQuickContactVisible } from "@/hooks/use-quick-contact";
import { buildMailto, buildTelUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { WhatsAppLink } from "./WhatsAppLink";

interface ItemProps {
  label: string;
  icon: ReactNode;
  /** Position from the bottom, used for the stagger. */
  order: number;
  open: boolean;
  children: (cls: string, inner: ReactNode) => ReactNode;
}

function Item({ label, icon, order, open, children }: ItemProps) {
  const cls =
    "group flex items-center justify-end gap-3 text-sm font-semibold text-ivory aria-disabled:cursor-not-allowed aria-disabled:text-stone/55";
  const inner = (
    <>
      <span className="bg-ink px-3 py-2 shadow-[0_8px_24px_oklch(0_0_0/0.3)] transition-colors group-hover:bg-charcoal">
        {label}
      </span>
      <span className="inline-flex size-12 items-center justify-center bg-ink shadow-[0_8px_24px_oklch(0_0_0/0.3)] transition-colors group-hover:bg-accent-deep">
        {icon}
      </span>
    </>
  );
  return (
    <li
      className={cn(
        "transition-[transform,opacity] duration-500 ease-[var(--ease)]",
        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
      style={{ transitionDelay: open ? `${order * 55}ms` : "0ms" }}
    >
      {children(cls, inner)}
    </li>
  );
}

/**
 * Desktop speed-dial: one round button that fans out into WhatsApp, call,
 * email and the brief builder. Channels without a configured destination are
 * shown disabled rather than linking anywhere.
 */
export function ContactDock() {
  const visible = useQuickContactVisible();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const tel = buildTelUrl();
  const mail = buildMailto(business.email, "Mural enquiry");
  const show = visible || open;

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      ref={ref}
      inert={!show}
      aria-hidden={!show}
      className={cn(
        "on-dark fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 transition-[transform,opacity] duration-500 ease-[var(--ease)] md:flex",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <ul
        id={menuId}
        aria-label="Contact options"
        className={cn("flex flex-col items-end gap-2", !open && "pointer-events-none")}
        inert={!open}
      >
        <Item
          key="wa"
          order={3}
          open={open}
          label="WhatsApp"
          icon={<MessageCircle aria-hidden="true" className="size-5" />}
        >
          {(cls, inner) => (
            <WhatsAppLink fallbackHref="#contact" onFallback={close} className={cls}>
              {inner}
            </WhatsAppLink>
          )}
        </Item>
        <Item
          key="call"
          order={2}
          open={open}
          label="Call"
          icon={<Phone aria-hidden="true" className="size-5" />}
        >
          {(cls, inner) =>
            tel ? (
              <a href={tel} className={cls}>
                {inner}
              </a>
            ) : (
              <span aria-disabled="true" title="Phone number not configured yet" className={cls}>
                {inner}
              </span>
            )
          }
        </Item>
        <Item
          key="mail"
          order={1}
          open={open}
          label="Email"
          icon={<Mail aria-hidden="true" className="size-5" />}
        >
          {(cls, inner) =>
            mail ? (
              <a href={mail} className={cls}>
                {inner}
              </a>
            ) : (
              <span aria-disabled="true" title="Email not configured yet" className={cls}>
                {inner}
              </span>
            )
          }
        </Item>
        <Item
          key="brief"
          order={0}
          open={open}
          label="Build a brief"
          icon={<FileText aria-hidden="true" className="size-5" />}
        >
          {(cls, inner) => (
            <a href="#contact" onClick={close} className={cls}>
              {inner}
            </a>
          )}
        </Item>
      </ul>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close contact options" : "Contact the studio"}
        onClick={() => setOpen((o) => !o)}
        className="group relative inline-flex size-16 items-center justify-center rounded-full bg-accent-deep text-ivory shadow-[0_12px_32px_oklch(0_0_0/0.35)] transition-transform duration-500 ease-[var(--ease)] hover:scale-105"
      >
        {!open && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-accent-deep/40 [animation-iteration-count:3]"
          />
        )}
        <span className={cn("transition-transform duration-500", open && "rotate-90")}>
          {open ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <MessageCircle aria-hidden="true" className="size-6" />
          )}
        </span>
      </button>
    </div>
  );
}

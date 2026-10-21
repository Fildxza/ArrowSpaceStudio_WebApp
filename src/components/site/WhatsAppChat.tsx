import { useEffect, useRef, useState } from "react";
import { Check, Copy, MessageCircle, Send, X } from "lucide-react";
import { business, isDemo } from "@/config/business";
import { chat as chatConfig } from "@/config/content";
import { closeChat, composeChatMessage, useChat } from "@/lib/chat";
import { prefersReducedMotion } from "@/lib/motion";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Graphics";

type Step = "typing" | "greeting" | "ready";

/**
 * Quick-chat panel opened by every WhatsApp button. The studio "greets" the
 * visitor, a one-tap reply is already selected, and a single Send button opens
 * WhatsApp with the message prefilled — the visitor only presses send there.
 * Sending is disabled (copy still works) until a WhatsApp number is configured.
 */
export function WhatsAppChat() {
  const chat = useChat();
  const live = isWhatsAppConfigured();
  const panelRef = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("ready");
  const [selectedId, setSelectedId] = useState("quote");
  const [custom, setCustom] = useState<{ topic: string; message: string } | null>(null);
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  const reply = chatConfig.replies.find((r) => r.id === selectedId);
  const baseMessage = custom?.message ?? reply?.message ?? "";
  const finalMessage = composeChatMessage(baseMessage, details);
  const url = buildWhatsAppUrl(finalMessage);

  // Reset conversation each time the panel opens.
  useEffect(() => {
    if (!chat.open) return;
    opener.current = document.activeElement;
    setDetails("");
    setCopied("idle");
    const match = chatConfig.replies.find((r) => r.message === chat.message);
    if (chat.message && !match) {
      setCustom({ topic: chat.topic || "Your enquiry", message: chat.message });
      setSelectedId("");
    } else {
      setCustom(null);
      setSelectedId(match?.id ?? "quote");
    }

    if (prefersReducedMotion()) {
      setStep("ready");
      return undefined;
    }
    setStep("typing");
    const t1 = window.setTimeout(() => setStep("greeting"), 750);
    const t2 = window.setTimeout(() => setStep("ready"), 1250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [chat.open, chat.nonce, chat.message, chat.topic]);

  // Keep the visitor's prepared message in view as it changes.
  useEffect(() => {
    if (step === "ready") sentRef.current?.scrollIntoView({ block: "nearest" });
  }, [step, selectedId, custom, details]);

  // Move focus into the panel; Escape / click outside close it; focus returns to the opener.
  useEffect(() => {
    if (!chat.open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeChat();
    window.addEventListener("keydown", onKey);
    const origin = opener.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      if (origin instanceof HTMLElement && document.contains(origin)) origin.focus();
    };
  }, [chat.open]);

  const send = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    closeChat();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(finalMessage);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };

  const bubble = "max-w-[88%] px-4 py-3 text-[0.95rem] leading-snug";

  return (
    <>
      {/* dim backdrop on small screens only */}
      <div
        aria-hidden="true"
        onClick={closeChat}
        className={cn(
          "fixed inset-0 z-[58] bg-ink/60 transition-opacity duration-500 md:hidden",
          chat.open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-label={`Chat with ${business.name} on WhatsApp`}
        tabIndex={-1}
        inert={!chat.open}
        aria-hidden={!chat.open}
        className={cn(
          "on-dark fixed z-[59] flex max-h-[88dvh] flex-col bg-ink text-ivory outline-none",
          "inset-x-0 bottom-0 shadow-[0_-16px_48px_oklch(0_0_0/0.45)]",
          "md:inset-x-auto md:bottom-6 md:right-6 md:w-[24rem] md:shadow-[0_24px_64px_oklch(0_0_0/0.5)]",
          "origin-bottom-right transition-[transform,opacity] duration-500 ease-[var(--ease)]",
          chat.open
            ? "translate-y-0 opacity-100 md:scale-100"
            : "pointer-events-none translate-y-8 opacity-0 md:scale-95",
        )}
      >
        {/* header */}
        <div className="flex items-center gap-3 border-b border-ivory/10 bg-charcoal px-4 py-3">
          <LogoMark className="size-10 shrink-0 text-accent-deep" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg leading-tight">{business.name}</p>
            <p className="annot flex items-center gap-2 text-[0.62rem] text-stone">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-[oklch(0.75_0.17_150)]"
              />
              WhatsApp chat{isDemo ? " · preview" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="inline-flex size-11 items-center justify-center transition-colors hover:bg-ivory/10"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        {/* conversation */}
        <div
          className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[oklch(0.21_0.004_100)] px-4 py-5"
          aria-live="polite"
        >
          {step === "typing" ? (
            <div className={cn(bubble, "w-fit bg-charcoal")} aria-label="Typing">
              <span className="flex gap-1.5 py-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-bounce rounded-full bg-stone"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </span>
            </div>
          ) : (
            <>
              <p className={cn(bubble, "fade-up w-fit bg-charcoal")}>{chatConfig.greeting}</p>
              {step === "ready" && (
                <>
                  <p className={cn(bubble, "fade-up w-fit bg-charcoal text-stone")}>
                    {chatConfig.hint}
                  </p>

                  <div
                    role="group"
                    aria-label="Quick replies"
                    className="fade-up flex flex-wrap gap-2 pt-1"
                  >
                    {chatConfig.replies.map((r) => {
                      const on = selectedId === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => {
                            setSelectedId(r.id);
                            setCustom(null);
                            setCopied("idle");
                          }}
                          className={cn(
                            "min-h-11 border px-3.5 text-sm transition-colors duration-300",
                            on
                              ? "border-accent-soft bg-accent-soft text-ink"
                              : "border-ivory/25 text-ivory hover:border-ivory/70",
                          )}
                        >
                          {r.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* the visitor's message, shown as a sent bubble */}
                  <div
                    ref={sentRef}
                    key={`${selectedId}-${custom?.message ?? ""}`}
                    className="fade-up flex justify-end pt-3"
                  >
                    <p className={cn(bubble, "whitespace-pre-wrap bg-accent-deep")}>
                      {finalMessage}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* composer */}
        {step === "ready" && (
          <div className="fade-up border-t border-ivory/10 bg-ink px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            <label className="block">
              <span className="sr-only">Add details (optional)</span>
              <input
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                  setCopied("idle");
                }}
                maxLength={300}
                placeholder="Add details — location, wall size… (optional)"
                className="block w-full border-0 border-b border-ivory/25 bg-transparent px-0 py-2.5 text-sm text-ivory placeholder:text-stone/60 focus:border-accent-soft focus:outline-none"
              />
            </label>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={send}
                disabled={!live}
                className="btn btn-accent min-w-0 flex-1 gap-2"
              >
                <Send aria-hidden="true" className="size-4" />
                {live ? "Send on WhatsApp" : "Send (number pending)"}
              </button>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy message"
                title="Copy message"
                className="btn btn-outline size-[3.25rem] shrink-0 p-0!"
              >
                {copied === "ok" ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <Copy aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>

            <p className="mt-3 min-h-4 text-xs text-stone" aria-live="polite">
              {copied === "ok" && "Message copied."}
              {copied === "fail" && "Couldn't copy — select the message and copy it manually."}
              {copied === "idle" &&
                (live
                  ? "WhatsApp opens with this message ready — just press send."
                  : isDemo
                    ? "Preview: the studio's WhatsApp number isn't set yet, so sending is disabled."
                    : "")}
            </p>

            <a
              href="#brief"
              onClick={closeChat}
              className="link-line annot mt-2 inline-flex min-h-9 items-center gap-2 text-stone hover:text-ivory"
            >
              <MessageCircle aria-hidden="true" className="size-3.5" /> Prefer a detailed brief?
              Build one
            </a>
          </div>
        )}
      </div>
    </>
  );
}

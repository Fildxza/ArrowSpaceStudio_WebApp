import { useSyncExternalStore } from "react";
import { services } from "@/config/content";
import { pick, fmt, type Lang } from "@/i18n";
import { copy } from "@/i18n/copy";

/**
 * Tiny external store for the WhatsApp quick-chat panel, so any button on the
 * page can open it (optionally with a preselected reply) without prop drilling.
 * The store keeps a language-independent reply id; messages are built per language.
 */
export interface ChatState {
  open: boolean;
  /** Preselected quick-reply id (e.g. a service id). Empty = "I'd like a quotation". */
  replyId: string;
  /** Bumps on every open() so the panel can reset even if state looks identical. */
  nonce: number;
}

let state: ChatState = { open: false, replyId: "", nonce: 0 };
const listeners = new Set<() => void>();

function set(next: ChatState) {
  state = next;
  listeners.forEach((l) => l());
}

export function openChat(options: { replyId?: string } = {}) {
  set({ open: true, replyId: options.replyId ?? "", nonce: state.nonce + 1 });
}

export function closeChat() {
  if (state.open) set({ ...state, open: false });
}

export function useChat(): ChatState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}

/** True while the chat panel is open — used by floating controls to step aside. */
export function useChatOpen(): boolean {
  return useChat().open;
}

/** Final text sent to WhatsApp: the chosen message plus optional free-text details. */
export function composeChatMessage(base: string, details: string): string {
  const extra = details.trim();
  return extra ? `${base}\n\n${extra}` : base;
}

export interface QuickReply {
  id: string;
  label: string;
  message: string;
}

/** The quick replies offered in the chat panel, in the given language. */
export function chatReplies(lang: Lang): QuickReply[] {
  const t = copy[lang];
  return [
    { id: "quote", label: t.chat.replyQuote, message: t.messages.default },
    ...services.map((s) => {
      const title = pick(s.title, lang);
      return {
        id: s.id,
        label: title,
        message: fmt(t.messages.service, { title: title.toLowerCase() }),
      };
    }),
    { id: "question", label: t.chat.replyQuestion, message: t.messages.question },
  ];
}

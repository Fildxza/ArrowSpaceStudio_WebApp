import { useSyncExternalStore } from "react";

/**
 * Tiny external store for the WhatsApp quick-chat panel, so any button on the
 * page can open it (with an optional preselected topic) without prop drilling.
 */
export interface ChatState {
  open: boolean;
  /** Preselected message (e.g. from a service link). Empty = default quotation request. */
  message: string;
  /** Short label for the preselected topic. */
  topic: string;
  /** Bumps on every open() so the panel can reset even if state looks identical. */
  nonce: number;
}

let state: ChatState = { open: false, message: "", topic: "", nonce: 0 };
const listeners = new Set<() => void>();

function set(next: ChatState) {
  state = next;
  listeners.forEach((l) => l());
}

export function openChat(options: { message?: string; topic?: string } = {}) {
  set({
    open: true,
    message: options.message ?? "",
    topic: options.topic ?? "",
    nonce: state.nonce + 1,
  });
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

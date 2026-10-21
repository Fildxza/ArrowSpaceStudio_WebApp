/**
 * Minimal EN / BM language layer (no library).
 *
 * - UI text lives in `copy.ts` (one typed dictionary per language).
 * - Owner-editable content (services, portfolio, process…) stores `{ en, ms }` pairs.
 * - The language is chosen by (1) the visitor's saved choice, (2) browser language,
 *   (3) `DEFAULT_LANGUAGE`. The prerendered HTML is English; BM visitors switch right
 *   after hydration.
 */
import { useSyncExternalStore } from "react";
import { copy, type Copy } from "./copy";

export type Lang = "en" | "ms";
export const LANGS: readonly Lang[] = ["ms", "en"];

/** A string that exists in both languages. A plain string is used as-is for both. */
export type Localized = string | { readonly en: string; readonly ms: string };

/** "auto" follows the browser; set "ms" or "en" to force a default for first-time visitors. */
export const DEFAULT_LANGUAGE: "auto" | Lang = "auto";

const STORAGE_KEY = "site-lang";

export function pick(text: Localized, lang: Lang): string {
  return typeof text === "string" ? text : text[lang];
}

/** Replace `{name}` tokens: fmt("Hi {n}", { n: "A" }) -> "Hi A". */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) => (key in vars ? String(vars[key]) : m));
}

function detect(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ms") return saved;
  } catch {
    /* storage unavailable (private mode) — fall through */
  }
  if (DEFAULT_LANGUAGE !== "auto") return DEFAULT_LANGUAGE;
  const preferred =
    typeof navigator === "undefined" ? [] : (navigator.languages ?? [navigator.language]);
  return preferred.some((l) => l?.toLowerCase().startsWith("ms")) ? "ms" : "en";
}

let current: Lang = typeof window === "undefined" ? "en" : detect();
const listeners = new Set<() => void>();

export function getLang(): Lang {
  return current;
}

export function setLang(lang: Lang): void {
  if (lang === current) return;
  current = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

/** Test helper: reset to a known language without persisting. */
export function resetLangForTests(lang: Lang = "en"): void {
  current = lang;
  listeners.forEach((l) => l());
}

export function useLang(): Lang {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => "en",
  );
}

/** The typed UI dictionary for the current language. */
export function useCopy(): Copy {
  return copy[useLang()];
}

/** Resolver for owner-editable `Localized` content in the current language. */
export function useL(): (text: Localized) => string {
  const lang = useLang();
  return (text) => pick(text, lang);
}

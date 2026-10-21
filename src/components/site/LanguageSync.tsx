import { useEffect } from "react";
import { pick, useLang } from "@/i18n";
import { seo } from "@/config/business";

/** Keeps <html lang> and the tab title in step with the visitor's chosen language. */
export function LanguageSync() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = pick(seo.title, lang);
  }, [lang]);
  return null;
}

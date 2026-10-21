import { LANGS, setLang, useCopy, useLang } from "@/i18n";
import { cn } from "@/lib/utils";

/** BM | EN toggle. Both buttons are real buttons with a pressed state; `lang` marks the label's language. */
export function LanguageSwitch({
  className,
  large,
}: {
  className?: string;
  /** Bigger touch targets (mobile menu). */
  large?: boolean;
}) {
  const lang = useLang();
  const t = useCopy();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn("inline-flex items-stretch border border-ivory/25", className)}
    >
      {LANGS.map((l) => {
        const on = lang === l;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={on}
            aria-label={t.nav.switchTo[l]}
            onClick={() => setLang(l)}
            className={cn(
              "annot inline-flex items-center justify-center text-[0.66rem] transition-colors duration-300",
              large ? "min-h-11 min-w-14 px-3" : "min-h-8 min-w-10 px-2",
              on ? "bg-ivory text-ink" : "text-stone hover:text-ivory",
            )}
          >
            {t.nav.languageShort[l]}
          </button>
        );
      })}
    </div>
  );
}

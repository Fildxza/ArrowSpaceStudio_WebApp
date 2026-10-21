import { useEffect, useId, useState, type FormEvent } from "react";
import { services } from "@/config/content";
import { useCopy, useL, useLang } from "@/i18n";
import { ENQUIRY_EVENT } from "@/lib/enquiry";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, composeEnquiryMessage, isWhatsAppConfigured } from "@/lib/whatsapp";

const NOT_SURE = "unsure";
const TIMELINE_KEYS = ["asap", "short", "mid", "flexible"] as const;
type TimelineKey = (typeof TIMELINE_KEYS)[number];

type CopyState = "idle" | "copied" | "failed";

/**
 * Brief builder. There is no backend: the brief is sent through WhatsApp (when
 * a number is configured) or copied to the clipboard. Success is only shown
 * when the browser confirms the action. State stores language-independent ids,
 * so switching language keeps the visitor's choices.
 */
export function EnquiryForm() {
  const id = useId();
  const t = useCopy();
  const l = useL();
  const lang = useLang();
  const [typeId, setTypeId] = useState("");
  const [location, setLocation] = useState("");
  const [wallSize, setWallSize] = useState("");
  const [timeline, setTimeline] = useState<"" | TimelineKey>("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [copy, setCopy] = useState<CopyState>("idle");
  const canSend = isWhatsAppConfigured();

  const projectTypes = [
    ...services.map((s) => ({ id: s.id, label: l(s.title) })),
    { id: NOT_SURE, label: t.form.notSure },
  ];

  useEffect(() => {
    const onSelect = (e: Event) => {
      const serviceId = (e as CustomEvent<string>).detail;
      if (services.some((s) => s.id === serviceId)) {
        setTypeId(serviceId);
        setError("");
      }
    };
    window.addEventListener(ENQUIRY_EVENT, onSelect);
    return () => window.removeEventListener(ENQUIRY_EVENT, onSelect);
  }, []);

  const selected = services.find((s) => s.id === typeId);
  const message = composeEnquiryMessage(
    {
      projectType: selected ? l(selected.title) : "",
      location,
      wallSize,
      timeline: timeline ? t.form.timelines[timeline] : "",
      notes,
    },
    lang,
  );

  const validate = () => {
    if (!typeId) {
      setError(t.form.typeError);
      document.getElementById(`${id}-type-0`)?.focus();
      return false;
    }
    setError("");
    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = buildWhatsAppUrl(message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const onCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  };

  const field =
    "mt-2 block w-full border-0 border-b border-ivory/25 bg-transparent px-0 py-3 text-base text-ivory placeholder:text-stone/50 transition-colors focus:border-accent-soft focus:shadow-[0_1px_0_var(--accent-soft)] focus:outline-none focus-visible:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${id}-title`}
      className="on-dark bg-ink p-6 text-ivory sm:p-8 md:p-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 id={`${id}-title`} className="font-display text-3xl font-light">
          {t.form.title}
        </h3>
        <span className="annot text-stone/70">{t.form.time}</span>
      </div>
      <p className="mt-2 text-sm text-stone">{t.form.intro}</p>

      <fieldset
        className="mt-8"
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
      >
        <legend className="annot text-stone">{t.form.typeLegend}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {projectTypes.map((type, i) => (
            <label key={type.id} className="cursor-pointer">
              <input
                id={`${id}-type-${i}`}
                type="radio"
                name={`${id}-type`}
                value={type.id}
                checked={typeId === type.id}
                onChange={() => {
                  setTypeId(type.id);
                  setError("");
                  setCopy("idle");
                }}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center border border-ivory/20 px-3.5 text-sm text-stone transition-colors peer-checked:border-accent-soft peer-checked:bg-accent-soft peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-soft hover:border-ivory/60 hover:text-ivory">
                {type.label}
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-3 text-sm text-accent-soft">
            {error}
          </p>
        )}
      </fieldset>

      <div className="mt-6 grid gap-x-6 sm:grid-cols-2">
        <label className="mt-4 block">
          <span className="annot text-stone">{t.form.location}</span>
          <input
            className={field}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={120}
            autoComplete="address-level2"
            placeholder={t.form.locationPh}
          />
        </label>
        <label className="mt-4 block">
          <span className="annot text-stone">{t.form.wallSize}</span>
          <input
            className={field}
            value={wallSize}
            onChange={(e) => setWallSize(e.target.value)}
            maxLength={80}
            placeholder={t.form.wallSizePh}
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="annot text-stone">{t.form.timeline}</span>
        <select
          className={cn(field, "appearance-none")}
          value={timeline}
          onChange={(e) => setTimeline(e.target.value as "" | TimelineKey)}
        >
          <option value="" className="bg-ink text-ivory">
            {t.form.timelinePh}
          </option>
          {TIMELINE_KEYS.map((k) => (
            <option key={k} value={k} className="bg-ink text-ivory">
              {t.form.timelines[k]}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="annot text-stone">{t.form.notes}</span>
        <textarea
          className={cn(field, "min-h-24 resize-y")}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={600}
          rows={3}
          placeholder={t.form.notesPh}
        />
      </label>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="btn btn-accent"
          disabled={!canSend}
          aria-describedby={!canSend ? `${id}-pending` : undefined}
        >
          {t.form.send}{" "}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </button>
        <button type="button" onClick={onCopy} className="btn btn-outline text-ivory">
          {t.form.copy}
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm text-stone" aria-live="polite">
        {copy === "copied" && t.form.copied}
        {copy === "failed" && t.form.copyFailed}
      </p>
      {!canSend && (
        <p id={`${id}-pending`} className="annot mt-1 text-stone/80">
          {t.form.pending}
        </p>
      )}

      <details className="mt-6 border-t border-ivory/15 pt-4 text-sm">
        <summary className="annot cursor-pointer text-stone hover:text-ivory">
          {t.form.preview}
        </summary>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-stone">{message}</pre>
      </details>
    </form>
  );
}

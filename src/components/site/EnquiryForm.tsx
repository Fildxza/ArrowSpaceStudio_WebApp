import { useEffect, useId, useState, type FormEvent } from "react";
import { services } from "@/config/content";
import { buildWhatsAppUrl, composeEnquiryMessage, isWhatsAppConfigured } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { ENQUIRY_EVENT } from "@/lib/enquiry";

const NOT_SURE = "Not sure yet";
const projectTypes = [...services.map((s) => s.title), NOT_SURE];
const timelines = ["", "As soon as possible", "Within 1–3 months", "Within 3–6 months", "Flexible"];

type CopyState = "idle" | "copied" | "failed";

/**
 * Brief builder. There is no backend: the brief is sent through WhatsApp (when
 * a number is configured) or copied to the clipboard. Success is only shown
 * when the browser confirms the action.
 */
export function EnquiryForm() {
  const id = useId();
  const [projectType, setProjectType] = useState("");
  const [location, setLocation] = useState("");
  const [wallSize, setWallSize] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [copy, setCopy] = useState<CopyState>("idle");
  const canSend = isWhatsAppConfigured();

  useEffect(() => {
    const onSelect = (e: Event) => {
      const type = (e as CustomEvent<string>).detail;
      if (projectTypes.includes(type)) {
        setProjectType(type);
        setError("");
      }
    };
    window.addEventListener(ENQUIRY_EVENT, onSelect);
    return () => window.removeEventListener(ENQUIRY_EVENT, onSelect);
  }, []);

  const message = composeEnquiryMessage({
    projectType: projectType === NOT_SURE ? "" : projectType,
    location,
    wallSize,
    timeline,
    notes,
  });

  const validate = () => {
    if (!projectType) {
      setError("Choose the type of project so we can prepare the right questions.");
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
          Build your brief
        </h3>
        <span className="annot text-stone/70">~1 min</span>
      </div>
      <p className="mt-2 text-sm text-stone">Everything is optional except the project type.</p>

      <fieldset
        className="mt-8"
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
      >
        <legend className="annot text-stone">Project type *</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {projectTypes.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input
                id={`${id}-type-${i}`}
                type="radio"
                name={`${id}-type`}
                value={t}
                checked={projectType === t}
                onChange={() => {
                  setProjectType(t);
                  setError("");
                  setCopy("idle");
                }}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center border border-ivory/20 px-3.5 text-sm text-stone transition-colors peer-checked:border-accent-soft peer-checked:bg-accent-soft peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-soft hover:border-ivory/60 hover:text-ivory">
                {t}
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
          <span className="annot text-stone">Project location</span>
          <input
            className={field}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={120}
            autoComplete="address-level2"
            placeholder="City / area"
          />
        </label>
        <label className="mt-4 block">
          <span className="annot text-stone">Approx. wall size</span>
          <input
            className={field}
            value={wallSize}
            onChange={(e) => setWallSize(e.target.value)}
            maxLength={80}
            placeholder="e.g. 4m × 3m"
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="annot text-stone">Preferred timeline</span>
        <select
          className={cn(field, "appearance-none")}
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        >
          {timelines.map((t) => (
            <option key={t} value={t} className="bg-ink text-ivory">
              {t || "Select a timeline"}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="annot text-stone">Ideas or references</span>
        <textarea
          className={cn(field, "min-h-24 resize-y")}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={600}
          rows={3}
          placeholder="Style, colours, mood, links to references…"
        />
      </label>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="btn btn-accent"
          disabled={!canSend}
          aria-describedby={!canSend ? `${id}-pending` : undefined}
        >
          Send brief on WhatsApp{" "}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </button>
        <button type="button" onClick={onCopy} className="btn btn-outline text-ivory">
          Copy brief
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm text-stone" aria-live="polite">
        {copy === "copied" && "Brief copied to your clipboard."}
        {copy === "failed" &&
          "Your browser blocked copying — please select and copy the preview below."}
      </p>
      {!canSend && (
        <p id={`${id}-pending`} className="annot mt-1 text-stone/80">
          WhatsApp number not configured yet — use “Copy brief” for now.
        </p>
      )}

      <details className="mt-6 border-t border-ivory/15 pt-4 text-sm">
        <summary className="annot cursor-pointer text-stone hover:text-ivory">
          Preview message
        </summary>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-stone">{message}</pre>
      </details>
    </form>
  );
}

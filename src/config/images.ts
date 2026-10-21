/**
 * Image registry.
 *
 * Master photos live in `src/assets/*.jpg`. `npm run images` generates
 * responsive WebP variants into `src/assets/web/` plus a `manifest.json`
 * with the intrinsic dimensions, which this module turns into `src`/`srcSet`.
 *
 * To add a real photo: drop `my-wall.jpg` into `src/assets/`, run
 * `npm run images`, then reference it with `getImage("my-wall", "alt text")`.
 */
import manifest from "@/assets/web/manifest.json";

export interface SiteImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

type ManifestEntry = { width: number; height: number; variants: number[] };

const urls = import.meta.glob<string>("../assets/web/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const entries = manifest as Record<string, ManifestEntry>;

function urlFor(name: string, width: number): string {
  const url = urls[`../assets/web/${name}-${width}.webp`];
  if (!url) throw new Error(`Missing image variant: ${name}-${width}.webp (run "npm run images")`);
  return url;
}

export function getImage(name: string, alt: string): SiteImage {
  const entry = entries[name];
  if (!entry || entry.variants.length === 0) {
    throw new Error(`Unknown image "${name}" (run "npm run images")`);
  }
  const variants = [...entry.variants].sort((a, b) => a - b);
  const largest = variants[variants.length - 1] as number;
  return {
    src: urlFor(name, largest),
    srcSet: variants.map((w) => `${urlFor(name, w)} ${w}w`).join(", "),
    width: entry.width,
    height: entry.height,
    alt,
  };
}

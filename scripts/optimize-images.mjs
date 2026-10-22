/**
 * Generates responsive WebP variants for every master image in src/assets/*.{jpg,jpeg,png,webp}
 * into src/assets/web/, plus src/assets/web/manifest.json (intrinsic size + variant widths).
 *
 * Usage: npm run images
 * Masters are never modified or deleted.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src", "assets");
const outDir = path.join(srcDir, "web");
const WIDTHS = [640, 1024, 1600, 2048];
const QUALITY = 78;

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const manifest = {};

for (const file of files.sort()) {
  const name = path.parse(file).name;
  const input = sharp(path.join(srcDir, file)).rotate();
  const { width, height } = await input.metadata();
  if (!width || !height) throw new Error(`Cannot read dimensions of ${file}`);

  // Never upscale; always include the native width if it is smaller than the largest target.
  const variants = [...new Set(WIDTHS.map((w) => Math.min(w, width)))].sort((a, b) => a - b);
  for (const w of variants) {
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
  }
  manifest[name] = { width, height, variants };
  console.log(`${name}: ${width}x${height} -> ${variants.join(", ")}`);
}

await writeFile(path.join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${files.length} image sets to ${path.relative(root, outDir)}`);

/*
  Shrinks the images in public/ to the size they are actually displayed at.

    npm run optimize-images            # rewrite images
    npm run optimize-images -- --dry   # only report what would change

  - JPEG/PNG/WebP keep their name and format (recipe image paths are stored
    in MongoDB, so file names must not change).
  - AVIF can't be written by sharp here, so AVIF files become WebP and every
    reference in src/ is updated.
  - A file is only replaced when the result is at least 10% smaller.
*/
import fs from "fs";
import path from "path";
import sharp from "sharp";

const DRY = process.argv.includes("--dry");
const PUBLIC = path.resolve("public");
const SRC = path.resolve("src");

// Longest side in px, by folder: roughly 2-3x the on-screen size for sharp screens
const MAX_SIZE = {
  groceries: 192, // 48px icons
  authors: 320,
  pantry: 900, // product cards ~240-280px tall
  recipes: 1200,
  blogs: 1400,
  hero: 1920,
};
const DEFAULT_MAX = 1920; // banners and other images in public/
const MIN_SAVING = 0.1;

const EXT = /\.(jpe?g|png|webp|avif)$/i;
const SKIP = new Set(["logo.png", "vite.svg", "google.png", "facebook.png"]);

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );

const maxFor = (rel) => MAX_SIZE[rel.split("/")[0]] ?? DEFAULT_MAX;

const encode = (pipeline, format, hasAlpha) => {
  switch (format) {
    case "jpeg":
      return pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true });
    case "png":
      // photos stored as PNG: quantize; transparent graphics stay lossless
      return hasAlpha
        ? pipeline.png({ compressionLevel: 9 })
        : pipeline.png({ palette: true, quality: 80, compressionLevel: 9 });
    default:
      return pipeline.webp({ quality: 78 });
  }
};

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

let before = 0;
let after = 0;
const renames = new Map(); // "/pantry/x.avif" -> "/pantry/x.webp"

for (const file of walk(PUBLIC).filter((f) => EXT.test(f))) {
  const rel = path.relative(PUBLIC, file).split(path.sep).join("/");
  if (SKIP.has(rel)) continue;

  const original = fs.readFileSync(file);
  before += original.length;

  const meta = await sharp(original).metadata();
  const isAvif = /\.avif$/i.test(file);
  const format = isAvif ? "webp" : meta.format === "jpeg" ? "jpeg" : meta.format;
  const max = maxFor(rel);

  const pipeline = sharp(original)
    .rotate() // apply camera orientation before metadata is dropped
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true });

  const output = await encode(pipeline, format, meta.hasAlpha).toBuffer();
  const saved = 1 - output.length / original.length;

  if (!isAvif && saved < MIN_SAVING) {
    after += original.length;
    continue;
  }

  after += output.length;
  const target = isAvif ? file.replace(/\.avif$/i, ".webp") : file;
  console.log(
    `${DRY ? "would " : ""}${isAvif ? "convert" : "shrink "} /${rel}` +
    `${isAvif ? " -> .webp" : ""}  ${meta.width}x${meta.height}  ${kb(original.length)} -> ${kb(output.length)}`
  );

  if (isAvif) renames.set(`/${rel}`, `/${rel.replace(/\.avif$/i, ".webp")}`);

  if (!DRY) {
    fs.writeFileSync(target, output);
    if (isAvif) fs.unlinkSync(file);
  }
}

// Point code and styles at the converted files
if (renames.size) {
  for (const file of walk(SRC).filter((f) => /\.(jsx?|css)$/.test(f))) {
    let text = fs.readFileSync(file, "utf-8");
    let changed = false;
    for (const [from, to] of renames) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      console.log(`${DRY ? "would update" : "updated"} references in ${path.relative(".", file)}`);
      if (!DRY) fs.writeFileSync(file, text);
    }
  }
}

console.log(`\nTotal: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB${DRY ? " (dry run, nothing written)" : ""}`);

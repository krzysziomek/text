#!/usr/bin/env node
// Skanuje public/pliki/* i generuje src/data/files-manifest.json.
// Uruchamiane przed `dev` i `build`. Dodajesz plik do public/pliki/<kategoria>/
// i pojawia się w UI po następnym buildzie.

import { readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const plikiDir = join(root, "public", "pliki");
const outFile = join(root, "src", "data", "files-manifest.json");

const categories = [
  { id: "overlay", label: "Overlay", folder: "overlay" },
  { id: "ramki", label: "Ramki Rud", folder: "ramki" },
  { id: "pozostale", label: "Pozostałe", folder: "pozostale" },
];

function listZips(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".zip"))
    .map((name) => {
      const full = join(dir, name);
      const s = statSync(full);
      return { name, size: s.size, mtime: s.mtimeMs };
    })
    // Najnowsze (wg mtime) na górze; gdy mtime równy — alfabetycznie odwrotnie.
    .sort((a, b) => b.mtime - a.mtime || b.name.localeCompare(a.name));
}

const manifest = {
  generatedAt: new Date().toISOString(),
  categories: categories.map((c) => ({
    id: c.id,
    label: c.label,
    folder: c.folder,
    files: listZips(join(plikiDir, c.folder)).map((f) => ({
      name: f.name,
      // Ścieżka URL względna do basename strony (router doda BASE_URL).
      path: `pliki/${c.folder}/${f.name}`,
      size: f.size,
    })),
  })),
};

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n", "utf8");

const total = manifest.categories.reduce((n, c) => n + c.files.length, 0);
console.log(`[manifest] ${total} files across ${manifest.categories.length} categories → ${outFile}`);
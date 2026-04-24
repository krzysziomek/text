## Cel

Statyczna strona SPA „Paczka Grafa" do dystrybucji paczek zasobów Minecraft, gotowa do wdrożenia na GitHub Pages. Trzy podstrony, dynamiczne listy plików zasysane z folderów w `/public/pliki/`, motyw ciemny (domyślny) + jasny, kolory Minecrafta (§b/§a/§f/§d/§6) renderowane w UI, konfetti przy pobraniu, kompletne SEO per-route.

---

## Stack i konfiguracja buildu

- **TanStack Router** (już w projekcie) z **prerenderem do statycznych HTML-i** dla każdej trasy → każda podstrona ma własne `index.html` z osobnym `<title>`, `<meta description>`, OG tagami (kluczowe dla SEO i podglądów w mediach).
- **Vite static build** → output do `dist/`.
- **GitHub Pages ready**:
  - `vite.config.ts` z `base` ustawianym przez zmienną env (`/` lokalnie, `/<repo-name>/` na Pages — dam czytelną instrukcję, gdzie to zmienić).
  - Plik `public/404.html` (kopia `index.html`) — fallback SPA dla deep-linków na Pages.
  - Plik `public/.nojekyll` — wyłącza Jekyll.
  - Workflow `.github/workflows/deploy.yml` — build + deploy na branch `gh-pages` (lub przez `actions/deploy-pages`) przy każdym pushu na `main`.
- **Sitemap.xml + robots.txt** generowane podczas builda (skrypt postbuild) z listą tras i plików — pełne SEO.

---

## Struktura tras (TanStack Router, file-based)

```
src/routes/
  __root.tsx          → layout: header z logo + nawigacja, theme toggle, footer
  index.tsx           → / (Strona główna z formularzem pobierania)
  jak-korzystac.tsx   → /jak-korzystac (instrukcje)
  rzeczy-grafa.tsx    → /rzeczy-grafa (kafelki z linkami)
```

Każda trasa ma własny `head()` z unikalnym `title`, `description`, `og:title`, `og:description`, `og:image` (wykorzystam logo `graf.svg` skonwertowane do PNG jako share image).

---

## Layout (header + theme toggle)

- **Header**: logo (graf.svg, pixelowa głowa, klikalna → `/`) + napis „Paczka Grafa" + nawigacja: `Strona główna` / `Jak korzystać?` / `Rzeczy Grafa`.
- **Theme toggle**: ikona księżyc/słońce w prawym rogu. Stan w `localStorage`, klasa `.dark` na `<html>`. **Domyślnie dark.** Inline `ScriptOnce` w `__root` ustawia klasę przed hydratacją → bez „flash of light theme".
- **Mobile**: hamburger menu (Sheet z shadcn).
- **Footer**: drobna stopka z logo i linkiem do GitHub.

---

## Strona główna (`/`)

1. **Hero**: ogromny tytuł „Paczka Grafa" (font Press Start 2P, akcent zielony Minecraft `#5cbf3a`), krótki podtytuł.
2. **Sekcja pobierania** — interaktywny kreator w 2 krokach:
   - **Krok 1 — kategoria**: 3 duże, klikalne karty (nie dropdown):
     - 🎨 **Overlay** — paczki overlay
     - 🖼️ **Ramki Rud** — ramki na rudy
     - 📦 **Pozostałe** — inne zasoby
     Aktywna karta podświetlona zielonym akcentem, hover scale.
   - **Krok 2 — plik**: lista wyboru (custom dropdown / scrollable lista cardów) z plikami z wybranej kategorii. **Nazwy renderowane z kolorami Minecrafta** (parser `§b`→niebieski, `§a`→zielony, `§f`→biały, `§d`→różowy, `§6`→złoty). Kolejność dokładnie z `files_tree.txt` (najnowsze na górze).
3. **Przycisk akcji** (duży, pełna szerokość kontenera, zielony):
   - Domyślnie: **„Pobierz"** → bezpośredni download (`<a download>` na URL pliku w `/pliki/...`). Pod przyciskiem mała info: *„Pobieranie bezpośrednie na Twój dysk"*.
   - Dla specjalnego zasobu (na razie skonfigurowany jeden: **„Glowing Ores"** w kategorii *Ramki Rud* → `https://modrinth.com/resourcepack/glowing-ores`): napis zmienia się na **„Przejdź"**, przycisk otwiera link w nowej karcie, pod przyciskiem ostrzeżenie: *„⚠️ Opuszczasz stronę — zasób hostowany na Modrinth"*. Lista wyjątków łatwa do rozszerzenia w jednym pliku konfiguracyjnym (`src/data/special-links.ts`).
4. **Konfetti**: po kliknięciu przycisku — krótki efekt konfetti (lib `canvas-confetti`) w kolorach motywu (zielony + złoty).

---

## Strona „Jak korzystać?" (`/jak-korzystac`)

Czytelna strona z instrukcjami w sekcjach (akordeon lub stacked cards):
1. **Pobierz paczkę** — wybierz kategorię, plik, kliknij Pobierz.
2. **Zainstaluj w Minecraft** — wrzuć .zip do folderu `resourcepacks` (otwórz Minecraft → Opcje → Paczki zasobów → Otwórz folder paczek).
3. **Włącz w grze** — przesuń paczkę do aktywnych, kliknij Gotowe.
4. **FAQ** — krótkie odpowiedzi (np. „Która wersja dla mojej wersji MC?", „Czemu paczka nie działa?", „Co to overlay?").

Tekst po polsku, klimatyczny, ale rzeczowy. Mogę też dodać krótki GIF/screenshot — daj znać, jeśli masz materiały.

---

## Strona „Rzeczy Grafa" (`/rzeczy-grafa`)

Grid kafelków (1 kol mobile, 2 kol tablet, 3 kol desktop). Każdy kafelek: ikona (lucide-react) + tytuł + opis + 1 lub więcej linków (przyciski z ikoną „external link" dla zewnętrznych).

Implementuję dokładnie 6 pozycji z Twojej referencji:
- 🖼️ **Tapeta** — Pepe (Steam) + Honda (Twitter)
- 🖥️ **Lunar Client** — config (lokalny `/pliki/Profile 599065437.zip`)
- 👕 **Peleryna Optifine** — link do Cool Shoes
- ⚙️ **Sprzęt** — bit.ly/SprzetGrafa
- 🎮 **Kwadratowa Masakra** — Fabric + paczka modów lokalna
- 🔧 **Strumyk Modowo** — Forge + paczka modów

Dane w `src/data/rzeczy-grafa.ts` — łatwo dodać nowe pozycje.

---

## „Auto-zassanie" plików — jak działa

Vite ma `import.meta.glob`, ale nie obsługuje binarnych plików w `public/` ani plików dodanych po buildzie. Rozwiązanie: **skrypt prebuild** (`scripts/build-manifest.mjs`):
1. Skanuje foldery `public/pliki/overlay/`, `public/pliki/ramki/`, `public/pliki/pozostale/`.
2. Generuje `src/data/files-manifest.json` z listą plików (nazwa, ścieżka, rozmiar).
3. Uruchamiany automatycznie przed `vite build` (przez `prebuild` w `package.json`) i przed `dev` (przez `predev`).

Workflow dodawania pliku: wrzucasz `.zip` do odpowiedniego folderu w `public/pliki/`, commit & push → GitHub Action robi build → manifest się regeneruje → plik pojawia się w UI. **Zero zmian w kodzie.**

Pliki z `files_tree.txt` muszę najpierw dodać jako placeholdery (puste pliki / commit info), bo nie mam dostępu do prawdziwych ZIP-ów. **Pytanie:** czy chcesz, żebym (a) utworzył puste pliki-placeholdery z prawdziwymi nazwami, żebyś potem podmienił, czy (b) tylko wygenerował manifest z nazwami a Ty wgrasz pliki sam? Sugeruję (a) — strona będzie działać end-to-end od razu.

---

## SEO (kompletne)

- Per-route `head()` z unikalnym title/description/og:title/og:description/og:image.
- **Prerender HTML** — każda trasa ma realny statyczny `.html` z metadanymi (nie tylko CSR).
- **Sitemap.xml** generowany w postbuild (lista tras + opcjonalnie linki do plików).
- **robots.txt** w `public/`.
- **JSON-LD** (`WebSite` + `BreadcrumbList`) w `__root` head.
- **Favicon** z `graf.svg` + apple-touch-icon (PNG generowany w buildzie).
- `lang="pl"` na `<html>`, semantyczny HTML (`<header>`, `<main>`, `<nav>`, `<article>`).
- Open Graph image (logo grafa, 1200×630 PNG, generowany skryptem przy buildzie z SVG).
- `manifest.webmanifest` (PWA-light, dla lepszego SEO/share).

---

## Design (Minecraft Dark)

- **Tło**: `#0d0d0d` / karty `#1a1a1a`.
- **Akcent główny**: zielony Minecraft `#5cbf3a` (przyciski, aktywne stany, focus).
- **Akcent drugi**: złoty `#ffaa00` (highlighty, konfetti).
- **Nagłówki**: Press Start 2P (pixelowy font Google Fonts, używany oszczędnie — H1, H2, logo).
- **Body**: Inter (czytelność).
- **Pixel-art accents**: subtelne 2px ramki w stylu MC, hover-scale na kartach, transition delikatne.
- **Light theme**: jasne tło `#fafaf7` (pergamin), te same akcenty zielone i złote, kontrast OK.
- Wszystkie kolory jako tokeny w `src/styles.css` (oklch), per `:root` i `.dark`.

---

## Pliki do utworzenia / zmiany

**Nowe:**
- `src/routes/jak-korzystac.tsx`, `src/routes/rzeczy-grafa.tsx`
- `src/components/Header.tsx`, `Footer.tsx`, `ThemeToggle.tsx`
- `src/components/MinecraftText.tsx` (parser §-kodów)
- `src/components/DownloadWizard.tsx` (kreator pobierania)
- `src/components/RzeczTile.tsx`
- `src/data/files-manifest.json` (auto-generowany)
- `src/data/special-links.ts` (lista wyjątków „Przejdź")
- `src/data/rzeczy-grafa.ts`
- `src/lib/theme.ts`, `src/lib/minecraft-colors.ts`, `src/lib/confetti.ts`
- `scripts/build-manifest.mjs`, `scripts/build-sitemap.mjs`, `scripts/build-og-image.mjs`
- `public/.nojekyll`, `public/robots.txt`, `public/404.html` (kopia index)
- `public/pliki/overlay/`, `public/pliki/ramki/`, `public/pliki/pozostale/` (foldery + placeholdery)
- `public/graf.svg`, `public/favicon.ico`, `public/og-image.png`
- `.github/workflows/deploy.yml`

**Zmodyfikowane:**
- `src/routes/__root.tsx` — header/footer, lang="pl", theme script, JSON-LD, OG defaults
- `src/routes/index.tsx` — hero + DownloadWizard
- `src/styles.css` — paleta Minecraft Dark, font Press Start 2P
- `vite.config.ts` — `base`, prerender plugin
- `package.json` — `prebuild`/`predev` skrypty, deps: `canvas-confetti`

---

## Rzeczy do potwierdzenia po starcie

1. **Nazwa repo na GitHubie** — żeby ustawić poprawny `base` w Vite (np. `/paczka-grafa/`). Jeśli wdrożysz na user/org page (`<user>.github.io`) → `base: '/'`.
2. **Placeholdery dla plików .zip** — utworzyć puste pliki z prawdziwymi nazwami z `files_tree.txt`? (rekomendacja: tak)
3. Po wdrożeniu: dodać własny `og-image.png` jeśli logo grafa nie wystarczy.

Wciśnij **Implement plan**, kiedy będziesz gotów.
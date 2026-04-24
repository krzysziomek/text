import { createFileRoute } from "@tanstack/react-router";
import { DownloadWizard } from "@/components/DownloadWizard";
import grafLogo from "@/assets/graf.svg";
import { CATEGORIES } from "@/data/files";
import { stripMinecraftCodes, prettyFilename } from "@/lib/minecraft-colors";

const SITE_URL = "https://paczkagrafa.pl";

const filesJsonLd = {
  "@context": "https://schema.org",
  "@graph": CATEGORIES.map((cat) => ({
    "@type": "ItemList",
    name: `Paczka Grafa — ${cat.label}`,
    description: `Lista paczek z kategorii ${cat.label} do Minecraft.`,
    numberOfItems: cat.files.length,
    itemListElement: cat.files.map((file, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "SoftwareApplication",
        name: prettyFilename(stripMinecraftCodes(file.name)),
        applicationCategory: "Game",
        operatingSystem: "Minecraft (Java Edition)",
        url: file.virtual ? file.path : `${SITE_URL}/${file.path}`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
      },
    })),
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paczka Grafa — Overlay, Ramki Rud i więcej do Minecraft" },
      { name: "description", content: "Pobierz Paczkę Grafa: overlay GUI, ramki podświetlające rudy i inne resourcepacki do Minecraft. Wszystkie wersje od 1.8 do 1.21." },
      { property: "og:title", content: "Paczka Grafa — Resource packi do Minecraft" },
      { property: "og:description", content: "Overlay, ramki rud i inne paczki do wszystkich wersji Minecraft." },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(filesJsonLd),
      },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <img src={grafLogo} alt="" className="h-24 w-24 mx-auto mb-6" style={{ imageRendering: "pixelated" }} />
        <h1 className="font-pixel font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-4 leading-tight">
          Paczka Grafa
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto font-semibold">
          Resourcepacki do Minecraft: <span className="text-foreground font-bold">overlay</span>,{" "}
          <span className="text-foreground font-bold">ramki do rud</span> i inne dodatki. Wybierz, pobierz, graj.
        </p>
      </header>
      <section aria-labelledby="pobieranie" className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur p-5 sm:p-8 shadow-xl">
        <h2 id="pobieranie" className="sr-only">Pobieranie</h2>
        <DownloadWizard />
      </section>
    </main>
  );
}

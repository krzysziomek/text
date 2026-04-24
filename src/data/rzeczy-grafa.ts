import { Wallpaper, Monitor, Shirt, Cpu, Gamepad2, Wrench, type LucideIcon } from "lucide-react";

export type RzeczLink = { text: string; url: string; external: boolean };
export type RzeczItem = { title: string; icon: LucideIcon; content: string; links: RzeczLink[] };

export const rzeczyGrafa: RzeczItem[] = [
  {
    title: "Tapeta", icon: Wallpaper, content: "Tapeta Grafa na pulpit",
    links: [
      { text: "Pepe (żaba)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1406608111", external: true },
      { text: "Honda (samochód)", url: "https://x.com/smietankowedni/status/1733824774709686505", external: true },
    ],
  },
  {
    title: "Lunar Client", icon: Monitor, content: "Gotowa konfiguracja dla Lunar Client",
    links: [{ text: "Pobierz config", url: "pliki/inne/Profile 599065437.zip", external: false }],
  },
  {
    title: "Peleryna Optifine", icon: Shirt, content: "Pelerynka Grafa dla Optifine",
    links: [{ text: "Zobacz pelerynę", url: "https://coolshoes.moxvallix.com/banner?=aaozaeooooaFbK", external: true }],
  },
  {
    title: "Sprzęt", icon: Cpu, content: "Lista sprzętu używanego przez Grafa",
    links: [{ text: "Zobacz sprzęt", url: "http://bit.ly/SprzetGrafa", external: true }],
  },
  {
    title: "Kwadratowa Masakra", icon: Gamepad2, content: "Wymagane: Fabric. Paczka modów dla serii.",
    links: [
      { text: "Fabric", url: "https://fabricmc.net/", external: true },
      { text: "Paczka modów", url: "pliki/inne/kwadratowa-masakra-mody-FABRIC-1.17.zip", external: false },
    ],
  },
  {
    title: "Strumyk Modowo", icon: Wrench, content: "Wymagane: Forge. Paczka modów dla serii.",
    links: [
      { text: "Forge", url: "https://files.minecraftforge.net/", external: true },
      { text: "Paczka modów", url: "pliki/inne/strumyk-modowo1.16.3.zip", external: false },
    ],
  },
];

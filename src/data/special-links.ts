// Zasoby otwierane jako link zewnętrzny ("Przejdź") zamiast pobierania.
export type SpecialLink = {
  match: string | RegExp;
  url: string;
  provider?: string;
  displayName?: string;
  category?: "overlay" | "ramki" | "pozostale";
};

export const SPECIAL_LINKS: SpecialLink[] = [
  {
    match: "glowing-ores",
    url: "https://modrinth.com/resourcepack/glowing-ores",
    provider: "Modrinth",
    displayName: "§aNowe Ramki do rud §f(Glowing Ores) §7→ §dModrinth",
    category: "ramki",
  },
];

export function findSpecialLink(name: string): SpecialLink | undefined {
  return SPECIAL_LINKS.find((s) =>
    typeof s.match === "string"
      ? name.toLowerCase().includes(s.match.toLowerCase())
      : s.match.test(name)
  );
}

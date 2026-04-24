import { Link } from "@tanstack/react-router";
import grafLogo from "@/assets/graf.svg";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/60">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-8">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <img src={grafLogo} alt="" className="h-6 w-6" style={{ imageRendering: "pixelated" }} />
          <span className="font-pixel text-xs">Paczka Grafa</span>
        </Link>
        <p className="text-xs text-muted-foreground text-center">
          © {year} Paczka Grafa · Niezwiązane z Mojang AB / Microsoft
        </p>
      </div>
    </footer>
  );
}
